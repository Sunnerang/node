const express = require('express')
const app = express()
const port = 8080
var bodyParser = require('body-parser')

let entries = [];
var idCount = 0;
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/Entries', (req, res) => {
    res.json(entries)
})
app.get('/Entries/:id', (req, res) => {
    res.json(entries.find(p => p.id == req.params.id))
})
app.post('/Entries', (req, res) => {
    var entry = {...req.body, id : idCount}
    entries = [...entries, entry]
    idCount++
    res.json(entries)
})
app.put('/Entries/:id', (req, res) => {
    var entryIdentified = entries.find(p => p.id == req.params.id)
    entryIdentified = {...entryIdentified, ...req.body}
    entries = entries.filter(p => p.id != req.params.id)
    entries = [...entries, entryIdentified]
    res.json(entries)
})
app.delete('/Entries/:id', (req, res) => {
    entries = entries.filter(p => p.id != req.params.id)
    res.send(entries)
})
app.listen(port, () => {
  console.log(`FRA listening on port ${port}`)
})