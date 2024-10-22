import PropTypes from 'prop-types';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useAuth } from '../store/auth_store';

export const NoteItems = (props)=>{
    const {deleteNote} = useAuth()
    const {note,updateNote} = props
    // console.log("Note._id = ",note._id)
    return(
        <>
            <div className="card mx-3 my-3" style={{width: "18rem"}}>
                <div className="card-body">
                    
                    <h5 className="card-title" key={note._id}>{note.title}
                        <i className="fa-sharp fa-solid fa-trash mx-4" onClick={()=>{deleteNote(note._id)}}></i>
                        <i className="fa-solid fa-pen-to-square" onClick={()=>{updateNote(note)}}></i>
                    </h5>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </>
    )
}
NoteItems.propTypes = {
    note: PropTypes.shape({
        title: PropTypes.string.isRequired,
    }).isRequired,
};