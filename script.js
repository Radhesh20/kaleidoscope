const canvas = document.getElementById('kaleidoscopeCanvas');
const ctx = canvas.getContext('2d');

// --- Configuration ---
const symmetry = 8; // The number of symmetrical slices. Try 6, 8, 10, 12...
const particleCountOnMove = 3; // Number of particles to generate on mouse move
const angle = (Math.PI * 2) / symmetry;

let particles = [];
let hue = 0; // Starting hue for the rainbow color effect

// Mouse position object
const mouse = {
    x: null,
    y: null,
    isMoving: false
};

// Set initial canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 4 + 1; // Random size between 1 and 5
        this.speedX = Math.random() * 3 - 1.5; // Random horizontal velocity
        this.speedY = Math.random() * 3 - 1.5; // Random vertical velocity
        this.color = `hsl(${hue}, 100%, 50%)`;
        this.lifespan = 1; // Represents full life, will decrease over time
    }

    // Update particle's position and lifespan
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.05;
        this.lifespan -= 0.015;
    }

    // Draw the particle on the canvas
    draw(context) {
        context.fillStyle = this.color;
        context.strokeStyle = this.color;
        context.lineWidth = 1;
        context.globalAlpha = this.lifespan; // Fade out effect
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
        context.globalAlpha = 1; // Reset alpha
    }
}

// --- Main Functions ---

// Creates new particles at the mouse position
function createParticles() {
    if (mouse.isMoving) {
        for (let i = 0; i < particleCountOnMove; i++) {
            // We create particles relative to the center for easier rotation later
            const mx = mouse.x - canvas.width / 2;
            const my = mouse.y - canvas.height / 2;
            particles.push(new Particle(mx, my));
        }
    }
}

// Updates and draws all particles for each frame
function handleParticles() {
    // Loop backwards to safely remove particles from the array
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();

        // Save the current context state
        ctx.save();
        // Move the origin to the center of the canvas
        ctx.translate(canvas.width / 2, canvas.height / 2);

        // Draw the particle and its symmetrical counterparts
        for (let j = 0; j < symmetry; j++) {
            ctx.rotate(angle);
            p.draw(ctx); // Draw the original particle

            // Draw the mirrored version for a more complex pattern
            ctx.save();
            ctx.scale(1, -1);
            p.draw(ctx);
            ctx.restore();
        }

        // Restore the context to its original state
        ctx.restore();

        // Remove particle if it has faded out
        if (p.lifespan <= 0) {
            particles.splice(i, 1);
        }
    }
}

// --- Animation Loop ---
function animate() {
    // Clear the canvas with a semi-transparent black for a trailing effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    createParticles();
    handleParticles();

    // Cycle through the hue value for the rainbow effect
    hue = (hue + 1) % 360;

    // Request the next frame
    requestAnimationFrame(animate);
}
animate(); // Start the animation loop

// --- Event Listeners ---

// Update mouse coordinates on move
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.isMoving = true;
});

// Stop creating particles when the mouse leaves the window
window.addEventListener('mouseout', () => {
    mouse.isMoving = false;
});

// Stop creating particles when mouse is not moving
let moveTimeout;
window.addEventListener('mousemove', () => {
    mouse.isMoving = true;
    clearTimeout(moveTimeout);
    moveTimeout = setTimeout(() => {
        mouse.isMoving = false;
    }, 100); // Stop if no movement for 100ms
});

// Adjust canvas size on window resize
window.addEventListener('resize', resizeCanvas);
