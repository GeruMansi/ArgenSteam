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
            <li id="${juego.id}" class="d-flex alig-items-center gap-2 mb-2"><button id="btn-${juego.id}" class="btn btn-dark btn-sm py-0">X</button><strong>${juego.nombre}</strong>, precio Steam: ARS$ ${juego.precio} (precio final: ARS$ ${(juego.precio * 1.65).toFixed(2)})</li>
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

fetch('populares.json')
    .then(response => response.json())
    .then(juegos => {
        juegos.forEach(juego => {
            divPopulares.innerHTML += `
                <div class="card">
                    <img src="${juego.img}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${juego.nombre}</h5>
                        <p class="card-text">Precio Steam: ARS$ ${juego.precioSteam}</p>
                        <p class="card-text">Precio Final: ARS$ ${juego.precioFinal}</p>
                    </div>
                </div>
            `
        })
    })