const envelopeContainer = document.getElementById('envelopeContainer');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const successOverlay = document.getElementById('successOverlay');

let isOpen = false;

// Envelope Interaction
envelopeContainer.addEventListener('click', (e) => {
    if (e.target.closest('.btn-group')) return;

    if (!isOpen) {
        envelopeContainer.classList.add('active');
        isOpen = true;
    }
});

// Playful "No" button escape
const moveNoButton = () => {
    if (!isOpen) return;

    const padding = 40;
    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;

    const randomX = Math.max(padding, Math.random() * maxX);
    const randomY = Math.max(padding, Math.random() * maxY);

    noBtn.style.position = 'fixed';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    noBtn.style.zIndex = '9999';
    noBtn.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
};

noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Success Action with MASSIVE confetti
yesBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    successOverlay.classList.remove('hidden');

    // Small delay to ensure overlay renders first
    setTimeout(() => {
        // MASSIVE Initial Explosion
        confetti({
            particleCount: 400,
            spread: 120,
            origin: { y: 0.6 },
            colors: ['#8e7dbb', '#f1e6f3', '#d5c2da', '#ffffff', '#e4d7e8'],
            ticks: 400,
            startVelocity: 50,
            scalar: 1.2
        });

        // Second massive wave
        setTimeout(() => {
            confetti({
                particleCount: 300,
                spread: 140,
                origin: { y: 0.5 },
                colors: ['#8e7dbb', '#f1e6f3', '#d5c2da'],
                ticks: 350,
                startVelocity: 45
            });
        }, 80);

        // Side explosions
        setTimeout(() => {
            confetti({
                particleCount: 250,
                angle: 60,
                spread: 90,
                origin: { x: 0, y: 0.7 },
                colors: ['#8e7dbb', '#f1e6f3', '#ffffff'],
                startVelocity: 55
            });
            confetti({
                particleCount: 250,
                angle: 120,
                spread: 90,
                origin: { x: 1, y: 0.7 },
                colors: ['#8e7dbb', '#f1e6f3', '#ffffff'],
                startVelocity: 55
            });
        }, 150);

        // Center burst
        setTimeout(() => {
            confetti({
                particleCount: 250,
                spread: 130,
                origin: { y: 0.4 },
                colors: ['#8e7dbb', '#d5c2da', '#ffffff'],
                startVelocity: 40
            });
        }, 300);

        // Extra burst
        setTimeout(() => {
            confetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.5 },
                colors: ['#e4d7e8', '#f1e6f3', '#ffffff']
            });
        }, 500);

        // INTENSE continuous rain
        const duration = 7 * 1000;
        const end = Date.now() + duration;

        (function frame() {
            // Left side
            confetti({
                particleCount: 10,
                angle: 60,
                spread: 80,
                origin: { x: 0 },
                colors: ['#8e7dbb', '#f1e6f3', '#d5c2da'],
                ticks: 200
            });

            // Right side
            confetti({
                particleCount: 10,
                angle: 120,
                spread: 80,
                origin: { x: 1 },
                colors: ['#8e7dbb', '#f1e6f3', '#d5c2da'],
                ticks: 200
            });

            // Top center - frequent bursts
            if (Math.random() > 0.2) {
                confetti({
                    particleCount: 8,
                    spread: 120,
                    origin: { y: 0.2, x: 0.5 },
                    colors: ['#ffffff', '#f1e6f3', '#e4d7e8']
                });
            }

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }, 100);
});
