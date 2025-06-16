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