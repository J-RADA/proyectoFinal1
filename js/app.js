if (localStorage.getItem("usuario") === null) {
    window.location.href = "login.html";
}
const usuario = localStorage.getItem("usuario");
const bienvenida = document.getElementById("bienvenida");
bienvenida.textContent = `Hola ${usuario}`;
// en esta linea se obtiene el elemento de cerrar cesion y borra los datos del usuario, redireccionando el usuario a login
const cerrarSesion = document.getElementById("cerrarSesion");
cerrarSesion.addEventListener("click", function() {
    localStorage.removeItem("usuario");
    window.location.href = "login.html";
});

let publicaciones = [];
//en esta parte se obtiene la informacion del boton publicar y se guarda en una variable.
const publicar = document.getElementById("publicar");
//esta funcion se encarga de renderizar el feed, mostrando las publicaciones y los likes, ademas de agregar 
// un evento a cada boton de like para incrementar el contador de likes y volver a renderizar el feed.
function renderizarFeed(){    
    
    const feed = document.getElementById("feed");
     feed.innerHTML = "";
        publicaciones.forEach(function(post,index) {
        feed.innerHTML += `
<div class="card mb-3 shadow-sm">
    <div class="card-body">

        <h6 class="text-muted">${usuario}</h6>

        <p class="mb-3">${post.texto}</p>

        <div class="d-flex gap-2">
            <button class="btn btn-outline-primary btn-sm" data-index="${index}">
                ❤️ ${post.likes}
            </button>

            <button class="btn btn-outline-warning btn-sm" data-editar="${index}">
                Editar
            </button>

            <button class="btn btn-outline-danger btn-sm" data-eliminar="${index}">
                Eliminar
            </button>
        </div>

    </div>
</div>
`;
    });
    const botonesLike = document.querySelectorAll("[data-index]");    
    botonesLike.forEach(function(boton) {
        boton.addEventListener("click", function() {
            const index= boton.dataset.index;
            publicaciones[index].likes++;
            renderizarFeed();
                })});
    const botonesEliminar = document.querySelectorAll("[data-eliminar]");
    botonesEliminar.forEach(function(boton) {
    boton.addEventListener("click", function() {
        const index = boton.dataset.eliminar;
        publicaciones.splice(index, 1);
        renderizarFeed();
    });});
    const botonesEditar = document.querySelectorAll("[data-editar]");
    botonesEditar.forEach(function(boton) {
    boton.addEventListener("click", function() {
        const index = boton.dataset.editar;
        const nuevoTexto = prompt("Edita tu publicación:");
        if (nuevoTexto !== null && nuevoTexto.trim() !== "") {
            publicaciones[index].texto = nuevoTexto;
            renderizarFeed();
        }
    });});

    
};
//esta parte se encarga de agregar una nueva publicacion al feed, verifica que el campo no este vacio
// y luego renderiza el feed para mostrar la nueva publicacion.
publicar.addEventListener("click", function() {
    const nuevaPublicacion = document.getElementById("nuevaPublicacion");
    if (nuevaPublicacion.value.trim() === "") {
        alert("Por favor, escribe algo para publicar.");
        return;
    }      
    publicaciones.push({ texto: nuevaPublicacion.value, likes: 0 });
    nuevaPublicacion.value = "";
    renderizarFeed();
     
    });

