import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';

const Notes = (props) => {
  const context = useContext(NoteContext);
  const {notes, getNotes, editNote} = context;
  useEffect(() => {
    getNotes()
    // eslint-disable-next-line
  }, [])

  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote.id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
  };

  const handleChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value});
  };

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    // addNote(note.title, note.description, note.tag);
    refClose.current.click();
  };

  return (
    <div className='row my-3'>

      {/* <!-- Button trigger modal --> */}
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='pb-4'>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title:</label>
                  <input type="text" className="form-control" onChange={handleChange} id="etitle" name="etitle" value={note.etitle}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description:</label>
                  <textarea type="text" className="form-control" onChange={handleChange} id="edescription" name='edescription' value={note.edescription} rows={5} />
                </div>
                <div className="">
                  <label htmlFor="tag" className="form-label">Tag:</label>
                  <input type="text" className="form-control" onChange={handleChange} id="etag" name="etag" value={note.etag} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5 } type="button" className="btn btn-primary" onClick={handleClick}>Update</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container text-center">
        {notes.length === 0 && "No notes to display, Please add new note!"}
      </div>
      {notes.map((note) => {
        return <NoteItem key={note.id} updateNote={updateNote} showAlert={props.showAlert} note={note}/>
      })}
    </div>
  )
}

export default Notes
