
// Purpose: Allow user to change colors using mouse click, touch, or keyboard arrow keys.

const darkColors = [
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
let secondHandColorIndex = 0;
let digitalTimeColorIndex = 0;

function showColor() {
    document.body.style.backgroundColor = darkColors[index];
}

function nextColor() {
    index = (index + 1) % darkColors.length;
    showColor();
}

function previousColor() {
    index = (index - 1 + darkColors.length) % darkColors.length;
    showColor();
}

function toggleSecondHandColor() {
    const secondHandColors = ["#FF1616", "#00FF00", "#FFFFFF", "#A0A0A0"];
    secondHandColorIndex = (secondHandColorIndex + 1) % secondHandColors.length;
    document.documentElement.style.setProperty("--second", secondHandColors[secondHandColorIndex]);
}

function cycleDigitalTimeColor() {
    const digitalTimeColors = ["#F7F0FF", "#00E900", "#1637CB", "#000000"];
    digitalTimeColorIndex = (digitalTimeColorIndex + 1) % digitalTimeColors.length;
    document.querySelector("#digitalTime").style.color = digitalTimeColors[digitalTimeColorIndex];
}

const digitalPanel = document.querySelector(".digital-panel");
const analogPanel = document.querySelector(".analog-panel");

digitalPanel.addEventListener("click", function () {
    cycleDigitalTimeColor();
});

analogPanel.addEventListener("click", function () {
    toggleSecondHandColor();
});

// Show the initial color.
showColor();

// Click or tap on left/right of screen advances color backward/forward in color list.
document.body.addEventListener("click", function (e) {
    if (e.target.closest(".digital-panel, .analog-panel")) {
        return;
    }

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
    case "s":
    case "S":
        toggleSecondHandColor();
        break;
    case "t":
    case "T":
        cycleDigitalTimeColor();
        break;
    }
});
