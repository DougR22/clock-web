
// Purpose: Allow user to change background color using mouse click, touch, or keyboard arrow keys.

const colors = [
    "#4B0082",   // Indigo
    "#0B2D5C",   // Dark blue
    "#4A0F0F",   // Dark maroon
    "#0F3D1E",   // Dark green
    "#101F4A",   // Navy
    "#0F3F46",   // Dark cyan
    "#4A3B0A",   // Dark olive
    "#3B164A",   // Dark magenta
    "#3A1F4F",   // Dark purple
    "black"
];

let index = 0;

function showColor() {
    document.body.style.backgroundColor = colors[index];
}

function nextColor() {
    index = (index + 1) % colors.length;
    showColor();
}

function previousColor() {
    index = (index - 1 + colors.length) % colors.length;
    showColor();
}

// Show the initial color.
showColor();

// Click or tap on left/right of screen advances color backward/forward in color list.
document.body.addEventListener("click", function (e) {
    if (e.clientX < window.innerWidth / 2) {
        previousColor();
    } else {
        nextColor();
    }
});

// Keyboard support.
document.addEventListener("keydown", function (e) {
    switch (e.key) {
    case "ArrowRight":
        nextColor();
        break;
    case "ArrowLeft":
        previousColor();
        break;
    }
});
