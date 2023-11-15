import React, { useContext, useEffect, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';

const AddNote = (props) => {
  const context = useContext(NoteContext);
  const {addNote, getNotes} = context;
  useEffect(() => {
    getNotes()
    // eslint-disable-next-line
  }, [])

  const initialNote = {title: "", description: "", tag: ""}
  const [note, setNote] = useState(initialNote)

  const handleChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value});
  };

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title: "", description: "", tag: ""})
  };
  
  return (
    <div className='container my-4'>
      <h1 className='mt-3 text-center'>Add New Note</h1>
      <form style={{width: "100%", maxWidth: '500px', margin: 'auto'}}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title:</label>
          <input type="text" className="form-control" onChange={handleChange} id="title" name="title" value={note.title} aria-describedby="titleHelp" />
          <div id="titleHelp" className="form-text">Title should be more than 5 character</div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea type="text" className="form-control" onChange={handleChange} id="description" name='description' value={note.description} rows={5} />
        </div>
        <div className="mb-3">
        <label htmlFor="tag" className="form-label">Tag:</label>
          <input type="text" className="form-control" onChange={handleChange} id="tag" name="tag" value={note.tag} />
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button disabled={note.title.length<5 || note.description.length<5 } type="submit" className="btn btn-primary" onClick={handleClick}>Save Note</button>
        </div>
      </form>
    </div>
  )
}

export default AddNote
