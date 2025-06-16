const btnStart = document.getElementById('start-gradient');
let tracking = false;

// Position du coin bas droit au départ
let currentX = window.innerWidth;
let currentY = window.innerHeight;

// Cible (souris)
let targetX = currentX;
let targetY = currentY;

// Dernière position connue de la souris
let lastMouseX = currentX;
let lastMouseY = currentY;

document.addEventListener('mousemove', function(e) {
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    if (tracking) {
        targetX = lastMouseX;
        targetY = lastMouseY;
    }
});

btnStart.addEventListener('click', function() {
    tracking = true;
    btnStart.style.display = 'none';
    targetX = lastMouseX;
    targetY = lastMouseY;
});

// Animation lissée
function animate() {
    if (tracking) {
        // Mouvement lent (0.05 = très smooth)
        currentX += (targetX - currentX) * 0.05;
        currentY += (targetY - currentY) * 0.05;
    }
    const width = window.innerWidth;
    const height = window.innerHeight;
    const xPercent = (currentX / width) * 100;
    const yPercent = (currentY / height) * 100;
    document.body.style.background = `repeating-radial-gradient(circle at ${xPercent}% ${yPercent}%, #eee, #ccc 50px)`;
    requestAnimationFrame(animate);
}

animate();