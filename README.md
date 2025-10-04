# Particle Kaleidoscope

## **[Live Demo](https://radhesh20.github.io/kaleidoscope/)**

This project is an interactive digital kaleidoscope that generates beautiful, symmetrical patterns based on your mouse movement. It creates a mesmerizing effect with colorful particles that dance and fade across the screen.

## How to Use

1.  Open the `index.html` file in your web browser.
2.  Move your mouse across the screen to create colorful, kaleidoscopic patterns.

## Features

* **Interactive Art:** Your mouse movements are translated into flowing, artistic patterns in real-time.
* **Symmetrical Beauty:** The canvas is divided into symmetrical slices, creating a classic kaleidoscope effect. The number of slices can be easily customized.
* **Colorful & Dynamic:** Particles are rendered with a cycling hue, creating a vibrant rainbow effect. They also fade out over time, leaving elegant trails.
* **Responsive:** The kaleidoscope will automatically resize to fit your browser window.

## Files

* **`index.html`**: The main file to open in your browser. It sets up the HTML structure and links the stylesheet and JavaScript file.
* **`style.css`**: Contains the styles for the page, including the canvas and the instruction text.
* **`script.js`**: Holds all the logic for the kaleidoscope effect, including particle generation, animation, and symmetrical drawing.
* **`framework-model.html`**: An alternative implementation using the p5.js library, demonstrating a different approach to achieving a similar effect.

## How It Works

The kaleidoscope effect is achieved using the HTML5 Canvas API and JavaScript. Here's a breakdown of the process from `script.js`:

1.  **Particle System:** When you move your mouse, the script generates a set number of `Particle` objects at the cursor's position. Each particle has a random size and velocity, giving it a natural, flowing movement.
2.  **Symmetry:** The canvas is conceptually divided into a number of slices (default is 8).
3.  **Animation Loop:** The `animate` function runs on every frame.
    * It clears the canvas with a semi-transparent black, which creates the trailing effect.
    * It calls `createParticles()` to generate new particles if the mouse is moving.
    * It calls `handleParticles()` which updates the position and lifespan of each particle.
4.  **Drawing:** For each particle, the code translates the canvas origin to the center. It then enters a loop that rotates the canvas by a set angle (`360 / symmetry`) and draws the particle. It repeats this for each slice, creating the symmetrical pattern. A mirrored version of the particle is also drawn within each slice to add more complexity.
5.  **Color:** A global `hue` variable is constantly incremented, causing the color of new particles to cycle through the spectrum, resulting in the rainbow effect.

## Customization

You can easily customize the kaleidoscope by tweaking the configuration variables at the top of the `script.js` file:

* `symmetry`: Change this number to increase or decrease the number of symmetrical slices. Try values like 6, 10, or 12 for different patterns.
* `particleCountOnMove`: Increase this number to create denser, more intense patterns, or decrease it for a more subtle effect.
