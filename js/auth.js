const formulario=document.getElementById('loginForm');
formulario.addEventListener("submit", function(e){
    e.preventDefault();
    
    const email=document.getElementById('correo').value;
    const contrasena=document.getElementById('contrasena').value;
    if (email.trim() === "" || contrasena.trim() === "") {
        document.getElementById("error").textContent = "Debes completar todos los campos";
        return;
        }  
    localStorage.setItem("usuario", email);
    window.location.href = "index.html";
      
});
