let simple = true;
const bodyText = document.getElementById("body-text");
const links = document.querySelectorAll(".btn");

function generate() {
  const bgColor = simple ? generateSimple() : generateHex();
  bodyText.style.color = bgColor;
  document.body.style.backgroundColor = bgColor;
  bodyText.innerText = `Background Color: ${bgColor}`;
}

function generateSimple() {
  colors = ["Red", "Blue", "Green", "Yellow"];

  let index = getRandomNumber(colors.length);

  return colors[index];
}

function generateHex() {
  values = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];

  let hexColor = "#";

  for (let i = 0; i < 6; i++) {
    hexColor += values[getRandomNumber(values.length)];
  }

  return hexColor;
}

function getRandomNumber(length) {
  return Math.floor(Math.random() * length);
}

function setSimple() {
  links[1].classList.remove(["active"]);
  simple = true;
  links[0].classList.add(["active"]);
}

function setHex() {
  links[0].classList.remove(["active"]);
  simple = false;
  links[1].classList.add(["active"]);
}
