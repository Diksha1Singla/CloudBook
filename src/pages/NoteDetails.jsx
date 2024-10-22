import { useEffect, useRef, useState } from 'react';
import {useAuth} from '../store/auth_store'
import { AddNote } from './AddNote';
import { NoteItems } from './NoteItems'
// import {useHistory} from  'react-router'

import '@fortawesome/fontawesome-free/css/all.min.css';

export const NoteDetails = ()=>{
    // let history = useHistory();
    const {notes,editNote} = useAuth()
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note,setnote] = useState({id: "", title: "", description: "", tag: ""})
    const updateNote = (Currnote)=>{
        ref.current.click();
        // setnote(Currnote)
        setnote({id:Currnote._id,title:Currnote.title,description:Currnote.description})
    }
    const {getAllNotes} = useAuth()
    useEffect(()=>{
        getAllNotes()

        // if(localStorage.getItem('token'))
        // {getAllNotes()}
        // else{
        //     history.push('/login')
        // }
    },[])
    const handleSubmit = ()=>{
        // e.preventDefault();
        editNote(note.id,note.title,note.description,note.tag);
        refClose.current.click()
    }
    const onChange = (e) =>{
        setnote({...note,[e.target.name]:e.target.value})
    }
    return(
        <>        
            <AddNote/>
            <button ref={ref} type="button"  className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form className="px-4 py-4">
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required/>
                        </div>
                    </form >
                </div>
                <div className="modal-footer">
                    <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>update changes</button>
                </div>
                </div>
            </div>
            </div>
            <div className="row mx-3">
                {notes && notes.length > 0 ? (
                    notes.map((note) => <NoteItems key={note._id} updateNote={updateNote} note={note} />)
                ) : (
                    <p style={{color:"white"}}>No notes available.</p>
                )}
            </div>
        </>
    )
}