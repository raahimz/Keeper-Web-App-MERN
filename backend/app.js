const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/notesDB', {useNewURLParser: true});

const noteSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true}
});

const Note = new mongoose.model('Note', noteSchema);

app.get('/notes', (req, res) => {
    Note.find()
        .then(notes => res.json(notes))
        .catch(err => res.status(400).json('Failed to load notes. Error: ' + err));
});

app.post('/notes/add', (req, res) => {
    const newNote = new Note({
        title: req.body.title,
        content: req.body.content,
    });

    newNote.save()
        .then(() => res.json('New note added!'))
        .catch(err => res.status(400).json('Failed to add new note. Error: ' + err));
});

app.delete('/notes/delete/:id', (req, res) => {
    Note.findByIdAndRemove(req.params.id)
        .then(() => res.json('Deleted note!'))
        .catch(err => res.status(400).json('Failed to delete note. Error: ' + err));
});

app.listen(3000, function() {
    'Server started at port 3000';
});