// ========== 3D BRAIN VISUALIZATION ==========

function initBrainCanvas(canvasId = 'brainCanvas') {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    let rotation = 0;
    let particlesArray = [];
    
    class BrainParticle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.radius = Math.random() * 2;
            this.life = Math.random() * 200 + 100;
            this.maxLife = this.life;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life--;
            this.radius = (this.radius / 2) * (this.life / this.maxLife);
        }
        
        draw(ctx) {
            const alpha = this.life / this.maxLife;
            ctx.fillStyle = `rgba(0, 194, 255, ${alpha * 0.8})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function drawBrain() {
        ctx.fillStyle = 'rgba(39, 70, 255, 0.1)';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        // Draw brain outline
        ctx.strokeStyle = '#00C2FF';
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.6;
        
        // Left hemisphere
        ctx.beginPath();
        ctx.ellipse(centerX - 80, centerY, 80, 120, 0, 0, Math.PI * 2);
        ctx.stroke();
        
        // Right hemisphere
        ctx.beginPath();
        ctx.ellipse(centerX + 80, centerY, 80, 120, 0, 0, Math.PI * 2);
        ctx.stroke();
        
        // Neural connections (animated)
        ctx.strokeStyle = `rgba(46, 75, 255, ${0.5 + 0.3 * Math.sin(rotation / 30)})`;
        ctx.lineWidth = 1;
        
        for (let i = 0; i < 20; i++) {
            const angle = (i / 20) * Math.PI * 2 + rotation / 100;
            const x1 = centerX + Math.cos(angle) * 100;
            const y1 = centerY + Math.sin(angle) * 100;
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x1, y1);
            ctx.stroke();
        }
        
        ctx.globalAlpha = 1;
    }
    
    function animate() {
        drawBrain();
        
        // Update and draw particles
        for (let i = particlesArray.length - 1; i >= 0; i--) {
            particlesArray[i].update();
            particlesArray[i].draw(ctx);
            
            if (particlesArray[i].life <= 0) {
                particlesArray.splice(i, 1);
            }
        }
        
        // Add new particles
        if (Math.random() < 0.3) {
            particlesArray.push(new BrainParticle());
        }
        
        rotation += 0.5;
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Initialize all brain canvases on page load
document.addEventListener('DOMContentLoaded', () => {
    initBrainCanvas('brainCanvas');
    initBrainCanvas('brainVisualizerCanvas');
    initBrainCanvas('neuralCanvas');
    
    console.log('[v0] 3D Brain visualization initialized');
});
