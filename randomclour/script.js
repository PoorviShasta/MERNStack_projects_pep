const containerEl = document.querySelector(".container");
// repeat 30 times , create new div  add class to div , add div to page 
for (let index = 0; index < 30; index++) {
  const colorContainerEl = document.createElement("div");
  colorContainerEl.classList.add("color-container");
  containerEl.appendChild(colorContainerEl);
}
// select all divs with class color-container
const colorContainerEls = document.querySelectorAll(".color-container");


// function gives colours to the boxes
function generateColors() {
  colorContainerEls.forEach((colorContainerEl) => {
    const newColorCode = randomColor();
    colorContainerEl.style.backgroundColor = "#" + newColorCode;//change css background color
    colorContainerEl.innerText = "#" + newColorCode; // hex color format.
  }); //write color code inside box, so we can see it
}
generateColors();
function randomColor() {
  const chars = "0123456789abcdef";
  //const colorCodeLength = 6;
  let colorCode = "";
  for (let index = 0; index < 6; index++) {
    const randomNum = Math.floor(Math.random() * chars.length);
    colorCode += chars.substring(randomNum, randomNum + 1);
  }
  return colorCode;
}
// homework 

 