const container = document.getElementById('container');
const resizeBtn = document.getElementById('resizeBtn');


function createGrid(size) {
    container.innerHTML = "";
    const cellSize = 0.9 * Math.min(window.innerWidth, window.innerHeight) / size;
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
    let newSize = prompt("Enter grid size (max 100):");
    newSize = parseInt(newSize);
    if (Number.isNaN(newSize) || newSize < 1 || newSize > 100) {
        alert("Invalid input. Please enter a number between 1 and 100.");
        return;
    }
    createGrid(newSize);
});