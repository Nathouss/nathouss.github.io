// Ce script suppose que currentX, currentY, targetX, targetY sont déjà définis dans le scope global

// Paramètres du cercle de contrainte
const constraintRadius = 250; // rayon du cercle de contrainte (en px)
const constraintCenterX = window.innerWidth / 2;
const constraintCenterY = window.innerHeight / 3;

// Crée le cercle de contrainte visuel
let constraintCircle = document.getElementById('constraint-circle');
if (!constraintCircle) {
    constraintCircle = document.createElement('div');
    constraintCircle.id = 'constraint-circle';
    document.body.appendChild(constraintCircle);
}
constraintCircle.style.position = 'fixed';
constraintCircle.style.left = (constraintCenterX - constraintRadius) + 'px';
constraintCircle.style.top = (constraintCenterY - constraintRadius) + 'px';
constraintCircle.style.width = (constraintRadius * 2) + 'px';
constraintCircle.style.height = (constraintRadius * 2) + 'px';
constraintCircle.style.border = '2px dashed #888';
constraintCircle.style.borderRadius = '50%';
constraintCircle.style.pointerEvents = 'none';
constraintCircle.style.zIndex = 1001;
constraintCircle.style.background = 'transparent';

let mask = document.getElementById('constraint-mask');
if (!mask) {
    mask = document.createElement('div');
    mask.id = 'constraint-mask';
    document.body.appendChild(mask);
}
mask.style.position = 'fixed';
mask.style.left = '0';
mask.style.top = '0';
mask.style.width = '100vw';
mask.style.height = '100vh';
mask.style.pointerEvents = 'none';
mask.style.zIndex = 1000;

// Utilise un radial-gradient pour créer un trou transparent au centre du masque
const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;
const radius = 350;

mask.style.background = `
    radial-gradient(
        circle ${radius}px at ${constraintCenterX}px ${constraintCenterY}px,
        transparent 0%,
        transparent 0%,
        #414141 100%
    )
`;

// Intercepte la fonction animate pour contraindre le radiant
const originalAnimate = window.animate;
window.animate = function() {
    if (tracking) {
        // Calcul du vecteur entre le centre de contrainte et la souris
        const dx = targetX - constraintCenterX;
        const dy = targetY - constraintCenterY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let nextTargetX = targetX;
        let nextTargetY = targetY;

        if (dist > constraintRadius) {
            // On place la cible sur le bord du cercle de contrainte
            const angle = Math.atan2(dy, dx);
            nextTargetX = constraintCenterX + Math.cos(angle) * constraintRadius;
            nextTargetY = constraintCenterY + Math.sin(angle) * constraintRadius;
        }

        currentX += (nextTargetX - currentX) * 0.05;
        currentY += (nextTargetY - currentY) * 0.05;
    }
    const width = window.innerWidth;
    const height = window.innerHeight;
    const xPercent = (currentX / width) * 100;
    const yPercent = (currentY / height) * 100;
    document.body.style.background = `repeating-radial-gradient(circle at ${xPercent}% ${yPercent}%, #eee, #ccc 50px)`;
    requestAnimationFrame(window.animate);
};

// Relance l'animation avec la nouvelle contrainte
window.animate();