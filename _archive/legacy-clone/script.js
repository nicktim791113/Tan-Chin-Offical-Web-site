const slides = Array.from(document.querySelectorAll(".da-slide"));
const dots = Array.from(document.querySelectorAll(".da-dots span"));
let current = 0;

function showSlide(index) {
  if (!slides.length) return;
  slides[current].classList.remove("current");
  dots[current]?.classList.remove("current");
  current = index;
  slides[current].classList.add("current");
  dots[current]?.classList.add("current");
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => showSlide(index));
});

if (slides.length > 1) {
  window.setInterval(() => {
    showSlide((current + 1) % slides.length);
  }, 4200);
}

function ensureSlideMenu() {
  let menu = document.querySelector("#slide-menu");
  if (!menu) {
    menu = document.createElement("aside");
    menu.id = "slide-menu";
    menu.className = "slide-menu";
    menu.innerHTML = `
      <h2 class="title">MENU</h2>
      <ul class="main-nav">
        <li><a href="./about.html">公司簡介</a></li>
        <li><a href="./quality.html">品質控管</a></li>
        <li><a href="./equipment.html">製程能力</a></li>
        <li><a href="./products.html">客製服務</a></li>
        <li><a href="./catalog.html">電子型錄</a></li>
        <li><a href="./contact.html">聯絡我們</a></li>
      </ul>
    `;
    document.body.appendChild(menu);
  }
  let backdrop = document.querySelector(".slide-menu-backdrop");
  if (!backdrop) {
    backdrop = document.createElement("button");
    backdrop.type = "button";
    backdrop.className = "slide-menu-backdrop";
    backdrop.setAttribute("aria-label", "關閉選單");
    document.body.appendChild(backdrop);
  }
  return { menu, backdrop };
}

const toggleButton = document.querySelector(".toggle-btn");
if (toggleButton) {
  const { menu, backdrop } = ensureSlideMenu();
  toggleButton.addEventListener("click", (event) => {
    event.preventDefault();
    menu.classList.toggle("open");
    backdrop.classList.toggle("open");
  });
  backdrop.addEventListener("click", () => {
    menu.classList.remove("open");
    backdrop.classList.remove("open");
  });
}
