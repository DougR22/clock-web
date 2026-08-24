// Purpose: Allow user to change colors using click, touch, or keyboard.

const bgDarkColors = [
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
let hourAndMinuteHandColorIndex = 0;
let digitalTimeColorIndex = 0;

function showColor() {
    document.body.style.backgroundColor = bgDarkColors[index];
}

function nextColor() {
    index = (index + 1) % bgDarkColors.length;
    showColor();
}

function previousColor() {
    index = (index - 1 + bgDarkColors.length) % bgDarkColors.length;
    showColor();
}

function toggleSecondHandColor() {
    const secondHandColors = ["#FF1616", "#00FF00", "#FFFFFF", "#A0A0A0", "#0000FF"];
    secondHandColorIndex = (secondHandColorIndex + 1) % secondHandColors.length;
    document.documentElement.style.setProperty("--second", secondHandColors[secondHandColorIndex]);
}

function cycleHourAndMinuteHandColors() {
    const handColors = ["#050505", "#00FF00", "#FFFFFF", "#008000", "#A0A0A0", "#0000FF"];
    hourAndMinuteHandColorIndex = (hourAndMinuteHandColorIndex + 1) % handColors.length;
    document.documentElement.style.setProperty("--hands", handColors[hourAndMinuteHandColorIndex]);
}

function cycleDigitalTimeColor() {
    const digitalTimeColors = ["#F7F0FF", "#C0C0C0", "#00E900", "#0000FF", "#000000"];
    digitalTimeColorIndex = (digitalTimeColorIndex + 1) % digitalTimeColors.length;
    document.querySelector("#digitalTime").style.color = digitalTimeColors[digitalTimeColorIndex];
}

const digitalPanel = document.querySelector(".digital-panel");
const analogPanel = document.querySelector(".analog-panel");
const clockFace = document.querySelector(".clock-face");

digitalPanel.addEventListener("click", function () {
    cycleDigitalTimeColor();
});

// user can click inside or outside the clock face to change hand colors
analogPanel.addEventListener("click", function (event) {
    const faceBounds = clockFace.getBoundingClientRect();
    const faceCenterX = faceBounds.left + faceBounds.width / 2;
    const faceCenterY = faceBounds.top + faceBounds.height / 2;
    const faceRadius = Math.min(faceBounds.width, faceBounds.height) / 2;
    const clickedInsideClockFace = Math.hypot(
        event.clientX - faceCenterX,
        event.clientY - faceCenterY
    ) <= faceRadius;

    if (clickedInsideClockFace) {
        toggleSecondHandColor();
    } else {
        cycleHourAndMinuteHandColors();
    }
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
    case "m":
    case "M":
        cycleHourAndMinuteHandColors();
        break;
    case "t":
    case "T":
        cycleDigitalTimeColor();
        break;
    }
});
