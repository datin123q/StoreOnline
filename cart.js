function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart-count").textContent =  cart.reduce( ((a,b) => a + b.number), 0);;
  console.log(cart);
}

function renderCart() {
  const cartContainer = document.getElementById("cart");
  const dropdownContainer = document.querySelector(".cart-dropdown__items");
  const dropdownTotal = document.getElementById("dropdown-total");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartContainer.innerHTML = "";
  dropdownContainer.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    const priceNumber = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
    const subtotal = priceNumber * item.number;
    total += subtotal;

    cartContainer.innerHTML += `
      <div class="cart-item">
        <div class="pro-title">
          <img src="${item.image}" width="54">
          <span>${item.title.trim().split(" ").slice(-2).join(" ")}</span>
        </div>
        <span class="pro-price">${item.price}</span>
        <div class="pro-quantity">
          <input type="number" value="${item.number}" name="quantity" min="0" max="50">
        </div>
        <div class="pro-total">$${subtotal}</div>
        <button onclick="removeFromCart(${index})">x</button>
      </div>
    `;

    dropdownContainer.innerHTML += `
      <div class="cart-dropdown__item">
        <img src="${item.image}">
        <div style="flex:1; margin:0 6px;">
          <p style="margin:0;font-size:13px;">${item.title.trim().split(" ").slice(-2).join(" ")}</p>
          <small>${item.number} × ${item.price}</small>
        </div>
        <span>$${subtotal}</span>
      </div>
    `;
  });
   cartContainer.innerHTML += `
    <div class="cart-total">
      <strong>Tổng tiền: </strong> 
      <span>$${total.toLocaleString()}</span>
    </div>
  `;
  dropdownTotal.textContent = "$" + total.toLocaleString();
  updateCartCount();
}
document.querySelector(".update-cart").addEventListener("click", () =>{
    updatecart();
});
function updatecart(){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  document.querySelectorAll('.cart-item input[name="quantity"]').forEach((input, index) => {
    const newnumber = parseInt(input.value) || 0;
    if (newnumber <= 0) {
      cart[index].__remove = true;
    } else {
      cart[index].number = newnumber;
    }
  });

  cart = cart.filter(item => !item.__remove);

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart(); 
}



function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingIndex = cart.findIndex(item => item.id === product.id);

  if (existingIndex !== -1) {
    cart[existingIndex].number += 1;
  } else {
    cart.push({ ...product, number: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
}


document.addEventListener("DOMContentLoaded", () => {
  const addToCartBtns = document.querySelectorAll(
    ".flash-sales__card__btn, .best-selling__card__btn"
  );

  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".flash-sales__card, .best-selling__card");
      addToCart(card);
    });
  });

  renderCart();
 });

