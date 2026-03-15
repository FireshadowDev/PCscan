/* ============================================================
   LÓGICA DE INTERACCIÓN PCSCAN: VERSIÓN MAESTRA FINAL
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Referencias principales del DOM
    const modalCompra = document.getElementById('modal-compra');
    const modalCarrito = document.getElementById('modal-carrito');
    const modalIcon = modalCompra.querySelector('.neon-icon');
    const modalTitle = document.getElementById('modal-titulo');
    const modalStatus = modalCompra.querySelector('.status-text');
    const modalPrice = modalCompra.querySelector('.modal-price');
    const selectionRow = document.getElementById('seleccion-producto');
    const loader = modalCompra.querySelector('.loader');
    const cartCountElement = document.getElementById('cart-count');
    const listaCarritoDiv = document.getElementById('lista-carrito');
    const btnIrAComprar = document.getElementById('btn-ir-a-comprar');
    const btnDownloadApp = document.querySelector('.btn-download-app');
    const btnDownloadMarcador = document.querySelector('.btn-ar');

    let carrito = []; 

    // --- FUNCIÓN: ACTUALIZAR VISTA DEL CARRITO ---
    const actualizarVistaCarrito = () => {
        const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        
        if (cartCountElement) {
            cartCountElement.innerText = totalItems;
            cartCountElement.style.display = totalItems > 0 ? "flex" : "none";
        }

        if (totalItems === 0) {
            listaCarritoDiv.innerHTML = '<p id="carrito-vacio" style="text-align:center;">El carrito está vacío.</p>';
            btnIrAComprar.style.display = "none";
        } else {
            listaCarritoDiv.innerHTML = "";
            carrito.forEach((item, index) => {
                listaCarritoDiv.innerHTML += `
                    <div class="item-carrito">
                        <div class="info-item">
                            <span>${item.nombre} (x${item.cantidad})</span>
                            <span class="precio-item">${(item.precio * item.cantidad).toFixed(2)}€</span>
                        </div>
                        <button class="btn-remove" onclick="eliminarDelCarrito(${index})">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                `;
            });
            btnIrAComprar.style.display = "inline-flex";
        }
    };

    // --- ACCIÓN: AÑADIR AL CARRITO ---
    const btnAddCart = document.querySelector('.btn-add-cart');
    if (btnAddCart) {
        btnAddCart.addEventListener('click', () => {
            const nombreProducto = "ATK VXE R1 PRO";
            const existe = carrito.find(item => item.nombre === nombreProducto);
            
            if (existe) { existe.cantidad++; } 
            else { carrito.push({ nombre: nombreProducto, precio: 59.99, cantidad: 1 }); }

            actualizarVistaCarrito();
            
            const textoOriginal = btnAddCart.innerText;
            btnAddCart.innerText = "¡Añadido!";
            btnAddCart.style.backgroundColor = "#4caf50"; 
            setTimeout(() => {
                btnAddCart.innerText = textoOriginal;
                btnAddCart.style.backgroundColor = ""; 
            }, 800);
        });
    }

    // --- ACCIÓN: COMPRAR AHORA (Botón Hero) ---
    const btnBuyHero = document.querySelector('.btn-buy');
    if (btnBuyHero) {
        btnBuyHero.addEventListener('click', (e) => {
            e.preventDefault();
            const totalCart = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
            const montoAComprar = totalCart > 0 ? totalCart : 59.99;
            abrirSimulacionCompra(montoAComprar);
        });
    }

    // --- ACCIÓN: FINALIZAR COMPRA (Desde el Carrito) ---
    btnIrAComprar.addEventListener('click', () => {
        const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
        if (total > 0) {
            modalCarrito.style.display = 'none';
            abrirSimulacionCompra(total);
        }
    });

    function abrirSimulacionCompra(precioTotal) {
        modalIcon.className = 'fas fa-shopping-cart neon-icon';
        if (selectionRow) selectionRow.style.display = "block";
        modalPrice.innerText = `Total: ${precioTotal.toFixed(2)}€`;
        modalTitle.innerText = "Procesando Pedido";
        modalStatus.innerText = "Conectando con la pasarela segura...";
        loader.style.display = "block";
        modalCompra.style.display = 'flex';

        setTimeout(() => {
            modalTitle.innerText = "¡Compra Realizada!";
            modalStatus.innerText = `Tu pedido de ${precioTotal.toFixed(2)}€ ha sido procesado con éxito.`;
            loader.style.display = "none";
            carrito = []; 
            actualizarVistaCarrito();
        }, 3000);
    }

    // --- ACCIÓN: DESCARGAR MARCADOR ---
    if (btnDownloadMarcador) {
        btnDownloadMarcador.addEventListener('click', () => {
            modalIcon.className = 'fas fa-image neon-icon';
            if (selectionRow) selectionRow.style.display = "none";
            modalTitle.innerText = "Descargando Marcador";
            modalStatus.innerText = "El marcador de Realidad Aumentada se está guardando...";
            modalPrice.innerText = "Archivo: marcadorRaton.png";
            loader.style.display = "block";
            modalCompra.style.display = 'flex';
            setTimeout(() => { loader.style.display = "none"; }, 2000);
        });
    }

    // --- LÓGICA LEGAL ---
    const linksLegales = document.querySelectorAll('.link-legal');
    linksLegales.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            modalIcon.className = 'fas fa-balance-scale neon-icon';
            if (selectionRow) selectionRow.style.display = "none";
            loader.style.display = "none";
            modalTitle.innerText = e.target.innerText;
            modalStatus.innerText = "Este documento legal garantiza la transparencia y seguridad de PCscan.";
            modalPrice.innerText = "Estado: Vigente";
            modalCompra.style.display = 'flex';
        });
    });

    // --- DESCARGA APP ---
    if (btnDownloadApp) {
        btnDownloadApp.addEventListener('click', (e) => {
            modalIcon.className = 'fas fa-file-download neon-icon';
            if (selectionRow) selectionRow.style.display = "none";
            modalTitle.innerText = "Iniciando Descarga";
            modalStatus.innerText = "Preparando el instalador APK...";
            modalPrice.innerText = "Versión: 1.0";
            loader.style.display = "block";
            modalCompra.style.display = 'flex';
            setTimeout(() => { loader.style.display = "none"; }, 2000);
        });
    }

    // --- CIERRES Y OTROS ---
    window.eliminarDelCarrito = (index) => {
        if (carrito[index].cantidad > 1) { carrito[index].cantidad--; } 
        else { carrito.splice(index, 1); }
        actualizarVistaCarrito();
    };

    const cartLink = document.querySelector('.cart-icon a');
    if (cartLink) {
        cartLink.onclick = (e) => { e.preventDefault(); modalCarrito.style.display = 'flex'; };
    }

    window.cerrarModal = () => { modalCompra.style.display = 'none'; };
    window.cerrarCarrito = () => { modalCarrito.style.display = 'none'; };

    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.onclick = () => {
            modalCompra.style.display = 'none';
            modalCarrito.style.display = 'none';
        };
    });

    window.onclick = (e) => {
        if (e.target === modalCompra || e.target === modalCarrito) {
            modalCompra.style.display = 'none';
            modalCarrito.style.display = 'none';
        }
    };
});