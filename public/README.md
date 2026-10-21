# Proyecto de Práctica

Proyecto personal que uso para practicar desarrollo web de forma continua: maquetado con HTML y CSS, JavaScript en el navegador y un backend propio con Node.js y Express. Empezó como un ejercicio de frontend para retomar la práctica y fue creciendo hasta convertirse en una app full stack chica.

> **Nota:** es un proyecto de práctica, no un producto. Incluye algunas funciones lúdicas (un cartel animado, un botón que esquiva el mouse) que armé a propósito para practicar eventos, animaciones CSS y manipulación del DOM de una forma más entretenida.

## Qué incluye

**Página principal (`index.html`)**
- Layout armado con **CSS Grid** (`grid-template-areas`) que se reacomoda con un botón.
- **Calculadora** con botones, hecha con delegación de eventos: un solo listener para todos los botones, validación para no encadenar operadores y scroll automático en la pantalla.
- Cartel animado con `@keyframes` (entra por la izquierda, se centra y sale por la derecha).
- Botón que esquiva el mouse con `mouseenter` y posiciones aleatorias.
- Modal de navegación con overlay para cambiar de página.

**Página de cards (`cards.html`)**
- Grilla responsive con `repeat(auto-fit, minmax(250px, 1fr))`, sin media queries.
- Cards generadas dinámicamente con `document.createElement`.
- Las frases de las cards se traen desde el backend con `fetch`.
- Input para guardar frases nuevas.
- Dos formas de borrar: **"Eliminar esta card"** (solo la quita de la vista) y **"Eliminar esta frase"** (la borra también del servidor).
- Los títulos se renumeran según la posición real en el DOM tras cada cambio.
- Manejo de errores: si el servidor no responde o la frase es inválida, se avisa al usuario.

## Tecnologías

- HTML5, CSS3 (Grid, Flexbox, variables CSS, animaciones)
- JavaScript (DOM, eventos, `fetch`, async con promesas)
- Node.js y Express
- Persistencia en archivo JSON (módulo `fs`)
- Git y GitHub (ramas de feature y Pull Requests)

## Estructura

```
proyecto-express/
├── server.js          # Servidor Express y rutas de la API
├── frases.json        # Datos persistidos
├── package.json
└── public/
    ├── pages/
    │   ├── index.html
    │   └── cards.html
    ├── style/
    │   └── style.css
    └── script.js
```

## Cómo correrlo

Requiere [Node.js](https://nodejs.org/) instalado.

```bash
git clone https://github.com/EzequielBarrera/Proyecto-de-Practica.git
cd Proyecto-de-Practica
npm install
npm start
```

Después abrí `http://localhost:3000/pages/index.html` en el navegador.

## Vista previa

![Captura de pantalla del proyecto](../public/media/imagenproyecto.jpeg)

## API

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/frases-random` | Devuelve todas las frases guardadas |
| `POST` | `/api/frases-random` | Agrega una frase. Body: `{ "frase": "texto" }`. Responde `400` si está vacía |
| `DELETE` | `/api/frases-random/:indice` | Borra la frase en esa posición |

## Lo que practiqué con este proyecto

- Diseñar layouts con Grid y reutilizar clases modificadoras (`.main.invertido`).
- Delegación de eventos y manejo de estado en una calculadora.
- Crear, modificar y borrar elementos del DOM de forma dinámica.
- Armar una API REST mínima (GET, POST, DELETE) con parámetros de ruta.
- Validar datos en el backend y propagar los errores al frontend.
- Flujo de trabajo con Git: una rama por feature, commits descriptivos y Pull Requests.

## Próximos pasos

- Migrar la persistencia de JSON a SQLite.

## Autor

**Ezequiel Barrera** — [GitHub](https://github.com/EzequielBarrera)
