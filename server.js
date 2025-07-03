const express = require('express');

const app = express();

/* 

/notes => title & description 

*/
// Midlleware

app.use(express.json()); // // to have actual data in req.body
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