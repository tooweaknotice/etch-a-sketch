drawGrid();

const MAXGRID = 100;

function drawGrid(x = 16, y = 16){
  for (let i = 0; i < x; i++){
    const gridContainer = document.querySelector(`.grid-container`);
    const pixelRow = document.createElement(`div`);
    pixelRow.style.display = `flex`;
    pixelRow.classList.add(`pixel-row`)
    gridContainer.appendChild(pixelRow);
    for (let j = 0; j < y; j++){
      const pixel = document.createElement(`div`);
      pixel.style.borderRight = `1px solid #eeeeee`;
      pixel.style.borderBottom = `1px solid #eeeeee`;
      pixel.style.padding = `3px`;
      pixel.addEventListener('mouseenter', () => {
        pixel.style.backgroundColor = `#333333`;
      })
      pixelRow.appendChild(pixel);
    }
  }
}