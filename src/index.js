const url = 'https://randomfox.ca/floof/'

const agregar = document.querySelector('#agregar')
const limpiar = document.querySelector('#limpiar')
const contenedorImag = document.querySelector('#imagenes')

let contador_agregadas = 0
let contador_cargadas = 0

/* Función que se va a llamar una vez que el observador detecte el nodo_target */
function callback( entries ) {
    const entry = entries[0]
    if( entry.isIntersecting ){
        const container = entry.target /* div padre que contiene solo una img */
        const imagen = container.firstChild /* img dentro del div padre */

        container.style.width = 'auto'
        container.style.height = 'auto'
        imagen.src = imagen.dataset.src /* cuando ha el nodo target ha sido intersectado por el
        view port entonces es que le paso la url a la imagen para que se carge en el DOM */

        contador_cargadas += 1
        console.log( '%c♦', 'color: blue; font-size: 20px', `Total de imagenes agregadas: ${contador_agregadas}`  )
        console.log( '%c♥', 'color: red; font-size: 20px', `Total de imagenes cargadas: ${contador_cargadas}` )
        console.log( `----------------------------------------------------` )

        observer.unobserve( container )
    }
}
/* Configuración del intersection observer */
const options = { threshold: 1.0 }
let observer = new IntersectionObserver( callback, options )
/* Función que va a activar el observer y le va a pasar el nodo que quiero que siga */
const imagenObserver = imagen => {
    observer.observe( imagen )
}
/* Función asincrona para consultar la API y cargar la imagen random de zorro que develve */
async function consultaAPI(nodo) {
    try{
        /* consulto la API y traigo la url de la imagen */
        const response = await fetch( url )
        const data = await response.json()
        const urlImage = await data.image
        /* creamos el nodo tipo imagen */
        const imagenZorro = document.createElement('img')
        imagenZorro.className = 'mx-auto'
        imagenZorro.width = '320'
        imagenZorro.alt = 'Imagenes tiernas de zorros :)'
        imagenZorro.dataset.src = `${urlImage}`

        nodo.appendChild( imagenZorro )

        imagenObserver( nodo )
    }
    catch{
        console.log( error + 'ups!!! hay problemas de conexión' )
    }
}
/* Función para agregar un nuevo nodo */
function cargarImagen() {
    contador_agregadas += 1
    console.log( '%c♦', 'color: blue; font-size: 20px', `Total de imagenes agregadas: ${contador_agregadas}`  )
    console.log( '%c♥', 'color: red; font-size: 20px', `Total de imagenes cargadas: ${contador_cargadas}` )
    console.log( `----------------------------------------------------` )

    const container__img = document.createElement('div')
    container__img.className = 'container__imagen'
    contenedorImag.appendChild( container__img )

    consultaAPI( container__img )
}
/* Función para eliminar todos los nodos agregados */
function eliminarTodo() {
    const nodos_eliminar = contenedorImag.querySelectorAll( 'div' )
    const arrayNodosElimina = [ ...nodos_eliminar ]
    arrayNodosElimina.forEach( element => {
        element.remove()
    })

    contador_agregadas = 0
    contador_cargadas = 0
    console.log( '%c•', 'color: yellow; font-size: 20px', 'Todas las imagenes fueron eliminadas' )
}
/* Eventos clicks de los botones Agregar y Limpiar */
agregar.addEventListener( 'click', cargarImagen )
limpiar.addEventListener( 'click', eliminarTodo )