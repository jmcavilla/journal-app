import React, { useEffect, useRef } from 'react'
import NotesAppBar from './NotesAppBar'
import { useForm } from '../../hooks/useForm'
import { useSelector, useDispatch } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes'

const NoteScreen = () => {
    const dispatch = useDispatch();
    const {active: note} = useSelector(state => state.notes);

    const [formValues, handleInputChange, reset] = useForm(note);

    const activeId = useRef(note.id)
    useEffect(() => {
        if(note.id !== activeId.current){
            reset(note);
            activeId.current = note.id;
        }
    }, [note, reset]);

    useEffect(() => {
        
        dispatch(activeNote(note.id, {...formValues}))

    }, [formValues, dispatch]);

    const {title, body} = formValues;

    const handleDelete = () => {
        dispatch(startDeleting(activeId.current));
    }
    
    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                    <input
                        type="text"
                        placeholder="Some awesome title"
                        className="notes__title-input"
                        name="title"
                        value={title}
                        onChange={handleInputChange}
                    />

                    <textarea
                        placeholder="What happened today?"
                        className="notes__textarea"
                        name="body"
                        value={body}
                        onChange={handleInputChange}
                    ></textarea>

                    {(note.url) && <div className="notes__image">
                        <img
                            src={note.url}
                            alt="imagen"
                        />
                    </div>}
            </div>
            <button
                className="btn btn-danger"
                onClick={handleDelete}
            >Delete</button>
        </div>
    )
}

export default NoteScreen
