// API
fetch('/api/frases-random')
    .then(respuesta => respuesta.json())
    .then(datos => {
        console.log(datos.frase)
    })

// Alerta de amor
let boton = document.getElementById("botonAlert")
let cartel = document.getElementById("cartelTeAmo")

if (boton) {
    boton.addEventListener('click', () => {
        cartel.classList.add('animando')

        setTimeout(() => {
            cartel.classList.remove('animando')
        }, 3000)
    })
}

// Botón dar vuelta la página
let botonInvertir = document.getElementById("botonInvertir")
let main = document.querySelector(".main")

if (botonInvertir) {
    botonInvertir.addEventListener('click', () => {
        main.classList.toggle('invertido')
    })
}

// Botón que no puede clickearse   

let botonMovimiento = document.getElementById("botonMovimiento");

if (botonMovimiento) {
    botonMovimiento.addEventListener('mouseenter', () => {
        const maxX = 100; // píxeles de margen para moverse
        const maxY = 500;
        const randomX = Math.floor(Math.random() * maxX) - maxX / 2;
        const randomY = Math.floor(Math.random() * maxY) - maxY / 2;

        botonMovimiento.style.left = randomX + 'px';
        botonMovimiento.style.top = randomY + 'px';
    });
}

// MODAL CAMBIAR PÁGINA
let botonMenuDePaginas = document.getElementById("cambiarPagina")
let modalMenu = document.getElementById("modalMenu")

if (botonMenuDePaginas) {
    botonMenuDePaginas.addEventListener('click', () => {
        modalMenu.classList.toggle('oculto')
    })

    modalMenu.addEventListener('click', (evento) => {
        if (evento.target === modalMenu) {
            modalMenu.classList.add('oculto')
        }
    })
}

// FUNCIONALIDAD DE LA CALCULADORA

let pantalla = document.getElementById("pantalla")
let contenedorBotones = document.querySelector(".botones")
let display = "0"
let resultadoRecienCalculado = false

if (contenedorBotones) {
    contenedorBotones.addEventListener('click', (evento) => {
        const boton = evento.target
        console.log("Clickeaste:", boton)
        console.log("Clase:", boton.className)

        if (boton.classList.contains('btn-numero')) {
            if (display === "0" || resultadoRecienCalculado) {
                display = boton.dataset.valor
                resultadoRecienCalculado = false
            } else {
                display = display + boton.dataset.valor
            }
        }

        if (boton.classList.contains('btn-operador')) {
            if (["+", "-", "*", "/"].includes(display.slice(-1))) {
                alert('No podés agregar dos operadores juntos')
            } else {
                display = display + boton.dataset.valor
            }
        }

        if (boton.classList.contains('btn-clear')) {
            if (display != "0") {
                display = "0"
            }
        }

        if (boton.classList.contains('btn-igual')) {
            display = String(eval(display))
            resultadoRecienCalculado = true
        }

        pantalla.textContent = display
        pantalla.scrollLeft = pantalla.scrollWidth
    })
}

// Título de Cards dinámico

function renombrarTitulos() {
    const todasLasCards = document.querySelectorAll('.card')
    todasLasCards.forEach((card, index) => {
        const titulo = card.querySelector('h3')
        titulo.textContent = `Título ${index + 1}`
    })
}

// Agregar más cards en cards.html

let botonAgregarCard = document.getElementById("botonAgregarCard")
let botonEliminarCards = document.getElementById("botonEliminarCards")
let celdaEliminarCards = document.querySelector('.celda-3')
let contenedorCards = document.querySelector(".main-cards")
let contadorCards = 6

// if (botonAgregarCard) {
//     botonAgregarCard.addEventListener('click', () => {
//         contadorCards++
//         celdaEliminarCards.classList.remove('oculto')

//         // 1. Crear el div contenedor de la card
//         const nuevaCard = document.createElement('div')
//         nuevaCard.classList.add('card')
//         nuevaCard.classList.add('card-generada')

//         // 2. Crear el título
//         const titulo = document.createElement('h3')
//         titulo.textContent = `Título ${contadorCards}`

//         // 3. Crear el párrafo
//         const parrafo = document.createElement('p')
//         parrafo.textContent = 'Carta generada artificialmente'

//         // 4. Meter el título y el párrafo adentro de la card.
//         nuevaCard.appendChild(titulo)
//         nuevaCard.appendChild(parrafo)

//         // 5. Meter la card completa adentro del contenedor
//         contenedorCards.appendChild(nuevaCard)
//     })
//     if (botonEliminarCards) {
//         botonEliminarCards.addEventListener('click', () => {
//             const cardsGeneradas = document.querySelectorAll('.card-generada')
//             cardsGeneradas.forEach((card) => {
//                 card.remove()
//             })
//             celdaEliminarCards.classList.add('oculto')
//             contadorCards = 6
//         })
//     }
// }

if (botonAgregarCard) {
    botonAgregarCard.addEventListener('click', () => {
        const cargando = document.getElementById('cargando')
        cargando.classList.remove('oculto')

        fetch('/api/frases-random')
            .then(respuesta => respuesta.json())
            .then(datos => {
                cargando.classList.add('oculto')
                contadorCards++
                celdaEliminarCards.classList.remove('oculto')

                const indiceAleatorio = Math.floor(Math.random() * datos.frases.length)
                const fraseElegida = datos.frases[indiceAleatorio]

                const nuevaCard = document.createElement('div')
                nuevaCard.classList.add('card')
                nuevaCard.classList.add('card-generada')
                nuevaCard.dataset.indiceFrase = indiceAleatorio

                const titulo = document.createElement('h3')
                titulo.textContent = `Título ${contadorCards}`

                const parrafo = document.createElement('p')
                parrafo.textContent = fraseElegida

                const botonEliminarCard = document.createElement('button')
                botonEliminarCard.textContent = 'Eliminar esta card'

                botonEliminarCard.addEventListener('click', () => {
                    nuevaCard.remove()
                    renombrarTitulos()
                    contadorCards--
                    const cardsRestantes = document.querySelectorAll('.card-generada')
                    if (cardsRestantes.length === 0) {
                        celdaEliminarCards.classList.add('oculto')
                    }
                })

                const botonEliminarFrase = document.createElement('button')
                botonEliminarFrase.textContent = 'Eliminar esta frase'

                botonEliminarFrase.addEventListener('click', () => {
                    const indice = nuevaCard.dataset.indiceFrase

                    fetch(`/api/frases-random/${indice}`, {
                        method: 'DELETE'
                    })
                        .then(respuesta => respuesta.json)
                        .then(() => {
                            nuevaCard.remove()
                            renombrarTitulos()
                            contadorCards--
                            const cardsRestantes = document.querySelectorAll('.card-generada')
                            if (cardsRestantes.length === 0) {
                                celdaEliminarCards.classList.add('oculto')
                            }
                        })
                })

                const contenedorBotones = document.createElement('div')
                contenedorBotones.classList.add('card-botones')

                contenedorBotones.appendChild(botonEliminarCard)
                contenedorBotones.appendChild(botonEliminarFrase)

                nuevaCard.appendChild(titulo)
                nuevaCard.appendChild(parrafo)
                nuevaCard.appendChild(contenedorBotones)

                contenedorCards.appendChild(nuevaCard)
                renombrarTitulos()
            })
            .catch(error => {
                cargando.classList.add('oculto')
                alert('No se pudo cargar la frase')
            })
        if (botonEliminarCards) {
            botonEliminarCards.addEventListener('click', () => {
                const cardsGeneradas = document.querySelectorAll('.card-generada')
                cardsGeneradas.forEach((card) => {
                    card.remove()
                })
                celdaEliminarCards.classList.add('oculto')
                contadorCards = 6
            })
        }
    })
}

// Guardar frase con POST

let botonGuardarFrase = document.getElementById("botonGuardarFrase")
let inputFrase = document.getElementById("inputFrase")

if (botonGuardarFrase) {
    botonGuardarFrase.addEventListener('click', () => {
        fetch('/api/frases-random', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ frase: inputFrase.value })
        })
            .then(respuesta => {
                if (!respuesta.ok) {
                    throw new Error('No se pudo guardar la frase')
                }
                return respuesta.json()
            })
            .then(datos => {
                console.log(datos)
                inputFrase.value = ''
            })
            .catch(error => {
                alert(error.message)
            })
    })
}

// BOTÓN MODO OSCURO

let botonModoOscuro = document.getElementById("botonModoOscuro")

if (botonModoOscuro) {
    botonModoOscuro.addEventListener('click', () => {
        document.body.classList.toggle('oscuro')
    })
}