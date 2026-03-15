/* ============================================================
   LÓGICA DE INTERACCIÓN PCSCAN: VERSIÓN MAESTRA FINAL
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Referencias principales
    const modalCompra = document.getElementById('modal-compra');
    const modalCarrito = document.getElementById('modal-carrito');
    const cartIcon = document.querySelector('.cart-icon');
    const listaCarritoDiv = document.getElementById('lista-carrito');
    const btnIrAComprar = document.getElementById('btn-ir-a-comprar');
    const cartCountElement = document.getElementById('cart-count');
    const btnDownloadApp = document.querySelector('.btn-download-app');
    
    // Referencias internas del modal
    const modalIcon = modalCompra.querySelector('.neon-icon');
    const modalTitle = modalCompra.querySelector('h2');
    const modalStatus = modalCompra.querySelector('.status-text');
    const modalPrice = modalCompra.querySelector('.modal-price');
    const productSelectionText = modalCompra.querySelector('.modal-body strong'); // El texto "ATK VXE R1 PRO"
    const loader = modalCompra.querySelector('.loader');

    let carrito = []; 

    // --- FUNCIÓN: ACTUALIZAR VISTA DEL CARRITO ---
    const actualizarVistaCarrito = () => {
        const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        cartCountElement.innerText = totalItems;
        cartCountElement.style.display = totalItems > 0 ? "flex" : "none";

        if (totalItems === 0) {
            listaCarritoDiv.innerHTML = '<p id="carrito-vacio">El carrito está vacío.</p>';
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
        const textoOriginal = btnAddCart.innerText;
        btnAddCart.addEventListener('click', () => {
            const nombreProducto = "ATK VXE R1 PRO";
            const precioProducto = 59.99;
            const existe = carrito.find(item => item.nombre === nombreProducto);
            
            if (existe) { existe.cantidad++; } 
            else { carrito.push({ nombre: nombreProducto, precio: precioProducto, cantidad: 1 }); }

            actualizarVistaCarrito();
            btnAddCart.innerText = existe ? "¡Otro añadido!" : "¡Añadido!";
            btnAddCart.style.backgroundColor = "#4caf50"; 
            setTimeout(() => {
                btnAddCart.innerText = textoOriginal;
                btnAddCart.style.backgroundColor = ""; 
            }, 800);
        });
    }

    // --- ACCIÓN: DESCARGAR APP (Real con Feedback e Icono Correcto) ---
    if (btnDownloadApp) {
        btnDownloadApp.addEventListener('click', () => {
            // Cambiamos icono a descarga
            modalIcon.className = 'fas fa-file-download neon-icon';
            
            // Ocultamos la línea de "Has seleccionado..." para la descarga
            productSelectionText.parentElement.style.display = "none";

            // Configuramos textos de descarga
            modalTitle.innerText = "Iniciando Descarga";
            modalStatus.innerText = "Preparando el instalador de PCscan...";
            modalPrice.innerText = "Versión: 1";
            loader.style.display = "block";
            modalCompra.style.display = 'flex';

            setTimeout(() => {
                modalTitle.innerText = "¡Descarga en Curso!";
                modalStatus.innerText = "Revisa tu panel de descargas. El archivo se está guardando.";
                loader.style.display = "none";
            }, 2000);
        });
    }

    // --- FUNCIÓN GLOBAL: ELIMINAR DEL CARRITO ---
    window.eliminarDelCarrito = (index) => {
        if (carrito[index].cantidad > 1) { carrito[index].cantidad--; } 
        else { carrito.splice(index, 1); }
        actualizarVistaCarrito();
    };

    // --- ACCIÓN: ABRIR CARRITO ---
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        modalCarrito.style.display = 'flex';
    });

    // --- ACCIÓN: FINALIZAR COMPRA ---
    btnIrAComprar.addEventListener('click', () => {
        const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
        if (total > 0) {
            modalCarrito.style.display = 'none';
            abrirSimulacionCompra(total);
        }
    });

    // --- ACCIÓN: COMPRAR AHORA ---
    const btnBuy = document.querySelector('.btn-buy');
    if (btnBuy) {
        const textoOriginal = btnBuy.innerText;
        btnBuy.addEventListener('click', (e) => {
            e.preventDefault();
            const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
            if (total === 0) {
                btnBuy.innerText = "¡Añade un producto!";
                btnBuy.style.backgroundColor = "#ff4444";
                setTimeout(() => { btnBuy.innerText = textoOriginal; btnBuy.style.backgroundColor = ""; }, 2000);
                return;
            }
            abrirSimulacionCompra(total);
        });
    }

    function abrirSimulacionCompra(precioTotal) {
        // Restauramos icono de carrito y línea de producto
        modalIcon.className = 'fas fa-shopping-cart neon-icon';
        productSelectionText.parentElement.style.display = "block";

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

    // Cierres
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.onclick = () => {
            modalCompra.style.display = 'none';
            modalCarrito.style.display = 'none';
        };
    });
});

function cerrarCarrito() { document.getElementById('modal-carrito').style.display = 'none'; }
function cerrarModal() { document.getElementById('modal-compra').style.display = 'none'; }