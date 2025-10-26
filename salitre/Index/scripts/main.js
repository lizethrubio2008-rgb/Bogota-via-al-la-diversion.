// ===============================
// 🎴 EFECTO FLIP PARA TARJETAS
// ===============================
document.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('click', function () {
    this.classList.toggle('flipped');
  });
});

// Botones "Voltear" dentro de las tarjetas
document.querySelectorAll('.flip-card button').forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    e.preventDefault();
    const card = this.closest('.flip-card');
    if (card) card.classList.toggle('flipped');
  });
});

// =======================================
// 📩 FUNCIÓN PARA MOSTRAR MENSAJES
// =======================================
function mostrarMensaje(selector, texto, exito = true) {
  const cont = document.querySelector(selector);
  if (!cont) return;

  cont.style.display = 'block';
  cont.textContent = texto;
  cont.style.padding = '10px';
  cont.style.marginTop = '8px';
  cont.style.borderRadius = '6px';
  cont.style.fontWeight = '700';
  cont.style.transition = 'all 0.4s ease';

  if (exito) {
    cont.style.background = 'rgba(0,200,83,0.08)';
    cont.style.color = '#00a651';
    cont.style.border = '1px solid rgba(0,200,83,0.18)';
  } else {
    cont.style.background = 'rgba(255,82,82,0.08)';
    cont.style.color = '#ff5252';
    cont.style.border = '1px solid rgba(255,82,82,0.14)';
  }

  setTimeout(() => { cont.style.display = 'none'; }, 4500);
}

// ===============================
// 📆 FORMULARIOS
// ===============================
document.getElementById('form-reserva-interno')?.addEventListener('submit', e => {
  e.preventDefault();
  mostrarMensaje('.reserva-mensaje', 'Reserva registrada (simulado). Nos contactaremos pronto.', true);
  e.target.reset();
});

document.getElementById('form-encuesta')?.addEventListener('submit', e => {
  e.preventDefault();
  mostrarMensaje('.encuesta-mensaje', 'Gracias por tu opinión. Encuesta enviada (simulado).', true);
  e.target.reset();
});

document.getElementById('form-pqrsf')?.addEventListener('submit', e => {
  e.preventDefault();
  mostrarMensaje('.pqrsf-mensaje', 'Formulario PQRSF enviado (simulado). Gracias por escribirnos.', true);
  e.target.reset();
});


// ===============================
// 🛒 CARRITO DE COMPRAS
// ===============================
const carritoBtn = document.getElementById("carrito-btn");
const carritoPanel = document.getElementById("carrito-panel");
const cerrarCarrito = document.getElementById("cerrar-carrito");
const carritoLista = document.getElementById('carrito-lista');
const total = document.getElementById('total');
const btnVaciar = document.getElementById('vaciar-carrito');
const contador = document.getElementById('cart-count');
const finalizarBtn = document.getElementById('finalizar-reserva');
const planInput = document.getElementById('plan');

let carrito = [];

// --- Abrir y cerrar carrito
carritoBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  carritoPanel.classList.add("activo");
});

cerrarCarrito?.addEventListener("click", () => {
  carritoPanel.classList.remove("activo");
});

// --- Precios simulados
const precios = {
  "Recorrido": 2400000,
  
};

// --- Actualizar carrito
function actualizarCarrito() {
  carritoLista.innerHTML = '';
  let totalCompra = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item.plan}</span>
      <div>
        <span>$${item.precio.toLocaleString()}</span>
        <button class="eliminar" data-index="${index}">🗑️</button>
      </div>
    `;
    carritoLista.appendChild(li);
    totalCompra += item.precio;
  });

  total.textContent = `Total: $${totalCompra.toLocaleString()}`;
  contador.textContent = carrito.length;
}

// --- Detectar clic en los botones de reservar
document.querySelectorAll('.btn-reservar').forEach(boton => {
  boton.addEventListener('click', e => {
    const plan = e.target.dataset.plan;
    const precio = precios[plan] || 100000;

    carrito.push({ plan, precio });
    actualizarCarrito();
    carritoPanel.classList.add('activo');
  });
});

// --- Eliminar un elemento
carritoLista?.addEventListener('click', e => {
  if (e.target.classList.contains('eliminar')) {
    const index = e.target.dataset.index;
    carrito.splice(index, 1);
    actualizarCarrito();
  }
});

// --- Vaciar todo
btnVaciar?.addEventListener('click', () => {
  carrito.length = 0;
  actualizarCarrito();
});

// --- Finalizar reserva
finalizarBtn?.addEventListener('click', () => {
  if (carrito.length === 0) {
    alert("🛒 Tu carrito está vacío. Agrega al menos un plan antes de continuar.");
    return;
  }

  // Cerrar carrito
  carritoPanel.classList.remove('activo');

  // Pasar el primer plan al formulario
  const primerItem = carrito[0];
  if (primerItem && planInput) {
    planInput.value = primerItem.plan;
  }

  // Vaciar el carrito automáticamente después de finalizar
  carrito.length = 0;
  actualizarCarrito();

  // Mostrar mensaje visual
  const mensaje = document.createElement("div");
  mensaje.textContent = "✅ Tu carrito se ha enviado al formulario de reserva";
  mensaje.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #4CAF50;
    color: white;
    padding: 12px 18px;
    border-radius: 6px;
    font-weight: 600;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    z-index: 9999;
    transition: opacity 0.4s ease;
  `;
  document.body.appendChild(mensaje);
  setTimeout(() => mensaje.style.opacity = '0', 2000);
  setTimeout(() => mensaje.remove(), 2400);

  // Desplazar al formulario
  document.getElementById('form-reserva')?.scrollIntoView({ behavior: 'smooth' });
});
