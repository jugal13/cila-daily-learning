const toggle = document.querySelector(".nav-toggle");
const items = document.querySelector(".nav-items");

toggle.addEventListener("click", function (e) {
  items.classList.toggle("show-list");
});
