class MouseTracker {
    constructor() {
        this.tracking = false;
        this.currentX = window.innerWidth;
        this.currentY = window.innerHeight;
        this.targetX = this.currentX;
        this.targetY = this.currentY;
        this.lastMouseX = this.currentX;
        this.lastMouseY = this.currentY;
        this.startButton = document.getElementById('start-gradient');
        this.parIciButton = document.getElementById('par-ici-btn');
        
        this.initEventListeners();
        this.animate();
    }

    // Helper function to get random position
    getRandomPosition() {
        // Force the button to render to get its dimensions
        this.parIciButton.style.display = 'block';
        this.parIciButton.style.position = 'fixed';
        
        // Get dimensions
        const buttonWidth = this.parIciButton.offsetWidth;
        const buttonHeight = this.parIciButton.offsetHeight;
        
        // Calculate max positions
        const maxX = window.innerWidth - buttonWidth;
        const maxY = window.innerHeight - buttonHeight;
        
        // Generate random coordinates
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        // Hide the button again
        this.parIciButton.style.display = 'none';
        
        return { x: randomX, y: randomY };
    }

    initEventListeners() {
        document.addEventListener('mousemove', (e) => {
            this.lastMouseX = e.clientX;
            this.lastMouseY = e.clientY;
            if (this.tracking) {
                this.targetX = this.lastMouseX;
                this.targetY = this.lastMouseY;
            }
        });

        if (this.startButton && this.parIciButton) {
            this.startButton.addEventListener('click', () => {
                this.tracking = true;
                this.startButton.style.display = 'none';
                this.targetX = this.lastMouseX;
                this.targetY = this.lastMouseY;
                
                // Show PAR ICI button after 5 seconds
                setTimeout(() => {
                    // Get random position first
                    const position = this.getRandomPosition();
                    
                    // Show button with position
                    this.parIciButton.style.display = 'block';
                    this.parIciButton.style.position = 'fixed';
                    this.parIciButton.style.left = `${position.x}px`;
                    this.parIciButton.style.top = `${position.y}px`;
                    
                    // Add pointer events back after a short delay
                    setTimeout(() => {
                        this.parIciButton.style.pointerEvents = 'auto';
                    }, 100);
                }, 5000);
            });

            this.parIciButton.addEventListener('click', () => {
                this.tracking = false;
                this.parIciButton.style.display = 'none';
            });
        }
    }

    animate() {
        if (this.tracking) {
            this.currentX += (this.targetX - this.currentX) * 0.05;
            this.currentY += (this.targetY - this.currentY) * 0.05;
        }

        const width = window.innerWidth;
        const height = window.innerHeight;
        const xPercent = (this.currentX / width) * 100;
        const yPercent = (this.currentY / height) * 100;
        
        document.body.style.background = `repeating-radial-gradient(circle at ${xPercent}% ${yPercent}%, #eee, #ccc 50px)`;
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize the mouse tracker when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MouseTracker();
});