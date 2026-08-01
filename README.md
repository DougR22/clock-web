# Web Clock: How It Works

This project is a small static web page that recreates the clock design from `clocks.jpg` as a live browser clock.

It was created in VSCode by Codex GPT-5.5 (in fast medium reasoning mode).

## Files

- `index.html` contains the page structure.
- `clock_ai.css` contains the layout and visual styling.
- `clock_ai.js` updates the live digital time, date line, analog hands, and tick marks.
- `clocks.jpg` is the original reference image.

## HTML Structure

`index.html` creates one centered clock component:

- A digital panel at the top with the current time.
- An analog panel with a circular clock face.
- A date line underneath with the local date, weekday, current time, and timezone.

The analog clock uses normal HTML elements for the hands and an inline SVG layer for the tick marks:

```html
<svg class="clock-marks" viewBox="0 0 100 100" aria-hidden="true">
  <g id="clockMarks"></g>
</svg>
```

The JavaScript fills this SVG group with 60 tick marks when the page loads.

## Styling

`clock_ai.css` defines the main colors at the top:

```css
:root {
  --page: #540082;
  --panel: #287ed0;
  --ink: #050505;
  --white: #f7f0ff;
  --second: #ff1616;
}
```

The page background is purple, while the digital and analog panels are blue. The clock face is a circle with a black border. The hour and minute hands are black, and the second hand is red.

The clock is responsive. The `.clock-shell` has a fixed maximum width, but it can shrink on smaller screens.

## Tick Marks

The tick marks are generated in `clock_ai.js` by `drawClockMarks()`.

There are 60 total marks drawn by the for loop:

- Every 5th mark is a major hour mark.
- The rest are minor minute marks.

Each mark is an SVG line rotated around the center of the clock by 6 degrees:

```js
line.setAttribute("transform", `rotate(${mark * 6} 50 50)`);
```

## Live Clock Logic

`updateClock()` runs continuously with call to browser API `requestAnimationFrame()`. The function "updateClock", given as the callback parameter, is called just before next browser screen repaint.  The browser handles the refresh frame rate (one typical rate is 60 fps).

Each frame:

1. Reads the current local time with `new Date()`.
2. Calculates the rotation angle for each hand.
3. Updates the CSS `transform` for the hour, minute, and second hands.
4. Updates the digital time text.
5. Updates the date line.

The hand rotations are calculated like this:

```js
const secondDegrees = ((seconds + milliseconds / 1000) / 60) * 360;
const minuteDegrees = ((minutes + seconds / 60) / 60) * 360;
const hourDegrees = (((hours % 12) + minutes / 60) / 12) * 360;
```

This makes the second hand sweep smoothly instead of jumping once per second.

## Date And Timezone

The date line uses the browser's local time. It avoids using UTC for the displayed date, so the date does not accidentally change early or late depending on timezone.

The timezone abbreviation comes from `Intl.DateTimeFormat`:

```js
const zoneFormatter = new Intl.DateTimeFormat("en-US", {
  timeZoneName: "short"
});
```

## Running It

Open `index.html` in a browser. No build step, server, or install is required.
