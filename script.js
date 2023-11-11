/*
Resources:
https://developer.mozilla.org/en-US/docs/Web/API/Resize_Observer_API
*/

drawGrid();

const MAXGRID = 100;
let dimUserSelected = 1;

const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    if (entry.contentRect) {
      resizePixels(entry.contentRect.width);
    }
  }
})

resizeObserver.observe(document.querySelector(`.grid-container`));

function resizePixels(containerDim = 1, dim = 16) {
  const pixels = document.querySelectorAll(`.pixel`);
  let dimPixel = 1;
  dimPixel = Math.floor(containerDim/dim);
  pixels.forEach((pixel) => { 
    pixel.style.height = dimPixel + `px`;
    pixel.style.width = dimPixel + `px`;
  })
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
      pixel.classList.add(`pixel`);
      pixel.addEventListener('mouseenter', () => {
        pixel.style.backgroundColor = `#333333`;
      })
      pixelRow.appendChild(pixel);
    }
  }
  resizePixels(gridContainer.clientWidth);
}