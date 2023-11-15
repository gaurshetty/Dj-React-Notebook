import { useState } from "react";
import NoteContext from "./NoteContext";
import { useNavigate } from "react-router-dom";


const NoteState = (props) => {
    const host = "http://localhost:8000"
    let navigate = useNavigate();
    const initialNotes = []
    const [notes, setNotes] = useState(initialNotes);

    // API CALL TO GET ALL NOTES:
    const getNotes = async() => {
      const response = await fetch(`${host}/notes/`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          // "auth-token": localStorage.getItem('token'),
        },
        credentials: 'include'
      });
      const result = await response.json()
      if(!result.success) {
        navigate('/login')
      }else {
        setNotes(result.message)
      }
    };

    // API CALL TO ADD NOTE:
    const addNote = async(title, description, tag) => {
      const response = await fetch(`${host}/notes/`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          // "auth-token": localStorage.getItem('token'),
        },
        credentials: 'include',
        body: JSON.stringify({title, description, tag})
      });
      const result = await response.json()
      if(result.success) {
        props.showAlert("Note added Successfully!", "success")
      }else{
        if(result.message.title){
          props.showAlert(result.message.title, "danger")
        }else{
          props.showAlert(result.message.description, "danger")
        }
      }
    };

    // API CALL TO EDIT NOTE:
    const editNote = async(id, title, description, tag) => {
      const response = await fetch(`${host}/notes/${id}/`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          // "auth-token": localStorage.getItem('token'),
        },
        credentials: 'include',
        body: JSON.stringify({title, description, tag})
      });
      const result = await response.json()
      if(result.success) {
        props.showAlert("Note updated Successfully!", "success")
      }else{
        props.showAlert(result.message, "danger")
      }
      getNotes()
    };

    // API CALL TO DELETE NOTE:
    const deleteNote = async(id) => {
      const response = await fetch(`${host}/notes/${id}/`, {
        method: "DELETE",
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          // "auth-token": localStorage.getItem('token'),
        }
      });
      const result = await response.json()
      if(result.success) {
        props.showAlert(result.message, "success")
      }else{
        props.showAlert(result.message, "danger")
      }
      getNotes()
    };


    return (
        <NoteContext.Provider value={{notes, addNote, editNote, deleteNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;