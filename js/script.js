let products = [
  {
    id: 1,
    name: "Hambúrguer Clássico",
    description:
      "Delicioso hambúrguer com carne suculenta, queijo derretido, alface fresca, tomate e molho especial.",
    price: 19.99,
    image: "assets/hamb-1.png",
  },
  {
    id: 2,
    name: "Hambúrguer Bacon",
    description:
      "Hambúrguer com carne suculenta, queijo cheddar, bacon crocante, alface e molho barbecue.",
    price: 24.99,
    image: "assets/hamb-2.png",
  },
  {
    id: 3,
    name: "Hambúrguer Veggie",
    description:
      "Opção vegetariana com hambúrguer de grão-de-bico, queijo vegano, alface, tomate e molho de mostarda.",
    price: 21.99,
    image: "assets/hamb-3.png",
  },
  {
    id: 4,
    name: "Hambúrguer de Frango",
    description:
      "Hambúrguer de frango grelhado, queijo suíço, alface, tomate e maionese de ervas.",
    price: 22.99,
    image: "assets/hamb-4.png",
  },
  {
    id: 5,
    name: "Hambúrguer de Cordeiro",
    description:
      "Hambúrguer de cordeiro suculento, queijo feta, rúcula e molho de iogurte.",
    price: 27.99,
    image: "assets/hamb-5.png",
  },
  {
    id: 6,
    name: "Hambúrguer de Peixe",
    description:
      "Hambúrguer de peixe grelhado, queijo cremoso, alface, tomate e molho tártaro.",
    price: 23.99,
    image: "assets/hamb-6.png",
  },
  {
    id: 7,
    name: "Hambúrguer de Cogumelos",
    description:
      "Hambúrguer vegetariano com cogumelos salteados, queijo suíço, alface e molho de alho.",
    price: 20.99,
    image: "assets/hamb-7.png",
  },
  {
    id: 8,
    name: "Hambúrguer de Picanha",
    description:
      "Hambúrguer de picanha suculenta, queijo provolone, alface, tomate e molho chimichurri.",
    price: 29.99,
    image: "assets/hamb-8.png",
  },
  {
    id: 9,
    name: "Coca-Cola",
    description:
      "Refrigerante de cola, perfeito para acompanhar seu hambúrguer.",
    price: 6.99,
    image: "assets/refri-1.png",
  },
  {
    id: 10,
    name: "Guaraná",
    description: "Suco natural de guaraná, refrescante e cheio de vitamina C.",
    price: 7.99,
    image: "assets/refri-2.png",
  },
];

// Seletores das áreas
const hamburgueresList = document.getElementById("hamburgueres-list");
const bebidasList = document.getElementById("bebidas-list");

// Separar produtos
const burgers = products.filter((p) => p.image.startsWith("assets/hamb"));
const drinks = products.filter((p) => p.image.startsWith("assets/refri"));

function renderProductCard(product) {
  const productCard = document.createElement("div");
  productCard.classList.add(
    "bg-white",
    "rounded-lg",
    "shadow-md",
    "p-4",
    "flex",
    "items-center",
    "mb-4",
    "w-full",
  );

  const productImage = document.createElement("img");
  productImage.src = product.image;
  productImage.alt = product.name;
  productImage.classList.add(
    "w-28",
    "h-28",
    "object-cover",
    "rounded-md",
    "hover:scale-110",
    "transition-transform",
    "duration-200",
    "hover:rotate-2",
    "mr-4",
  );

  const productInfo = document.createElement("div");
  const productName = document.createElement("h3");
  productName.textContent = product.name;
  productName.classList.add("text-lg", "font-bold");

  const productDescription = document.createElement("p");
  productDescription.textContent = product.description;
  productDescription.classList.add("text-gray-600", "text-sm", "mt-1");

  const priceButtonContainer = document.createElement("div");
  priceButtonContainer.classList.add(
    "flex",
    "items-center",
    "justify-between",
    "gap-4",
    "mt-2",
  );

  const productPrice = document.createElement("p");
  productPrice.textContent = `${formatarPreco(product.price)}`;
  productPrice.classList.add("text-green-500", "font-bold", "text-lg");

  // Botão de adicionar
  const addButton = document.createElement("button");
  addButton.textContent = "Adicionar";
  addButton.classList.add(
    "bg-green-500",
    "hover:bg-green-600",
    "text-white",
    "font-bold",
    "py-2",
    "px-4",
    "rounded",
    "transition-colors",
    "duration-200",
    "cursor-pointer",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-green-400",
    "add-to-cart-btn",
  );
  addButton.dataset.price = product.price;
  addButton.dataset.name = product.name;

  priceButtonContainer.appendChild(productPrice);
  priceButtonContainer.appendChild(addButton);

  productInfo.appendChild(productName);
  productInfo.appendChild(productDescription);
  productInfo.appendChild(priceButtonContainer);

  productCard.appendChild(productImage);
  productCard.appendChild(productInfo);

  return productCard;
}

// Renderizar hambúrgueres
burgers.forEach((product) => {
  hamburgueresList.appendChild(renderProductCard(product));
});

// Renderizar bebidas
drinks.forEach((product) => {
  bebidasList.appendChild(renderProductCard(product));
});

const menu = document.querySelector("#menu");
const cartModal = document.querySelector("#cart-modal");
const cartModalContainer = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");
const deliveryAddress = document.querySelector("#delivery-address");
const addressWarn = document.querySelector("#address-warn");
const checkoutBtn = document.querySelector("#checkout-btn");
const closeCartBtn = document.querySelector("#close-cart-btn");
const cartBtn = document.querySelector("#cart-btn");
const cartCounter = document.querySelector("#cart-count");
const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

cartBtn.addEventListener("click", () => {
  if (cartModal.classList.contains("hidden")) {
    cartModal.classList.remove("hidden");
    cartModal.classList.add("flex");
  } else {
    cartModal.classList.add("hidden");
  }
});

cartModal.addEventListener("click", (e) => {
  if (e.target === cartModal) {
    cartModal.classList.add("hidden");
  }
});

closeCartBtn.addEventListener("click", () => {
  //   cart = [];
  //   updateCartModal();
  cartModal.classList.add("hidden");
});

menu.addEventListener("click", (e) => {
  let parentButton = e.target.closest(".add-to-cart-btn");
  if (parentButton) {
    const name = parentButton.dataset.name;
    const price = parseFloat(parentButton.dataset.price);
    addToCart(name, price);
  }
});
let cart = [];

function addToCart(name, price) {
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  updateCartModal();
}

function updateCartModal() {
  cartModalContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, idx) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const cartItem = document.createElement("div");
    cartItem.classList.add(
      "flex",
      "justify-between",
      "items-start",
      "border-b",
      "pb-2",
      "border-gray-400",
      "mt-3",
    );

    // Esquerda: nome, quantidade e preço
    const itemInfo = document.createElement("div");
    itemInfo.classList.add("flex", "flex-col", "gap-1");

    const itemName = document.createElement("div");
    itemName.textContent = item.name;
    itemName.classList.add("text-gray-800", "font-medium", "text-sm");

    const itemDetails = document.createElement("div");
    itemDetails.classList.add("flex", "gap-2", "text-xs", "text-gray-600");
    const itemQty = document.createElement("span");
    itemQty.textContent = `Qtd: ${item.quantity}`;
    const itemPrice = document.createElement("span");
    itemPrice.textContent = formatarPreco(itemTotal);
    itemPrice.classList.add("text-green-500", "font-bold");
    itemDetails.appendChild(itemQty);
    itemDetails.appendChild(itemPrice);

    itemInfo.appendChild(itemName);
    itemInfo.appendChild(itemDetails);

    // Direita: botões de adicionar e diminuir
    const controls = document.createElement("div");
    controls.classList.add("flex", "items-center", "gap-1");

    const addBtn = document.createElement("button");
    addBtn.innerHTML = '<i class="fa-solid fa-minus"></i>';
    addBtn.classList.add(
      "bg-red-500",
      "text-white",
      "px-3",
      "py-1",
      "rounded",
      "text-xs",
      "hover:bg-red-600",
      "transition",
      "cursor-pointer",
    );
    addBtn.addEventListener("click", () => {
      removeFromCart(idx);
    });

    const subBtn = document.createElement("button");
    subBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
    subBtn.classList.add(
      "bg-green-500",
      "text-white",
      "px-3",
      "py-1",
      "rounded",
      "text-xs",
      "hover:bg-green-600",
      "transition",
      "cursor-pointer",
    );
    subBtn.addEventListener("click", () => {
      incrementCart(idx);
    });

    controls.appendChild(addBtn);
    controls.appendChild(subBtn);

    cartItem.appendChild(itemInfo);
    cartItem.appendChild(controls);
    cartModalContainer.appendChild(cartItem);
    // Incrementa a quantidade de um item do carrinho
    function incrementCart(idx) {
      cart[idx].quantity += 1;
      updateCartModal();
    }
  });
  // Remove item do carrinho pelo índice
  function removeFromCart(idx) {
    if (cart[idx].quantity > 1) {
      cart[idx].quantity -= 1;
    } else {
      cart.splice(idx, 1);
    }
    updateCartModal();
  }

  cartTotal.textContent = `Total: ${formatarPreco(total)}`;
  cartCounter.textContent = cart.length;
}

deliveryAddress.addEventListener("input", () => {
  if (deliveryAddress.value.trim() !== "") {
    addressWarn.classList.add("hidden");
    deliveryAddress.classList.remove(
      "border",
      "border-red-500",
      "p-2",
      "rounded",
      "mt-2",
    );
  }
});

checkoutBtn.addEventListener("click", () => {
    const isOpen = checkRestaurantStatus();

    if (!isOpen) {
      Toastify({
        text: "Estamos fechados! Abriremos amanhã às 18h. Agradecemos a compreensão.",
        duration: 5000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #ff0000, #ff4d4d)",
      }).showToast();
      return;
    }
  if (cart.length === 0) {
    Toastify({
      text: "Seu carrinho está vazio! Adicione itens para finalizar o pedido.",
      duration: 5000,
      close: true,
      gravity: "top",
      position: "right",
      backgroundColor: "linear-gradient(to right, #ff0000, #ff4d4d)",
    }).showToast();
    return;
  }

  if (deliveryAddress.value.trim() === "") {
    addressWarn.classList.remove("hidden");
    deliveryAddress.classList.add(
      "border",
      "border-red-500",
      "p-2",
      "rounded",
      "mt-2",
    );
    return;
  } else {
    addressWarn.classList.add("hidden");
    deliveryAddress.classList.remove(
      "border",
      "border-red-500",
      "p-2",
      "rounded",
      "mt-2",
    );
  }
   const cartItems = cart.map(item => {
    return `${item.quantity}x ${item.name} - ${formatarPreco(item.price * item.quantity)}`;
   }).join("\n");

   const message = `Olá, gostaria de fazer um pedido:\n\n${cartItems}\n\nTotal: ${formatarPreco(cart.reduce((total, item) => total + item.price * item.quantity, 0))}\n\nEndereço de entrega: ${deliveryAddress.value}`;

   const encodedMessage = encodeURIComponent(message);
   const whatsappUrl = `https://wa.me/5583991967945?text=${encodedMessage}`;
   window.open(whatsappUrl, "_blank");
  cart = [];
  deliveryAddress.value = "";
  updateCartModal();
});




function checkRestaurantStatus() {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  const isOpen =
    (currentHour > 11 || (currentHour === 11 && currentMinutes >= 0)) &&
    (currentHour < 23 || (currentHour === 23 && currentMinutes < 50));
  return isOpen;
}

const spanItem = document.querySelector("#message");
const isOpen = checkRestaurantStatus();

if (isOpen) {
  spanItem.textContent = "Estamos abertos! Faça seu pedido.";
  spanItem.classList.add("text-black", "font-bold", "bg-green-500", "px-3", "py-2", "rounded");
} else {
  spanItem.textContent =
    "Estamos fechados!Abriremos amanha às 18h. Agradecemos a compreensão.";
  spanItem.classList.add("text-white", "font-bold", "bg-red-500", "px-3", "py-2", "rounded");
}
