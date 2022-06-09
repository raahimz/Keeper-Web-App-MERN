import React, { useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';


function CreateArea(props) {
    let title = '';
    let content = '';
    let [showContentInput, setShowContentInput] = useState(false);

   function update(event) {
        const name = event.target.name;
        const value = event.target.value;
        
        if (name === 'title') {
            title = value;
            value != '' ? setShowContentInput(true) : setShowContentInput(false);
        } else {
            content = value;
        }
   }

    return (
        <div>
        <form className="create-note">
            <input onChange={update} name="title" placeholder="Title" />
            {showContentInput && <textarea onChange={update} name="content" placeholder="Take a note..." rows="3" /> }
            <Zoom in={showContentInput}>
                <Fab onClick={(event) => {
                    props.addNote(event, title, content);
                    setShowContentInput(false);
                    title='';
                    content='';
                    event.preventDefault();
                    }}>
                    <AddIcon />
                </Fab>
            </Zoom>
        </form>
        </div>
    );
}

export default CreateArea;