
// Referencias al DOM
let $productGrid = document.querySelector(".grid-container");
let $main = document.querySelector("main");

// Crear contenedor del carrito
let $cartPanel = document.createElement("div");
$cartPanel.classList.add("shoppingCar");
$main.append($cartPanel);

// Variables para el carrito
let shoppingCart = [];
let total = 0;

// Mostrar carrito desde el inicio
updateCartDisplay();


// Generar el grid de los productos en pantalla
function renderProductGrid() {
  for (let product of productos) {
    let $productCard = document.createElement("div");
    $productCard.classList.add("imagen");
    $productCard.setAttribute("id", product.id);

    // Elementos del producto
    let $img = document.createElement("img");
    $img.src = product.imagen;

    let $name = document.createElement("h2");
    $name.textContent = product.nombre;

    let $description = document.createElement("p");
    $description.textContent = product.descripcion;

    let $price = document.createElement("p");
    $price.textContent = `Precio : ${product.precio} $`;
    // Botón para agregar al carrito
    let $addButton = document.createElement("button");
    $addButton.textContent = "Agregar al carrito";

    $addButton.addEventListener("click", () => {
      addProductToCart(product);
    });
    // Insertar en el DOM
    $productGrid.append($productCard);
    $productCard.append($img, $name, $description, $price, $addButton);
  }
}


// Añadir un producto al carrito
function addProductToCart(product) {
  if (product.stock === 0) {
    alert("Producto agotado");
    return;
  }
  // Si ya existe en el carrito aumentar la cantidad
  let productInCart = shoppingCart.find(item => item.id === product.id);
  if (!productInCart) {
    productInCart = {id: product.id, name: product.nombre, quantity: 0, precio: product.precio
    };
    shoppingCart.push(productInCart);
  }

  productInCart.quantity++;
  product.stock--;
  total += product.precio;

  // Refrescar carrito
  updateCartDisplay();
 
  $cartPanel.classList.add('open');
}


//Actulizar el carrito
function updateCartDisplay() {
  $cartPanel.innerHTML = "";

  let $title = document.createElement("h2");
  $title.textContent = "Carrito de compras";
  $cartPanel.append($title);


  // Mostrar cada producto en el carrito
  for (let item of shoppingCart) {
    let $itemDiv = document.createElement("div");
    $itemDiv.classList.add("item");
    $itemDiv.setAttribute("id", item.id);

    let $info = document.createElement("p");
    $info.textContent = `${item.name} : ${item.precio} $ x ${item.quantity} = ${item.precio * item.quantity} $`;


    // Botones de más, menos y eliminar
    let $removeBtn = document.createElement("button");
    $removeBtn.textContent = "Eliminar";
    $removeBtn.addEventListener("click", () => {
      removeItemFromCart($itemDiv);
    });

    let $plusBtn = document.createElement("button");
    $plusBtn.textContent = "+";
    $plusBtn.addEventListener("click", increaseProductQuantity);

    let $minusBtn = document.createElement("button");
    $minusBtn.textContent = "-";
    $minusBtn.addEventListener("click", decreaseProductQuantity);

    $itemDiv.append($info, $removeBtn, $plusBtn, $minusBtn);
    $cartPanel.append($itemDiv);
  }

  // Mostrar total
  let $totalDisplay = document.createElement("p");
  $totalDisplay.textContent = `Total : ${total} $`;

  // Botón para vaciar carrito
  let $clearBtn = document.createElement("button");
  $clearBtn.textContent = "Vaciar carrito";
  $clearBtn.classList.add('empty');
  $clearBtn.addEventListener("click", () => {
    if (shoppingCart.length === 0){
      alert('El carrito esta vacio');
      return};
    let confirmClear = confirm("¿Vaciar el carrito?");
    if (confirmClear){ 
      clearCart();}
  });
  
  // Botón para comprar
  let $buyBtn = document.createElement("button");
  $buyBtn.textContent = "Proceder a comprar";
  $buyBtn.classList.add('buy');
  $buyBtn.addEventListener("click", processPurchase);

  $cartPanel.append($totalDisplay, $clearBtn, $buyBtn);
}




// Función boton +
function increaseProductQuantity(e) {
  let id = Number(e.target.parentElement.id);
  let cartItem = shoppingCart.find(p => p.id === id);
  let product = productos.find(p => p.id === id);

  if (product.stock === 0) {
    alert("No hay más stock");
    return;
  }

  cartItem.quantity++;
  product.stock--;
  total += cartItem.precio;
  updateCartDisplay();
}

// Función boton -
function decreaseProductQuantity(e) {
  let id = Number(e.target.parentElement.id);
  let cartItem = shoppingCart.find(p => p.id === id);
  let product = productos.find(p => p.id === id);

  if (cartItem.quantity === 1) {
    removeItemFromCart(e.target.parentElement);
    return;
  }

  cartItem.quantity--;
  product.stock++;
  total -= cartItem.precio;
  updateCartDisplay();
}

//Función eliminar producto del carrito
function removeItemFromCart($itemDiv) {
  let id = Number($itemDiv.getAttribute("id"));
  let item = shoppingCart.find(p => p.id === id);
  let original = productos.find(p => p.id === id);

  if (item && original) {
    original.stock += item.quantity;
    total -= item.precio * item.quantity;
  }

  shoppingCart = shoppingCart.filter(p => p.id !== id);
  updateCartDisplay();
}

//Función todo el carrito
function clearCart() {
  for (let item of shoppingCart) {
    let original = productos.find(p => p.id === item.id);
    if (original) {
      original.stock += item.quantity;
    }
  }

  shoppingCart = [];
  total = 0;
  updateCartDisplay();
}

// Compra del carrito
function processPurchase() {
  if (shoppingCart.length === 0){
    alert('El carrito esta vacio');
    return
  }

  shoppingCart = [];
  total = 0;
  let confirmPurchase = confirm("¿Desea comprar los productos?");
  if (confirmPurchase){
   alert("¡Compra realizada con éxito!");
  }
  updateCartDisplay();
}

 

// Botón para mostrar/ocultar carrito
let $toggleCartButton = document.querySelector('a.car');
$toggleCartButton.addEventListener('click', () => {
  $cartPanel.classList.toggle('open');
});

// Botón para abrir/ocultar menú hamburguesa
const $hamburgerBtn = document.querySelector('.hamburger-btn');
const $sideMenu = document.querySelector('.sites');

$hamburgerBtn.addEventListener('click', () => {
  $sideMenu.classList.toggle('open');
});

renderProductGrid();


