const fs = require("fs");
const path = require("path");

// ROUTING

module.exports = app => {
    fs.readFile("db/db.json", "utf8", (err, data) =>{
       if(err) throw err;
       var notes = JSON.parse(data);
       
       app.get("/api/notes", function(req, res){
           return res.json(notes);
       });

       app.post("/api/notes", function(req, res){
           let newNote = req.body;
           notes.push(newNote);
           updateNDB();
           console.log("New Note Added");
       });

       app.delete("/api/notes/:id", function(req, res){
           notes.splice(req.params.id, 1);
           updateNDB();
           console.log("Note deleted");
       });

       function updateNDB(){
           fs.writeFile("db/db.json", JSON.stringify(notes, '\t'), err=>{
               if (err) throw err;
               //res.send();
               return true;
           });

       };

    });
}