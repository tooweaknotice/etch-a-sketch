/*
Resources:
https://developer.mozilla.org/en-US/docs/Web/API/Resize_Observer_API
*/

drawGrid();

const MAXGRID = 100;
let gridDim = 16;

const resizeButton = document.querySelector(`.resize-button`);
resizeButton.addEventListener(`click`, () => {
  let userSelectedDim = Number(prompt(`Enter Grid Dimension.`,`16`));
  while (isNaN(userSelectedDim)) {
    const errorMsg = document.createElement(`div`);
    errorMsg.textContent = `Please enter a valid number.`
    userSelectedDim = Number(prompt(`Enter Grid Dimension.`,`16`));
  }
  gridDim = Number(userSelectedDim);
  deletePixels();
  drawGrid(gridDim);
})

const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    if (entry.contentRect) {
      resizePixels(entry.contentRect.width, gridDim);
    }
  }
})

resizeObserver.observe(document.querySelector(`.grid-container`));

function resizePixels(containerDim = 1, dim = 16) {
  const pixels = document.querySelectorAll(`.pixel`);
  let dimPixel = 1;
  dimPixel = Math.floor(Math.floor(containerDim)/dim);
  pixels.forEach((pixel) => { 
    pixel.style.height = dimPixel + `px`;
    pixel.style.width = dimPixel + `px`;
  })
}

function deletePixels() {
  const gridContainer = document.querySelector(`.grid-container`);
  gridContainer.replaceChildren([])
}

function drawGrid(dim = 16){
  const gridContainer = document.querySelector(`.grid-container`);
  for (let i = 0; i < dim; i++){
    const pixelRow = document.createElement(`div`);
    pixelRow.style.display = `flex`;
    pixelRow.classList.add(`pixel-row`)
    gridContainer.appendChild(pixelRow);
    for (let j = 0; j < dim; j++){
      const pixel = document.createElement(`div`);
      pixel.style.borderRight = `1px solid #eeeeee`;
      pixel.style.borderBottom = `1px solid #eeeeee`;
      pixel.style.boxSizing = `border-box`;
      pixel.classList.add(`pixel`);
      pixel.addEventListener('mouseenter', () => {
        let red = Math.round(Math.random() * 255).toString(16);
        let green = Math.round(Math.random() * 255).toString(16);
        let blue = Math.round(Math.random() * 255).toString(16);
        pixel.style.backgroundColor = `#` + red + green + blue;
      })
      pixelRow.appendChild(pixel);
    }
  }
  resizePixels(gridContainer.clientWidth, dim);
}