import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const {deleteNote} = context;
  const { note, updateNote } = props;
  
  const onClick = () => {
    deleteNote(note.id);
  }

  return (
    <div className='col-md-3'>
      <div className="card my-3">
        <div style={{ display: "flex", justifyContent: "flex-end", position: "absolute", right: "0" }}>
          <span className="badge bg-danger">{note.tag}</span>
        </div>
        <div className="card-header"><strong>{note.title}</strong></div>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div className='text-start'>
              <p className='text-muted'>{new Date(note.created).toGMTString().slice(0,17)}</p>
            </div>
            <div className="text-end">
              <i className="fa-solid fa-pen-to-square mx-2" onClick={() => {updateNote(note)}} style={{color: "blue"}}></i>
              <i className="fa-solid fa-trash-can" onClick={onClick} style={{color: "red"}}></i>
            </div>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  )
}

export default NoteItem
