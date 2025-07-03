const express = require('express');

const app = express();

app.use(express.json()); 
let notes = [];
app.post('/notes', (req, res) => {
    const { title, description } = req.body;
    notes.push(req.body);
    res.json({
        message:"notes added successfully",
        notes:notes,
    })
})

app.listen(3000, () => {
    console.log('Server is Running on port 3000 http://localhost:3000/');

})