const express = require('express')
const app = express()
const PUERTO = 3000

app.use(express.static('public'))
app.use(express.json())

app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`)
})


// RUTAS
let frases = [
    "hola",
    "buen día",
    "todo mal",
]

app.post('/api/frases-random', (req, res) => {
    const nuevaFrase = req.body.frase
    frases.push(nuevaFrase)
    res.json({ mensaje: 'Frase agregada', frases })
})

app.get('/api/frases-random', (req, res) => {
    res.json({ frases })
})