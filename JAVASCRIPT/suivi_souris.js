function initSuiviSouris() {
    const btnStart = document.getElementById('start-gradient');
    const btnParIci = document.getElementById('par-ici-btn');
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

    if (btnStart && btnParIci) {
        btnStart.addEventListener('click', function() {
            tracking = true;
            btnStart.style.display = 'none';
            targetX = lastMouseX;
            targetY = lastMouseY;
            setTimeout(() => {
                btnParIci.style.display = 'inline-block';
            }, 5000);
        });

        btnParIci.addEventListener('click', function() {
            tracking = false;
            btnParIci.style.display = 'none';
        });
    }

    function animate() {
        if (tracking) {
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
}

