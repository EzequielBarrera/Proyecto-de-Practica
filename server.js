const { error } = require('console')
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


app.post('/api/frases-random', (req, res) => {
    const nuevaFrase = req.body.frase

    if (!nuevaFrase || nuevaFrase.trim() === '') {
        return res.status(400).json({ error: 'La frase no puede estar vacía' })
    }

    const frases = leerFrases()
    frases.push(nuevaFrase)
    guardarFrases(frases)
    res.json({ mensaje: 'Frase agregada', frases })
})

app.get('/api/frases-random', (req, res) => {
    const frases = leerFrases()
    res.json({ frases })
})

app.delete('/api/frases-random/:indice', (req, res) => {
    const frases = leerFrases()
    const indice = Number(req.params.indice)

    if (!Number.isInteger(indice) || indice < 0 || indice >= frases.length) {
        return res.status(400).json({
            error: 'El índice de la frase no es válido'
        })
    }

    frases.splice(indice, 1)
    guardarFrases(frases)

    res.json({
        mensaje: 'Frase eliminada',
        frases
    })
})