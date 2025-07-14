const resizeBtn = document.getElementById("resizeBtn");
const resizeUI = document.querySelector(".resize-ui");
const confirmResizeBtn = document.querySelector(".confirm-resize-btn");
const gridInput = document.querySelector(".grid-input");
const container = document.getElementById("container");

function createGrid(size) {
    container.innerHTML = "";
    const cellSize = 0.8 * Math.min(window.innerWidth, window.innerHeight) / size;
    for (let i = 0; i < size; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < size; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.style.width = `${cellSize}px`;
            cell.style.height = `${cellSize}px`;
            cell.dataset.hoverCount = 0;
            cell.addEventListener("mouseover", () => {
                let hoverCount = parseInt(cell.dataset.hoverCount);
                if (hoverCount === 0) {
                    const r = Math.floor(Math.random() * 256);
                    const g = Math.floor(Math.random() * 256);
                    const b = Math.floor(Math.random() * 256);
                    cell.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
                    cell.style.opacity = "0.1";
                } else if (hoverCount < 10) {
                    cell.style.opacity = `${(hoverCount + 1) / 10}`;
                }
                cell.dataset.hoverCount++;
            });
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}
createGrid(16);
resizeBtn.addEventListener("click", () => {
    resizeUI.classList.toggle("hidden");
    if (!resizeUI.classList.contains("hidden")) {
        gridInput.focus();
    }
});

confirmResizeBtn.addEventListener("click", () => {
    const newSize = parseInt(gridInput.value);
    if (Number.isNaN(newSize) || newSize < 1 || newSize > 100) {
        alert("Invalid input. Please enter a number between 1 and 100.");
        return;
    }
    createGrid(newSize);
    resizeUI.classList.add("hidden");
    gridInput.value = "";
});