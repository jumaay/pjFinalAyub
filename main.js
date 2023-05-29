// Creo el array original de juegos
const arrayJuegos = [
    {
        juego: 'pokemon',
        genero: 'rpg',
        duracion: 20,
        imagen: "https://m.media-amazon.com/images/I/71tFts8ENbL.jpg"
    },
    {
        juego: 'digimon',
        genero: 'rpg',
        duracion: 30,
        imagen: "https://upload.wikimedia.org/wikipedia/en/1/1f/Digimon_Survive.png"
    },
    {
        juego: 'resident evil',
        genero: 'terror',
        duracion: 15,
        imagen: "https://i.ebayimg.com/images/g/jDMAAOSwQ0RjeLpu/s-l1600.jpg"
    },
    {
        juego: 'persona 5',
        genero: 'rpg',
        duracion: 100,
        imagen: "https://upload.wikimedia.org/wikipedia/en/b/b0/Persona_5_cover_art.jpg"
    },
    {
        juego: 'star wars',
        genero: 'accion',
        duracion: 24,
        imagen: "https://m.media-amazon.com/images/I/91L6hZRWvPL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        juego: 'zelda',
        genero: 'aventura',
        duracion: 48,
        imagen: "https://www.gameshub.com/wp-content/uploads/sites/5/2022/09/legend-of-zelda-tears-of-the-kingdom.jpeg"
    },
    {
        juego: 'blair witch',
        genero: 'terror',
        duracion: 24,
        imagen: "https://i.ytimg.com/vi/m50j3t52TtY/maxresdefault.jpg"
    }
]

// Recupero el array del Local Storage
const arrayJuegosGuardados = JSON.parse(localStorage.getItem("arrayJuegos"));

// Verifico si existe el array en el Local Storage
if (arrayJuegosGuardados) {
  // Reemplazo el array original por el array recuperado
  arrayJuegos.length = 0;
  arrayJuegos.push(...arrayJuegosGuardados);
}

// Muestro los juegos en la pantalla
const contenedor = document.getElementById("resultado");

function mostrarJuegos(juegos) {
  contenedor.innerHTML = "";
  juegos.forEach((juego) => {
    const { juego: nombre, genero, duracion, imagen } = juego;
    contenedor.innerHTML += `
      <div class="tarjeta">
        <div class="imagen">
          <img src="${imagen}" alt="${nombre}">
        </div>
        <div class="informacion">
          <h3>${nombre}</h3>
          <p><strong>Género:</strong> ${genero}</p>
          <p><strong>Duración:</strong> ${duracion} horas</p>
        </div>
      </div>
    `;
  });
}

mostrarJuegos(arrayJuegos);

// Constructor de juegos
function Juegos(juego, genero, duracion, imagen){
    this.juego = juego;
    this.genero = genero;
    this.duracion = duracion;
    this.imagen = imagen;
}



// Plantilla donde muestra la busqueda
const resultado = document.getElementById("resultado");

// Plantilla donde se encuentra mi formulario
const formulario = document.getElementById("formulario");

// A través de esta función se genera la búsqueda de juegos por género, si no se encuentra muestra "género no encontrado"
const filtrar = () =>{

    resultado.innerHTML = '';
    
    const texto = formulario.value.toLowerCase();
    for ( let jueguito of arrayJuegos ){
        let nombre = jueguito.genero;
        nombre.toLowerCase();

        if ( nombre.indexOf(texto) !== -1){
            resultado.innerHTML += `
            <div class="card" style="width: 18rem;" id="resultado">
                <img src=${jueguito.imagen} class="card-img-top coverImg" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Nombre: ${jueguito.juego.toUpperCase()}</h5>
                    <h5 class="card-title">Genero: ${jueguito.genero.toUpperCase()}</h5>
                    <p class="card-text">Duracion: ${jueguito.duracion}hs</p>
                </div>
            </div>
            `
        }

    }
    if ( resultado.innerHTML === '' ){
        resultado.innerHTML = `<h2 class="h2Error">GENERO DE JUEGOS NO ENCONTRADO</h2>`
    }

}

// A partir de acá tomo los datos del form para agregar nuevos juegos al array
const nuevoJuego = document.getElementById("agregarJuego");

agregarJuego.addEventListener("submit", (event) => {
    event.preventDefault();

    // Llamo al formulario 
    const nombreDelJuegoInput = document.querySelector('#nombreJuego');
    const generoDelJuegoInput = document.querySelector('#generoJuego');
    const duracionDelJuegoInput = document.querySelector('#duracionJuego');
    const imagenDelJuegoInput = document.querySelector('#imagenJuego');

    // Tomo el valor de los input
    const nombreDelJuego = nombreDelJuegoInput.value.toLowerCase();
    const generoDelJuego = generoDelJuegoInput.value.toLowerCase();
    const duracionDelJuego = duracionDelJuegoInput.value;
    const imagenDelJuego = imagenDelJuegoInput.value;

    // Creo un nuevo objeto con esa info
    const nuevoObjeto = new Juegos(nombreDelJuego, generoDelJuego, duracionDelJuego, imagenDelJuego);

    // Agrego el objeto al array
    arrayJuegos.push(nuevoObjeto);

    // Guardo el nuevo array en localstorage
    localStorage.setItem("arrayJuegos", JSON.stringify(arrayJuegos));

    // Reseteo el formulario
    nuevoJuego.reset();

    //Vuelvo a llamar a filtrar() para que refresque el nuevo resultado en pantalla
    filtrar();
    
});

// De esta manera lo que hago es que al levantar cada tecla del teclado realice la búsqueda correspondiente
formulario.addEventListener('keyup', filtrar)

filtrar();

// Llamo a la API que muestra "datos random de juegos" (no encontre ninguna API que haga eso, uso un placeholder)

const apiDatos = "https://jsonplaceholder.typicode.com/posts?userId=1";
const contenedorDatos = document.getElementById("contenedorDatos");
const contenedorAPI = document.getElementById("contenedorAPI");

fetch (apiDatos)
        .then(respuesta => respuesta.json())
        .then((datos) => {
            const datoAleatorio = datos[Math.floor(Math.random() * datos.length)];
            mostrarDatos(datoAleatorio);
        })
        .catch(error => console.log(error))

// Función que muestra los datos

function mostrarDatos(datoAPI) {
    contenedorAPI.innerHTML += `
        <div> 
            <p class="datoRandom"><span class="datoRandomTitle">Datos random de jueguitos:</span> "${datoAPI.body}"</p>
        </div>
    `;
}

// Recordatorio de tomar awita

setTimeout( () => {
    Toastify({
        text: "¡Recordá tomar awita mientras jugas!", 
        duration: 5000,
        newWindow: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            color: "#FFE569",
            background: "linear-gradient(to right, #B70404, #DB005B)"
          },
    }).showToast();
}, 15000)