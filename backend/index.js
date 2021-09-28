const express = require('express') // lo importamos
const app = express() 	// representa a la aplicacion
const cors = require('cors')

let notes = [
  {
    id: 1,
    content: 'bla'
  },
  {
    id: 2,
    content: 'hola'
  }
]

app.use(cors())
app.use(express.json()) 	// para tener el bodyparser
app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})	// app.metodoHTTP('path', (callback) => {que tiene que hacer})
app.get('/api/notes', (request, response) => {
  response.json(notes)
})
app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id) // porque siempre vienen en string
  const note = notes.find(note => note.id === id)
  response.json(note)
})
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id) // porque siempre vienen en string
  notes = notes.filter(note => note.id !== id)
  response.json(notes)
})
app.post('/api/notes', (request, response) => {
  const note = request.body
  if (!note || !note.content) {
    return response.status(400).json({
      error: 'note.content is missing'
    })
  }
  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)
  const newNote = {
    id: maxId + 1,
    content: note.content, // aca el campo que tenga la request
    date: new Date().toISOString()
  }
  notes.concat(newNote)
  response.status(201).json(newNote)
})
const PORT = 3001
app.listen(PORT, () => {
  console.log('Server running on port ${PORT}')
})
