import {useEffect, useState } from "react"
import PIC from "../images/background.png"
import {useAuth} from '../store/auth_store'
export const AddNote = () => {
    // const context = useContext(ContextValue)
    const {addNote,getAllNotes} = useAuth()
    const [note,setnote] = useState({title:"",description:"",tag:"default"})
    useEffect(()=>{
        getAllNotes()
    },[])
    const handleSubmit = ()=>{
        // e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setnote({title: "", description: "", tag: ""})
    }
    const handleChange = (e) =>{
        setnote({...note,[e.target.name]:e.target.value})
    }
    
    return(
        <>
            <div className="row row-col-2">
                <div className="col">
                    <form className="px-4 py-4" style={{color:"white"}}>
                        <div className="mb-3">
                            <label htmlFor="exampleDropdownFormTitle" className="form-label">Tiltle</label>
                            <input type="text" value={note.title} onChange={handleChange} name="title" style={{backgroundColor:"rgb(158, 161, 164)"}}  className="form-control" id="exampleDropdownFormTitle" placeholder=""/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleDropdownFormdescription" className="form-label">Description</label>
                            <input type="text" value={note.description} onChange={handleChange} name="description" style={{backgroundColor:"rgb(158, 161, 164)"}} className="form-control" id="exampleDropdownFormdescription" placeholder=""/>
                        </div>
                        <button type="submit" style={{backgroundColor:"#539ef3"}} className="btn btn-primary" onClick={handleSubmit}>Add Note</button>
                    </form >
                </div>
                <div className="col text-center">
                    <img src={PIC} alt="" />
                </div>
            </div>
        </>
    )
}