const fs = require("fs");
const path = require("path");

// ROUTING

module.exports = app => {

    var notes = JSON.parse(fs.readFileSync("./db/db.json"));

    app.get("/api/notes", function (req, res) {
        res.json(notes);
    });

    app.post("/api/notes", function (req, res) {
        let newNote = req.body;

        newNote.id = notes.length + 1;
        notes.push(newNote);
        updateNDB();
        console.log("New Note Added");
    });

    app.get("/api/notes/:id", function (req, res) {
        res.json(notes[req.params.id]);
    });

    app.delete("/api/notes/:id", function (req, res) {
        notes.splice(req.params.id, 1);
        if(notes){
            for(let i = 0; i < notes.length; i++)
            {
                notes[i].id = i;
            }
        }
        updateNDB();
        console.log("Note deleted");
        res.end();
    });

    function updateNDB() {
        fs.writeFile("db/db.json", JSON.stringify(notes), err => {
            if (err) throw err;
            
            return true;

        });

    };


}