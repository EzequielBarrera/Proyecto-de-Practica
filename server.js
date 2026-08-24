const express = require('express')
const app = express()
const PUERTO = 3000
const fs = require('fs')

app.use(express.static('public'))
app.use(express.json())

app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`)
})

function leerFrases() {
    const datos = fs.readFileSync('frases.json', 'utf-8')
    return JSON.parse(datos)
}

function guardarFrases(frases) {
    fs.writeFileSync('frases.json', JSON.stringify(frases, null, 2))
}

// RUTAS

// app.post('/api/frases-random', (req, res) => {
//     const nuevaFrase = req.body.frase
//     frases.push(nuevaFrase)
//     res.json({ mensaje: 'Frase agregada', frases })
// })

// app.get('/api/frases-random', (req, res) => {
//     res.json({ frases })
// })

app.post('/api/frases-random', (req, res) => {
    const frases = leerFrases()
    const nuevaFrase = req.body.frase
    frases.push(nuevaFrase)
    guardarFrases(frases)
    res.json({ mensaje: 'Frase agregada', frases })
})

app.get('/api/frases-random', (req, res) => {
    const frases = leerFrases()
    res.json({ frases })
})