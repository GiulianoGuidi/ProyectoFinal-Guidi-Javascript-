

Swal.fire('Bienenido/a al portal de Bruto, presiona OK para continuar')

//DOM

const contenedorProductos = document.getElementById('contenedorProductos')
const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const precioTotal = document.getElementById('precioTotal')



let menu = []

let carrito = []

//LocalStorage

document.addEventListener('DOMContentLoaded', () =>{
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

// fetch y json

const obtenerProductos = async () =>{
    const responseProd = await
    fetch("menu.json");

    const productos = await responseProd.json();

    
    menu.push(productos)
   


    productos.forEach((producto) => {
        
    const div = document.createElement('div')
    div.classList.add("producto")
    div.classList.add('col-lg-4')
    div.classList.add('col-md-4')
    div.classList.add('col-xs-12')
   div.innerHTML = `
                            
                                    <div class="card product-card" >
                                                <img src=${producto.img} class=" img card-img-top product-image">
                                        <div class="card-body">
                                                <h5 class="card-title">${producto.nombre}</h5>
                                                <p class="card-text">Categoría: ${producto.categoria} <br> Precio: $${producto.precio}</p>
                                                <button id="agregar${producto.id}" class="botonAgregar"> Añadir al carrito </button>
                                        </div>
                                    </div>
                        
                                `
    contenedorProductos.appendChild(div)

    

    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener('click', () =>{
        agregarAlCarrito(producto.id)
    })
})
}
obtenerProductos()


//Carrito

const agregarAlCarrito = (prodId) =>{

    const existe = carrito.some(prod => prod.id === prodId)

    if(existe){
        const prod = carrito.map(prod =>{
            if(prod.id === prodId){
                prod.cantidad++
            }
        })
    }else{

    for(let i = 0; i < menu.length; i++ ) { 

const item = menu[i].find((producto) => producto.id === prodId)
carrito.push(item)


console.log(carrito)
}
}
actualizarCarrito()
}


const actualizarCarrito = () =>{

    contenedorCarrito.innerHTML = ""

    carrito.forEach((producto) =>{
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        
        div.innerHTML = `
        <p>${producto.nombre}</p>
        <p>Precio:$${producto.precio}</p>
        <p>Cantidad:<span id="cantidad">${producto.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${producto.id})" class= "boton-eliminar"><i class= "fas fa-trash-alt"></i></button>
        `
        contenedorCarrito.appendChild(div)

        localStorage.setItem('carrito', JSON.stringify(carrito))
    })

    contadorCarrito.innerText = carrito.length
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0) 
    
}

const eliminarDelCarrito = (prodId) =>{
    const item = carrito.find((producto) =>producto.id === prodId)
    
    const indice = carrito.indexOf(item)

    carrito.splice(indice, 1)

    actualizarCarrito()

}


botonVaciar.addEventListener('click', () =>{

    carrito.length = 0
    actualizarCarrito()

})


// Modal carrito

const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const botonAbrir = document.getElementById('boton-carrito')
const botonCerrar = document.getElementById('carritoCerrar')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]


botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})
botonCerrar.addEventListener('click', () =>{
    contenedorModal.classList.toggle('modal-active')
})

contenedorModal.addEventListener('click', (event) =>{
    contenedorModal.classList.toggle('modal-active')

})
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation() 

})