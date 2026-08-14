# Web Clock: How It Works

This project is a small static web page that implements a live clock in both digital and analog formats.

It was created in VSCode by Codex GPT-5.5 (in fast medium reasoning mode), with minor updates by 5.6 Luna (medium reasoning mode).

## Files

- `index.html` contains the page structure.
- `clock_ai.css` contains the layout and visual styling.
- `clock_ai.js` updates the live digital time, date line, analog hands, and tick marks.

## HTML Structure

`index.html` creates one centered clock component:

- A digital panel at the top with the current time.
- An analog panel with a circular clock face.
- A date line underneath with the local date, weekday, current time, and timezone.

The digital panel is the accessible time display. The analog panel is hidden from screen readers because it duplicates the digital time.

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

The clock is responsive to resizing. The `.clock-shell` has a fixed maximum width, but it can shrink on smaller screens.

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

The browser API `requestAnimationFrame()` runs function `updateClock()` . This function is called just before the next browser screen repaint, allowing the analog hands to move smoothly.

Each animation frame:

1. Reads the current local time with `new Date()`.
2. Calculates the rotation angle for each hand.
3. Updates the CSS `transform` for the hour, minute, and second hands.

Once per second, the script also updates:

1. The digital time text.
2. The date line.
3. The machine-readable UTC timestamps on the `<time>` elements.

The digital panel uses a 12-hour format without an AM/PM indicator. The date line remains in 24-hour format.

The hand rotations are calculated per frame as follows:

```js
const secondDegrees = ((seconds + milliseconds / 1000) / 60) * 360;
const minuteDegrees = ((minutes + seconds / 60) / 60) * 360;
const hourDegrees = (((hours % 12) + minutes / 60) / 12) * 360;
```

Animation frame updates makes the second hand sweep smoothly instead of jumping once per second.

## Date And Timezone

The date line uses the browser's local time. It avoids using UTC for the displayed date, so the date does not accidentally change early or late depending on timezone.

The `<time>` elements store the current instant as a machine-readable UTC timestamp using `toISOString()`.

The timezone abbreviation comes from `Intl.DateTimeFormat`:

```js
const zoneFormatter = new Intl.DateTimeFormat("en-US", {
  timeZoneName: "short"
});
```

## Running It

Open `index.html` in a browser. No build step, server, or install is required.
