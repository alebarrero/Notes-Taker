//Dependencies//
const express = require('express');
const fs = require('fs');
const path = require('path');
const util = require ('util');

//Async//
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//Server//
const app = express();
const PORT = 3001;

app.use(express.static('./Develop/public'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//GET request//
app.get('/api/notes', function(req,res){
    readFileAsync('./Develop/db/db.json', 'utf8').then(function(data){
        notes=[].concat(JSON.parse(data))
        res.json(notes);
    })
})

//POST request//
app.post('/api/notes', function(req,res) {
    const note = req.body;
    readFileAsync('./Develop/db/db.json', 'utf8').then(function(data) {
        const notes = [].concat(JSON.parse(parse));
        note.id = notes.length + 1
        notes.push(note);
        return notes
    }).then(function(notes) { 
        writeFileAsync('.Develop/db/db.json', JSON.stringify(notes))
        res.json(notes);
    })
});

//DELETE request//
app.delete('/api/notes/:id', function(req,res){
    const IdtoDelete= parseInt(req.params.id);
    readFileAsync('./Develop/db/db.json', 'utf8').then(function(data){
        const notes = [].concat(JSON.parse(data));
        const newNotesData = []
        for(let i = 0; i<notes.length; i ++){
            if(IdtoDelete !== notes[i].id){
                newNotesData.push(notes[i])
            }
        }
        return newNotesData
    }).then(function(notes){ 
        writeFileAsync('./Develop/db/db.json', JSON.stringify(notes))
        res.send('Saved!');
    })
    })

    //Routes//

    app.get('/notes', function(req,res){
        res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
        });

    app.get('/', function(req,res){
        res.sendFile(path.join(__dirname, './Develop/public/index.html'));
    });

  app.listen(PORT, () => 
  console.log('Listening on PORT'));
