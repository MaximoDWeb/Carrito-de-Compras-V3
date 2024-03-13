const contenedor = document.querySelector('#carrito');
const template = document.querySelector('#template');
const footer = document.querySelector('#footer');
const templateFooter = document.querySelector('#templateFooter');
const fragment = document.createDocumentFragment();

let carritoProducto = [];

const agregarProductoCarrito = (e) => {
    const producto = {
        titulo: e.target.dataset.fruta,
        id: e.target.dataset.fruta,
        cantidad: 1,
        precio: parseInt(e.target.dataset.precio),
    };

    const posicion = carritoProducto.findIndex(item => item.titulo === producto.titulo);

    if (posicion === -1) {
        carritoProducto.push(producto);
    } else {
        carritoProducto[posicion].cantidad++;
    }

    mostrarCarrito();
};

const mostrarCarrito = () => {
    contenedor.textContent = '';

    carritoProducto.forEach(item => {
        const clone = template.content.cloneNode(true);

        clone.querySelector('.badge').textContent = item.cantidad;
        clone.querySelector('.lead').textContent = item.titulo;
        clone.querySelector('.lead span').textContent = item.precio * item.cantidad;

        clone.querySelector('.btn-success').dataset.id = item.id;
        clone.querySelector('.btn-danger').dataset.id = item.id;

        fragment.appendChild(clone);
    });

    contenedor.appendChild(fragment);
    mostrarFooter();
};

const mostrarFooter = () => {
    footer.textContent = '';

    const total = carritoProducto.reduce((acc, current) => {
        return acc + current.cantidad * current.precio;
    }, 0);
    console.log(total);

    const clone = templateFooter.content.cloneNode(true)
    clone.querySelector('.lead span').textContent = total;

    footer.appendChild(clone);
};

const btnAgregar = (e) => {
    const itemId = e.target.dataset.id;
    carritoProducto.forEach(item => {
        if (item.id === itemId) {
            item.cantidad++;
        }
    });

    mostrarCarrito();
};

const btnQuitar = (e) => {
    const itemId = e.target.dataset.id;
    carritoProducto.forEach(item => {
        if (item.id === itemId && item.cantidad > 0) {
            item.cantidad--;
        }
    });

    carritoProducto = carritoProducto.filter(item => item.cantidad > 0);

    mostrarCarrito();
};

document.addEventListener('click', (e) => {
    if (e.target.matches('.btn-primary')) {
        agregarProductoCarrito(e);
    }

    if (e.target.matches('.btn-success')) {
        btnAgregar(e);
    }

    if (e.target.matches('.btn-danger')) {
        btnQuitar(e);
    }
});
