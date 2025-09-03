  const daysEl = document.querySelector(".flash-sales__header__main__time .days:nth-of-type(1) h1");
  const hoursEl = document.querySelector(".flash-sales__header__main__time .days:nth-of-type(2) h1");
  const minutesEl = document.querySelector(".flash-sales__header__main__time .days:nth-of-type(3) h1");
  const secondsEl = document.querySelector(".flash-sales__header__main__time .days:nth-of-type(4) h1");
  const quantity = document.querySelector(".quantity");
  const countdownTime = 4 * 24 * 60 * 60 * 1000;
  const endTime = new Date().getTime() + countdownTime;
  renderCart();
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = endTime - now;

    if (distance <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      clearInterval(timer);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = days.toString().padStart(2, "0");
    hoursEl.textContent = hours.toString().padStart(2, "0");
    minutesEl.textContent = minutes.toString().padStart(2, "0");
    secondsEl.textContent = seconds.toString().padStart(2, "0");
  }

  updateCountdown();
  const timer = setInterval(updateCountdown, 1000);
  const list = document.querySelector(".flash-sales__list");
  const btnLeft = document.querySelector(".carousel-btn.left");
  const btnRight = document.querySelector(".carousel-btn.right");

  btnLeft.addEventListener("click", () => {
    list.scrollBy({ left: -250, behavior: "smooth" });
  });

  btnRight.addEventListener("click", () => {
    list.scrollBy({ left: 250, behavior: "smooth" });
  });
document.addEventListener("DOMContentLoaded", () => {
  const addToCartBtns = document.querySelectorAll(
    ".flash-sales__card__btn, .best-selling__card__btn"
  );
  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".flash-sales__card, .best-selling__card");
      const title = card.querySelector("h3").textContent.trim();
      const price = card.querySelector(".price-new").textContent.trim();
      const image = card.querySelector("img").src;
      var quantity = 1;

      const product = { title, price, image, quantity };
      addToCart(product);
    });
  });
});
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingIndex = cart.findIndex(item => item.title === product.title);
  console.log(existingIndex);
  if (existingIndex !== -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  quantity.innerHTML=  cart.reduce( ((a,b) => a + b.quantity), 0);
}

function renderCart() {
  const dropdownContainer = document.querySelector(".cart-dropdown__items");
  const dropdownTotal = document.getElementById("dropdown-total");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log(cart);
  dropdownContainer.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    const priceNumber = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
    const subtotal = priceNumber * item.quantity;
    total += subtotal;
    dropdownContainer.innerHTML += `
      <div class="cart-dropdown__item">
        <img src="${item.image}">
        <div style="flex:1; margin:0 6px;">
          <p style="margin:0;font-size:13px;">${item.title.trim().split(" ").slice(-2).join(" ")}</p>
          <small>${item.quantity} × ${item.price}</small>
        </div>
        <span>$${subtotal}</span>
      </div>
    `;
  });
  dropdownTotal.textContent = "$" + total.toLocaleString();
  quantity.innerHTML=  (JSON.parse(localStorage.getItem("cart")) || []).reduce( ((a,b) => a + b.quantity), 0);
}
