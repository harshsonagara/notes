const express = require('express');

const app = express();

app.use(express.json());

let notes = [];

app.post('/notes', (req, res) => {

    notes.push(req.body);
    res.json({
        message: "notes added successfully",
    })
});

app.get('/notes', (req, res) => {
    res.json({
        notes:notes
    })
})

app.delete('/notes/:index', (req, res) => {
    const index = req.params.index;
    delete notes[index];
    res.json({
        message:"note delete successfully "
    })

})

app.patch('/notes/:index', (req, res) => {
    const index = req.params.index;
    const { title } = req.body;
    notes[index].title = title;
    res.json({
        message: "title updated successfully"
    })
})

app.listen(3000, () => {
    console.log('Server is Running on port 3000 http://localhost:3000/');

})