from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import User, Note
from .serializers import NoteSerializer, UserSerializer
import jwt, datetime


class SignupView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data={"success": True, "message": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(data={"success": False, "message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    

class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data["email"]
        password = request.data["password"]
        user = User.objects.filter(email=email).first()
        if user is None:
            return Response(data={"success": False, "message": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)
        if not user.check_password(password):
            return Response(data={"success": False, "message": "Please provide correct password"}, status=status.HTTP_404_NOT_FOUND)
        payload = {
            "id": user.id,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            "iat": datetime.datetime.utcnow()
        }
        token = jwt.encode(payload, 'secret', algorithm='HS256')
        response = Response()
        response.set_cookie(key='jwt', value=token,  httponly=True)
        response.data = {"success": True, "jwt": token}
        return response


class UserView(APIView):
    def get(self, request, *args, **kwargs):
        token = request.COOKIES.get('jwt')
        if not token:
            return Response(data={"success": False, "message": "Token does not exist"}, status=status.HTTP_401_UNAUTHORIZED)
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            return Response(data={"success": False, "message": "Please provide valid token!"}, status=status.HTTP_401_UNAUTHORIZED)
        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        return Response(data={"success": True, "message": serializer.data}, status=status.HTTP_200_OK)


class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {"success": True, "message": "You have been logged out!"}
        return response


class GetAllUsersView(APIView):
    def get(self, request, *args, **kwargs):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(data={"success": True, "message": serializer.data}, status=status.HTTP_200_OK)


class UserMixin(object):
    def get_user_from_token(self, request):
        token = request.COOKIES.get('jwt')
        if not token:
            return None, Response(data={"success": False, "message": "Token does not exist!"}, status=status.HTTP_401_UNAUTHORIZED)
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            return None, Response(data={"success": False, "message": "Please provide valid token!"}, status=status.HTTP_401_UNAUTHORIZED)
        user = User.objects.filter(id=payload['id']).first()
        if not user:
            return None, Response(data={"success": False, "message": "User not found!"}, status=status.HTTP_401_UNAUTHORIZED)
        return user, None


class NoteAPIView(UserMixin, APIView):
    def get(self, request):
        user, response = self.get_user_from_token(request)
        if response:
            return response
        notes = Note.objects.filter(user=user)
        serializer = NoteSerializer(notes, many=True)
        return Response(data={"success": True, "message": serializer.data}, status=status.HTTP_200_OK)
    def post(self, request):
        user, response = self.get_user_from_token(request)
        if response:
            return response
        data = {'title': request.data['title'], 'description': request.data['description'], 'tag': request.data['tag'], 'user': user.id}
        serializer = NoteSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(data={"success": True, "message": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(data={"success": True, "message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    

class NoteDetailAPIView(UserMixin, APIView):
    def get(self, request, id):
        user, response = self.get_user_from_token(request)
        if response:
            return response
        try:
            note = Note.objects.get(id=id, user=user)
            serializer = NoteSerializer(note)
            return Response(data={"success": True, "message": serializer.data}, status=status.HTTP_200_OK)
        except Note.DoesNotExist:
            return Response(data={"success": True, "message": "Note does not exist!"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, id):
        user, response = self.get_user_from_token(request)
        if response:
            return response
        try:
            note = Note.objects.get(id=id, user=user)
        except Note.DoesNotExist:
            return Response(data={"success": True, "message": "Note does not exist!"}, status=status.HTTP_404_NOT_FOUND)
        data = {'title': request.data['title'], 'description': request.data['description'], 'tag': request.data['tag'], 'user': user.id}
        serializer = NoteSerializer(note, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(data={"success": True, "message": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(data={"success": True, "message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        user, response = self.get_user_from_token(request)
        if response:
            return response
        try:
            note = Note.objects.get(id=id, user=user)
            note.delete()
            return Response(data={"success": True, "message": "Note deleted successfully!"}, status=status.HTTP_200_OK)
        except Note.DoesNotExist:
            return Response(data={"success": True, "message": "Note does not exist!"}, status=status.HTTP_404_NOT_FOUND)
