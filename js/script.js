// Reemplaza con tu URL real de Apps Script
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbx53fMkn70AeGEKZ7o8G-KiiSumq51N8V0NEmcIT8kOlRM88gVI2K7y-d5--g-uBTDL/exec";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Cargar las carreras y fotos al iniciar la página
  fetch(WEB_APP_URL)
    .then(response => response.json())
    .then(data => {
      console.log("Datos de carreras recibidos:", data);
      renderizarCarreras(data);
    })
    .catch(error => console.error("Error al cargar las carreras:", error));

  // 2. Manejar el envío del formulario de registro
  const formRegistro = document.getElementById("formRegistro");
  if (formRegistro) {
    formRegistro.addEventListener("submit", function(e) {
      e.preventDefault();
      
      const datosForm = {
        nombre: document.getElementById("nombre").value,
        correo: document.getElementById("correo").value,
        telefono: document.getElementById("telefono").value,
        carrera: document.getElementById("carreraInteres").value
      };

      fetch(WEB_APP_URL, {
        method: "POST",
        body: JSON.stringify(datosForm)
      })
      .then(response => response.json())
      .then(data => {
        alert("¡Registro guardado con éxito en el Google Sheet!");
        formRegistro.reset();
      })
      .catch(error => {
        console.error("Error al registrar:", error);
        alert("Hubo un error al enviar el registro.");
      });
    });
  }
});

function renderizarCarreras(carreras) {
  const contenedor = document.getElementById("contenedor-carreras"); 
  
  if (!contenedor) {
    console.warn("No se encontró el contenedor de carreras en el HTML.");
    return;
  }

  contenedor.innerHTML = "";

  carreras.forEach(item => {
    const fotoNombre = item.FOTO ? item.FOTO.trim() : "default.jpg";
    
    const cardHTML = `
      <div class="col-md-6 mb-4">
        <div class="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
          <img src="img/${fotoNombre}" class="card-img-top" alt="${item.CARRERAS}" style="height: 200px; object-fit: cover;">
          <div class="card-body">
            <h5 class="card-title fw-bold text-dark">${item.CARRERAS}</h5>
            <p class="card-text text-muted small">${item.DESCRIPCION}</p>
          </div>
        </div>
      </div>
    `;
    
    contenedor.innerHTML += cardHTML;
  });
}