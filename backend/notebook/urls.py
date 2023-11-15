from django.urls import path
from notebook import views


urlpatterns = [
    path('signup/', views.SignupView.as_view(), name='signup'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('getallusers/', views.GetAllUsersView.as_view(), name='getallusers'),
    path('user/', views.UserView.as_view(), name='user'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path("notes/", views.NoteAPIView.as_view(), name="note"),
    path("notes/<int:id>/", views.NoteDetailAPIView.as_view(), name="note-detail"),
]
