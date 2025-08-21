const express = require('express');

const app = express();
app.use(express.json());

// In-memory notes array (simple demo storage)
const notes = [];

// Create a note
app.post('/notes', (req, res) => {
    const note = req.body || {};
    notes.push(note);
    res.status(201).json({ message: 'note added', note, index: notes.length - 1 });
});

// Read all notes
app.get('/notes', (req, res) => {
    res.json({ notes });
});

// Update only the title of a note by numeric index
app.patch('/notes/:index', (req, res) => {
    const index = Number(req.params.index);
    const { title } = req.body || {};

    if (!Number.isInteger(index) || index < 0 || index >= notes.length) {
        return res.status(404).json({ message: 'Note not found' });
    }
    if (typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ message: 'Invalid title' });
    }

    notes[index].title = title;
    res.json({ message: 'title updated', note: notes[index] });
});

// Delete a note by numeric index
app.delete('/notes/:index', (req, res) => {
    const index = Number(req.params.index);
    if (!Number.isInteger(index) || index < 0 || index >= notes.length) {
        return res.status(404).json({ message: 'Note not found' });
    }
    notes.splice(index, 1);
    res.json({ message: 'note deleted' });
});

// Only start the server when run directly
if (require.main === module) {
    app.listen(3000, () => console.log('Server running on http://localhost:3000'));
}

module.exports = app;

