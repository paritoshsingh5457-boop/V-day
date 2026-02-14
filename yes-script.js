// confetti animation logic

function startConfetti() {
    const colors = ['#FF0B00', '#FFB800', '#1BCC00', '#00E1FF', '#0052FF'];
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    document.body.appendChild(canvas);

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    function createParticle() {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 5 + 1;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push({ x, y, radius, color, angle: Math.random() * 2 * Math.PI });
    }

    function updateParticles() {
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.y -= Math.cos(p.angle) * 2;
            p.x += Math.sin(p.angle) * 2;
            if (p.y < 0 || p.x < 0 || p.x > canvas.width) {
                particles.splice(i, 1);
                i--;
            }
        }
    }

    function drawParticles() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            context.beginPath();
            context.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
            context.fillStyle = p.color;
            context.fill();
            context.closePath();
        });
    }

    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }

    setInterval(createParticle, 100);
    animate();
}

// Start confetti animation
startConfetti();
