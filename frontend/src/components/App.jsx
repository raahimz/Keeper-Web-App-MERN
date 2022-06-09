import React, {useState, useEffect} from 'react';
import Header from './Header';
import Footer from './Footer';
import Note from './Note';
import CreateArea from './CreateArea';
import axios from 'axios';

function App() {
    const [notes, setNotes] = useState([]);

    useEffect(() => (getNotes()), []); //this triggers getNotes() when the app loads

    function getNotes() {
        console.log('Getting notes triggered... ')
        axios.get('http://localhost:3000/notes')
            .then(res => {
                setNotes(res.data);
            });
    }

    function addNote(event, title, content) {
        const options = {
            url: 'http://localhost:3000/notes/add',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                title: title,
                content: content
            }
        };
            
        axios(options)
        .then(response => {
            console.log(response.status);
        });

        setTimeout(() => getNotes(), 185);
    }

    function deleteNote(id) {
        const options = {
            url: 'http://localhost:3000/notes/delete/' + id,
            method: 'DELETE',
        };
        axios(options)
        .then(response => {
            console.log(response.status);
        });

        setTimeout(() => getNotes(), 150);
    }

    return (
    <div>
        <Header />
        <CreateArea addNote={addNote} />
        {notes.map((note, index) => (
            <Note deleteNote={deleteNote} key={index} id={note._id} title={note.title} content={note.content} />
        ))}
        <Footer />
    </div>
    );
}

export default App;