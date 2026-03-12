// ===== FLOATING PIXEL PARTICLES =====
function createPixelParticles() {
    const colors = ['#1e3a5f', '#4e73a1', '#27c93f', '#ffbd2e', '#ff5f56'];
    for (let i = 0; i < 25; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel-particle');
        pixel.style.left = Math.random() * 100 + 'vw';
        pixel.style.width = (Math.random() * 6 + 3) + 'px';
        pixel.style.height = pixel.style.width;
        pixel.style.background = colors[Math.floor(Math.random() * colors.length)];
        pixel.style.animationDuration = (Math.random() * 15 + 10) + 's';
        pixel.style.animationDelay = (Math.random() * 10) + 's';
        document.body.appendChild(pixel);
    }
}

// ===== TWINKLING STARS =====
function createStars() {
    for (let i = 0; i < 15; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        star.style.animationDelay = (Math.random() * 5) + 's';
        document.body.appendChild(star);
    }
}

// ===== TYPING EFFECT =====
function startTyping() {
    setTimeout(() => {
        document.getElementById('typingTitle').classList.add('active');
    }, 800);
}

// ===== INTERSECTION OBSERVER FOR ENTRANCE ANIMATIONS =====
function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-in, .slide-left, .slide-right').forEach(el => {
        observer.observe(el);
    });
}

// ===== ANIMATE LANGUAGE BARS =====
function animateLanguageBars() {
    setTimeout(() => {
        document.querySelectorAll('.lang-bar-fill').forEach(bar => {
            bar.classList.add('animated');
        });
    }, 1500);
}

// ===== TIMELINE ANIMATION =====
function animateTimeline() {
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const solid = entry.target.querySelector('.line-solid');
                const dotted = entry.target.querySelector('.line-dotted');
                const events = entry.target.querySelectorAll('.event');
                
                if (solid) solid.classList.add('drawn');
                if (dotted) dotted.classList.add('drawn');

                events.forEach((evt, i) => {
                    setTimeout(() => {
                        evt.classList.add('pop-in');
                    }, 800 + (i * 400));
                });

                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.timeline').forEach(el => {
        timelineObserver.observe(el);
    });
}

// ===== MOUSE TRAIL EFFECT (subtle pixel trail) =====
let trailTimeout;
document.addEventListener('mousemove', (e) => {
    clearTimeout(trailTimeout);
    trailTimeout = setTimeout(() => {
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            width: 4px;
            height: 4px;
            background: #4e73a1;
            pointer-events: none;
            z-index: 9998;
            opacity: 0.6;
            transition: all 0.8s ease;
        `;
        document.body.appendChild(trail);
        
        requestAnimationFrame(() => {
            trail.style.opacity = '0';
            trail.style.transform = `translate(${(Math.random()-0.5)*30}px, ${(Math.random()-0.5)*30}px) scale(0)`;
        });
        
        setTimeout(() => trail.remove(), 800);
    }, 30);
});

// ===== KONAMI CODE EASTER EGG =====
let konamiCode = [];
const konamiSequence = [38,38,40,40,37,39,37,39,66,65];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > 10) konamiCode.shift();
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.animation = 'none';
        document.body.style.filter = 'hue-rotate(0deg)';
        
        let hue = 0;
        const rainbow = setInterval(() => {
            hue = (hue + 2) % 360;
            document.querySelector('.window').style.filter = `hue-rotate(${hue}deg)`;
        }, 50);
        
        setTimeout(() => {
            clearInterval(rainbow);
            document.querySelector('.window').style.filter = 'none';
        }, 5000);
    }
});

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    createPixelParticles();
    createStars();
    startTyping();
    setupIntersectionObserver();
    animateLanguageBars();
    animateTimeline();
});
