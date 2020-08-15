import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes';

const NotesAppBar = () => {

    const dispatch = useDispatch();
    const {active} = useSelector(state => state.notes)

    const handleSave = () => {
        dispatch(startSaveNote(active));
    }
    const handlePictureUpload = () => {
        document.querySelector('#fileSelector').click();
    }
    const handleFireChange = (e) => {
        const file = e.target.files[0]
        if(file){
            dispatch(startUploading(file))
        }
    }

    return (
        <div className="notes__appbar">
            <span>28 agosto 2020</span>
            <input
                id="fileSelector"
                type="file"
                name="file"
                style={{display:"none"}}
                onChange={handleFireChange}
            />
            <div>
                <button
                    className="btn"
                    onClick={handlePictureUpload}
                >Picture</button>
                <button
                    className="btn"
                    onClick={handleSave}
                >Save</button>
            </div>
        </div>
    )
}

export default NotesAppBar
