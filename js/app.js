// traemos lo necesario para hacer el carrito de compras
const contenedor = document.querySelector("#carrito");
// a la vez tambien el template para mostrar en la pagina cuando se haga click
const template = document.querySelector("#template");
// el footer para obtener los producto que se van sumando
const footer = document.querySelector("#footer");
// el template del footer de la misma manera para mostrar que se
const templatefooter = document.querySelector("#templateFooter");
// creamos un fragment para no generar reflow en el sitio web
const fragment = document.createDocumentFragment();

// creamos el carrito donde se colocan los productos de tipo array
let carritoproducto = [];
// creamos la funcion agregarcarrito y creamos el producto con el nombre,cantidad,precio y id del boton que le demos click
const agregarproductocarrito = (e) => {
  const producto = {
    titulo: e.target.dataset.fruta,
    id: e.target.dataset.fruta,
    cantidad: 1,
    precio: parseInt(e.target.dataset.precio),
  };

  const posicion = carritoproducto.findIndex((item) => {
    return item.titulo === producto.titulo;
  });
  if (posicion === -1) {
    carritoproducto.push(producto);
  } else {
    carritoproducto[posicion].cantidad++;
  }
  //   llamamos el mostrarcarrito para ejecutarlo
  mostrarcarrito();
};
// creamos la funcion mostrar carrito para mostrarlo en el sitio web
const mostrarcarrito = () => {
  contenedor.textContent = "";

  carritoproducto.forEach((item) => {
    // clonamos el template para mostar las futas
    const clone = template.content.cloneNode(true);

    clone.querySelector(".badge").textContent = item.cantidad;
    clone.querySelector(".text-uppercase .lead").textContent = item.titulo;
    clone.querySelector(".lead span").textContent = item.precio * item.cantidad;
    clone.querySelector(".btn-success").dataset.id = item.id;
    clone.querySelector(".btn-danger").dataset.id = item.id;
    fragment.appendChild(clone);
  });
  contenedor.appendChild(fragment);
  mostarfooter();
};
// creamos la funcion para mostrar el footer y el total de los productos
const mostarfooter = () => {
  footer.textContent = "";
  const total = carritoproducto.reduce((acc, current) => {
    return acc + current.cantidad * current.precio;
  }, 0);
  console.log(total);
  const clone = templatefooter.content.cloneNode(true);
  clone.querySelector(".lead span").textContent = total;
  footer.appendChild(clone);
};
// creamos la funcion para el boton agregar
const btnagregar = (e) => {
  carritoproducto.map((item) => {
    if (e.target.dataset.id === item.id) {
      item.cantidad++;
    }
    return item;
  });
  mostrarcarrito();
};
// creamos la funcion para el boton quitar
const btnquitar = (e) => {
  carritoproducto = carritoproducto.filter((item) => {
    if (e.target.dataset.id === item.id) {
      if (item.cantidad > 0) {
        item.cantidad--;
        if (item.cantidad === 0) return;
      }
    }
    return item;
  });
  mostrarcarrito();
};
// realizamos la designacion de eventos, utilizando el dom y haciendo una verificacion para solo usar los botones
document.addEventListener("click", (e) => {
  if (e.target.matches(".btn-primary")) {
    agregarproductocarrito(e);
  }
  //   hacemos lo mismo que arriba pero con el boton de agregar
  if (e.target.matches(".btn-success")) {
    btnagregar(e);
  }
  //   hacemos lo mismo que arriba pero con el boton de quitar
  if (e.target.matches(".btn-danger")) {
    btnquitar(e);
  }
});
