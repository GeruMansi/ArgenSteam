let mainForm = document.getElementById('mainForm');
let divRespuesta = document.getElementById('divRespuesta');
let listaVacia = document.getElementById('listaVacia');
let listaDeJuegos = document.getElementById('listaDeJuegos');
let formAgregar = document.getElementById('form-agregar');
let arrayJuegos = [];

// Crear ID único aleatorio
function crearID() {
    const cabecera = Date.now().toString(30);
    const cuerpo = Math.random().toString(30).substring(2);
    return cabecera + cuerpo;
}

// Crear botón para eliminar elemento de lista de deseados
function crearEliminar() {
    arrayJuegos.forEach(juego => {
        // Eliminar elemento de lista de deseados
        $(`#btn-${juego.id}`).click(() => {
            $(`#listaDeJuegos #${juego.id}`).remove()
            let indexBorrar = arrayJuegos.indexOf(arrayJuegos.find(item => item.id == juego.id))
            arrayJuegos.splice(indexBorrar, 1)
            localStorage.setItem('juegos', JSON.stringify(arrayJuegos))
            // Feedback de lista vacía
            if (arrayJuegos.length == 0) {
                listaDeJuegos.append(listaVacia);
            }
        })})    
}

// Cargar lista de deseados al DOM
function cargarLista() {
    arrayJuegos.forEach(juego => {
        listaDeJuegos.innerHTML += `
            <div id="${juego.id}" class="mb-2 d-flex align-items-center gap-3"><button id="btn-${juego.id}" class="btn btn-dark btn-sm py-0">X</button><div><strong>${juego.nombre}</strong>, precio Steam: ARS$ ${juego.precio} (precio final: ARS$ ${(juego.precio * 1.65).toFixed(2)})</div></div>
        `
    })
}

// Cargar Lista de deseados desde localStorage
if ('juegos' in localStorage) {
    arrayJuegos = JSON.parse(localStorage.getItem('juegos'));
    if (arrayJuegos.length != 0) {
        listaVacia.remove();
        cargarLista();
        crearEliminar();
    } else {
        listaDeJuegos.append(listaVacia)
    }
} else {
    listaDeJuegos.append(listaVacia)
}


$(() => {
    // Función de calculador    
    mainForm.addEventListener('submit', (e) => {
        divRespuesta.innerHTML = '';
        e.preventDefault();
        let datosInput = new FormData(e.target);
        divRespuesta.innerHTML = `
            <div class="alert alert-secondary col-md-4 m-auto my-3 text-center" role="alert">
                El precio final es de ARS$ ${(datosInput.get('input')*1.65).toFixed(2)}.
            </div>
        `
        mainForm.reset();
    })

    // Mostrar/ocultar lista de deseados
    $('#boton-ldd').click(() => {
        $('#div-lista').toggle('slow');
    })

    // Agregar elemento a lista de deseados
    class Juego {
        constructor(id, nombre, precio) {
            this.id = id;
            this.nombre = nombre;
            this.precio = precio;
        }
    }

    formAgregar.addEventListener('submit', (e) => {
        e.preventDefault();
        let datosJuego = new FormData(e.target);
        arrayJuegos.push(new Juego(crearID(), datosJuego.get('nombre'), datosJuego.get('precio')));
        localStorage.setItem('juegos', JSON.stringify(arrayJuegos));
        listaDeJuegos.innerHTML = '';
        cargarLista();
        crearEliminar();
        formAgregar.reset();
    })    
})



// Mostrar juegos populares desde json local.
let divPopulares = document.getElementById('populares')
let popularesMobile = document.getElementById('populares-mobile')
let divNovedades = document.getElementById('novedades')
let novedadesMobile = document.getElementById('novedades-mobile')

fetch('populares.json')
    .then(response => response.json())
    .then(juegos => {
        juegos.forEach(juego => {
            divPopulares.innerHTML += `
                <div class="card">
                    <img src="${juego.img}" class="card-img-top" alt="${juego.nombre}">
                    <div class="card-body d-flex flex-column justify-content-evenly">
                        <h3 class="card-title">${juego.nombre}</h3>
                        <p class="card-text">Precio Steam: ARS$ ${juego.precioSteam}</p>
                        <p class="card-text">Precio Final: ARS$ ${juego.precioFinal}</p>
                    </div>
                </div>
            `
        })
        for (let i = 0; i < juegos.length; i++) {
            if (i == 0) {
                popularesMobile.innerHTML += `
                    <div class="carousel-item active">
                        <div class="card">
                            <img src="${juegos[i].img}" class="card-img-top" alt="${juegos[i].nombre}">
                            <div class="card-body d-flex flex-column justify-content-evenly">
                                <h3 class="card-title">${juegos[i].nombre}</h3>
                                <p class="card-text">Precio Steam: ARS$ ${juegos[i].precioSteam}</p>
                                <p class="card-text">Precio Final: ARS$ ${juegos[i].precioFinal}</p>
                            </div>
                        </div>
                    </div>
                `
            } else {
                popularesMobile.innerHTML += `
                    <div class="carousel-item">
                        <div class="card">
                            <img src="${juegos[i].img}" class="card-img-top" alt="${juegos[i].nombre}">
                            <div class="card-body d-flex flex-column justify-content-evenly">
                                <h3 class="card-title">${juegos[i].nombre}</h3>
                                <p class="card-text">Precio Steam: ARS$ ${juegos[i].precioSteam}</p>
                                <p class="card-text">Precio Final: ARS$ ${juegos[i].precioFinal}</p>
                            </div>
                        </div>
                    </div>
                `
            }
        }
    })

fetch('novedades.json')
    .then(response => response.json())
    .then( juegos => {
        juegos.forEach(juego => {
            divNovedades.innerHTML += `
                <div class="card">
                    <img src="${juego.img}" class="card-img-top" alt="${juego.nombre}">
                    <div class="card-body d-flex flex-column justify-content-evenly">
                        <h3 class="card-title">${juego.nombre}</h3>
                        <p class="card-text">Precio Steam: ARS$ ${juego.precioSteam}</p>
                        <p class="card-text">Precio Final: ARS$ ${juego.precioFinal}</p>
                    </div>
                </div>
            `
        })
        for (let i = 0; i < juegos.length; i++) {
            if (i == 0) {
                novedadesMobile.innerHTML += `
                    <div class="carousel-item active">
                        <div class="card">
                            <img src="${juegos[i].img}" class="card-img-top" alt="${juegos[i].nombre}">
                            <div class="card-body d-flex flex-column justify-content-evenly">
                                <h3 class="card-title">${juegos[i].nombre}</h3>
                                <p class="card-text">Precio Steam: ARS$ ${juegos[i].precioSteam}</p>
                                <p class="card-text">Precio Final: ARS$ ${juegos[i].precioFinal}</p>
                            </div>
                        </div>
                    </div>
                `
            } else {
                novedadesMobile.innerHTML += `
                    <div class="carousel-item">
                        <div class="card">
                            <img src="${juegos[i].img}" class="card-img-top" alt="${juegos[i].nombre}">
                            <div class="card-body d-flex flex-column justify-content-evenly">
                                <h3 class="card-title">${juegos[i].nombre}</h3>
                                <p class="card-text">Precio Steam: ARS$ ${juegos[i].precioSteam}</p>
                                <p class="card-text">Precio Final: ARS$ ${juegos[i].precioFinal}</p>
                            </div>
                        </div>
                    </div>
                `
            }
        }
    })