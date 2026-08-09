/**
 * DAKSH JAIN - ULTRA-PREMIUM INTERACTIVE PORTFOLIO ENGINE
 * 7-Layer 3D Infinite Perspective Grid + Cyberpunk Glow
 * Optimized 60 FPS Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // ===== SYSTEM INITIALIZATION =====
    initPreloader();
    init3DGridEngine();
    initParticleEngine();
    initHeroMouseParallax();
    initCustomCursor();
    initTypingEffect();
    initScrollProgress();
    initNavbarScrollSpy();
    initMobileMenu();
    initScrollObserver();
    initStatsCounter();
    initSkillBars();
    init3DTilt();
    initMagneticButtons();
    initRippleEffect();
    initContactForm();
    initBackToTop();
});

/* ===== PRELOADER SCREEN ENGINE ===== */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const progressEl = document.getElementById('preloaderProgress');
    const numEl = document.getElementById('preloaderNum');
    if (!preloader || !progressEl || !numEl) return;

    let count = 0;
    const interval = setInterval(() => {
        count += Math.floor(Math.random() * 12) + 5;
        if (count >= 100) {
            count = 100;
            progressEl.style.width = '100%';
            numEl.textContent = '100';
            clearInterval(interval);

            setTimeout(() => {
                preloader.classList.add('fade-out');
            }, 400);
        } else {
            progressEl.style.width = count + '%';
            numEl.textContent = count;
        }
    }, 40);
}

/* ===== 3D INFINITE PERSPECTIVE GRID CANVAS ENGINE ===== */
function init3DGridEngine() {
    const canvas = document.getElementById('grid-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracking for perspective tilt
    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    window.addEventListener('mousemove', (e) => {
        mouse.targetX = e.clientX;
        mouse.targetY = e.clientY;
    });

    // Grid Parameters
    let speed = 1.2; // Forward movement speed
    let gridOffset = 0;
    let time = 0;

    function drawGrid() {
        ctx.clearRect(0, 0, width, height);

        // Smooth mouse lerp
        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;

        const mouseNormX = (mouse.x / width - 0.5) * 2; // -1 to 1
        const mouseNormY = (mouse.y / height - 0.5) * 2;

        // Horizon line position (~48% height + mouse offset)
        const horizonY = height * 0.48 + mouseNormY * 20;
        const centerX = width * 0.5 + mouseNormX * 40;

        const gridHeight = height - horizonY;
        const fov = 320; // Perspective depth field
        const numLines = 36; // Radial lines radiating outward
        const gridSpacing = 40; // Horizontal line distance step

        // Update infinite speed scroll
        gridOffset = (gridOffset + speed) % gridSpacing;
        time += 0.02;

        ctx.save();

        // --- DRAW RADIAL PERSPECTIVE LINES (Vertical lines spreading to bottom/sides) ---
        for (let i = -numLines; i <= numLines; i++) {
            const spread = (i / (numLines / 2.2)) * (width * 0.9);
            const startX = centerX + (spread * 0.05); // Near horizon convergence
            const endX = centerX + spread * 2.8;       // Spreading at bottom

            // Create gradient line (fades into horizon)
            const lineGrad = ctx.createLinearGradient(startX, horizonY, endX, height);
            lineGrad.addColorStop(0, 'rgba(0, 229, 255, 0)');
            lineGrad.addColorStop(0.2, 'rgba(124, 58, 237, 0.25)');
            lineGrad.addColorStop(0.7, 'rgba(0, 229, 255, 0.55)');
            lineGrad.addColorStop(1, 'rgba(34, 211, 238, 0.85)');

            ctx.strokeStyle = lineGrad;
            ctx.lineWidth = Math.abs(i) % 4 === 0 ? 1.8 : 0.9;
            ctx.shadowBlur = Math.abs(i) % 4 === 0 ? 8 : 3;
            ctx.shadowColor = '#00E5FF';

            ctx.beginPath();
            ctx.moveTo(startX, horizonY);
            ctx.lineTo(endX, height);
            ctx.stroke();
        }

        // --- DRAW HORIZONTAL PERSPECTIVE LINES (Moving towards user) ---
        for (let z = gridOffset; z < gridHeight; z += gridSpacing) {
            // Exponential scale factor for true 3D camera depth
            const progress = z / gridHeight;
            const perspectiveScale = Math.pow(progress, 2.2);
            const currentY = horizonY + perspectiveScale * gridHeight;

            if (currentY > horizonY && currentY <= height) {
                // Line width spreads wider as it gets closer
                const currentWidth = (width * 0.1) + perspectiveScale * (width * 2.2);
                const startX = centerX - currentWidth / 2;
                const endX = centerX + currentWidth / 2;

                // Energy Wave brightness pulse
                const energyPulse = Math.sin(time * 1.5 + progress * 8) * 0.25 + 0.75;
                const opacity = perspectiveScale * 0.7 * energyPulse;

                const horizGrad = ctx.createLinearGradient(startX, currentY, endX, currentY);
                horizGrad.addColorStop(0, 'rgba(0, 229, 255, 0)');
                horizGrad.addColorStop(0.2, `rgba(124, 58, 237, ${opacity * 0.6})`);
                horizGrad.addColorStop(0.5, `rgba(0, 229, 255, ${opacity})`);
                horizGrad.addColorStop(0.8, `rgba(124, 58, 237, ${opacity * 0.6})`);
                horizGrad.addColorStop(1, 'rgba(0, 229, 255, 0)');

                ctx.strokeStyle = horizGrad;
                ctx.lineWidth = 1 + perspectiveScale * 2;
                ctx.shadowBlur = 6 * perspectiveScale;
                ctx.shadowColor = '#00E5FF';

                ctx.beginPath();
                ctx.moveTo(startX, currentY);
                ctx.lineTo(endX, currentY);
                ctx.stroke();
            }
        }

        // --- HORIZON GLOW LINE & FOG MASK ---
        const horizonGrad = ctx.createLinearGradient(0, horizonY - 40, 0, horizonY + 40);
        horizonGrad.addColorStop(0, 'rgba(5, 8, 22, 1)');
        horizonGrad.addColorStop(0.5, 'rgba(0, 229, 255, 0.4)');
        horizonGrad.addColorStop(1, 'rgba(5, 8, 22, 0)');

        ctx.fillStyle = horizonGrad;
        ctx.fillRect(0, horizonY - 40, width, 80);

        ctx.restore();

        requestAnimationFrame(drawGrid);
    }

    drawGrid();
}

/* ===== FLOATING PARTICLES & STARS ENGINE ===== */
function initParticleEngine() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles = [];
    const particleCount = Math.min(Math.floor(width / 15), 75);

    let mouse = { x: width / 2, y: height / 2 };

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.z = Math.random() * 3 + 0.5; // Depth multiplier
            this.vx = (Math.random() - 0.5) * 0.4 * this.z;
            this.vy = (Math.random() - 0.5) * 0.4 * this.z - 0.1; // Gentle float upward
            this.radius = Math.random() * 2 + 0.8;
            this.alpha = Math.random() * 0.6 + 0.2;
            this.pulseSpeed = Math.random() * 0.03 + 0.01;
            const colors = ['#00E5FF', '#7C3AED', '#22D3EE', '#ffffff'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Pulse alpha
            this.alpha += Math.sin(Date.now() * this.pulseSpeed) * 0.01;
            if (this.alpha < 0.1) this.alpha = 0.1;
            if (this.alpha > 0.8) this.alpha = 0.8;

            // Screen wrap
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 12;
            ctx.shadowColor = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * (this.z * 0.6), 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }

        requestAnimationFrame(animate);
    }

    animate();
}

/* ===== HERO INTERACTIVE MOUSE PARALLAX ===== */
function initHeroMouseParallax() {
    const heroContent = document.getElementById('heroParallax');
    if (!heroContent) return;

    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    window.addEventListener('mousemove', (e) => {
        const normX = (e.clientX / window.innerWidth - 0.5) * 2;
        const normY = (e.clientY / window.innerHeight - 0.5) * 2;

        targetX = normX * 12;  // Rotate Y angle
        targetY = -normY * 10; // Rotate X angle
    });

    function updateParallax() {
        mouseX += (targetX - mouseX) * 0.08;
        mouseY += (targetY - mouseY) * 0.08;

        heroContent.style.transform = `perspective(1000px) rotateX(${mouseY}deg) rotateY(${mouseX}deg)`;
        requestAnimationFrame(updateParallax);
    }

    updateParallax();
}

/* ===== CUSTOM CURSOR SPOTLIGHT ===== */
function initCustomCursor() {
    const dot = document.getElementById('cursorDot');
    const glow = document.getElementById('cursorGlow');
    if (!dot || !glow) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX, dotY = mouseY;
    let glowX = mouseX, glowY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function render() {
        dotX += (mouseX - dotX) * 0.3;
        dotY += (mouseY - dotY) * 0.3;

        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;

        dot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
        glow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;

        requestAnimationFrame(render);
    }

    render();

    // Hover scale interactions
    const interactiveElements = document.querySelectorAll('a, button, .glass-card, input, textarea');
    interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
            dot.style.width = '24px';
            dot.style.height = '24px';
            dot.style.backgroundColor = 'var(--secondary)';
        });
        el.addEventListener('mouseleave', () => {
            dot.style.width = '8px';
            dot.style.height = '8px';
            dot.style.backgroundColor = 'var(--secondary)';
        });
    });
}

/* ===== HERO TYPING EFFECT ===== */
function initTypingEffect() {
    const typingEl = document.querySelector('.typing-text');
    if (!typingEl) return;

    const words = JSON.parse(typingEl.getAttribute('data-words') || '[]');
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingEl.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typingEl.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    if (words.length) type();
}

/* ===== SCROLL PROGRESS BAR ===== */
function initScrollProgress() {
    const progressEl = document.getElementById('scrollProgress');
    if (!progressEl) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressEl.style.width = scrollPercent + '%';
    });
}

/* ===== NAVBAR SCROLL EFFECT & SCROLLSPY ===== */
function initNavbarScrollSpy() {
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Sticky background
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link highlighting
        let currentSectionId = '';
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 140;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ===== MOBILE MENU TOGGLE ===== */
function initMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');

    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('close');
    });

    document.querySelectorAll('.nav-link').forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('close');
        });
    });
}

/* ===== INTERSECTION OBSERVER FOR SCROLL REVEAL ===== */
function initScrollObserver() {
    const animatedElements = document.querySelectorAll('.animate');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('show');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach((el) => observer.observe(el));
}

/* ===== ANIMATED STATS COUNTER ===== */
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let counted = false;

    function startCounting() {
        const statsSection = document.querySelector('.stats-grid');
        if (!statsSection) return;

        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80 && !counted) {
            counted = true;

            statNumbers.forEach((stat) => {
                const target = parseInt(stat.getAttribute('data-target') || '0', 10);
                let current = 0;
                const increment = Math.max(1, Math.ceil(target / 35));
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target;
                        clearInterval(timer);
                    } else {
                        stat.textContent = current;
                    }
                }, 35);
            });
        }
    }

    window.addEventListener('scroll', startCounting);
    startCounting();
}

/* ===== ANIMATED SKILL BARS ===== */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    let animated = false;

    function animateProgress() {
        const skillsSection = document.querySelector('.skills-wrapper');
        if (!skillsSection) return;

        const rect = skillsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80 && !animated) {
            animated = true;

            skillBars.forEach((bar) => {
                const percent = bar.getAttribute('data-percent');
                const progress = bar.querySelector('.progress');
                if (progress && percent) {
                    progress.style.width = percent + '%';
                }
            });
        }
    }

    window.addEventListener('scroll', animateProgress);
    animateProgress();
}

/* ===== 3D CARD TILT & GLARE EFFECT ===== */
function init3DTilt() {
    const tiltCards = document.querySelectorAll('[data-tilt]');

    tiltCards.forEach((card) => {
        // Create glare element if not already present
        let glare = card.querySelector('.card-glare');
        if (!glare) {
            glare = document.createElement('div');
            glare.classList.add('card-glare');
            card.appendChild(glare);
        }

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -12;
            const rotateY = ((x - centerX) / centerX) * 12;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

            // Update glare position
            const glareX = (x / rect.width) * 100;
            const glareY = (y / rect.height) * 100;
            glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(0, 229, 255, 0.15) 0%, transparent 60%)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.5s ease';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });
}

/* ===== MAGNETIC BUTTONS EFFECT ===== */
function initMagneticButtons() {
    const magneticEls = document.querySelectorAll('[data-magnetic]');

    magneticEls.forEach((el) => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0px, 0px)';
            el.style.transition = 'transform 0.4s ease';
        });

        el.addEventListener('mouseenter', () => {
            el.style.transition = 'none';
        });
    });
}

/* ===== RIPPLE CLICK EFFECT ===== */
function initRippleEffect() {
    const rippleButtons = document.querySelectorAll('.btn');

    rippleButtons.forEach((btn) => {
        btn.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const circle = document.createElement('span');
            circle.classList.add('ripple');
            circle.style.left = `${x}px`;
            circle.style.top = `${y}px`;

            this.appendChild(circle);

            setTimeout(() => circle.remove(), 600);
        });
    });
}

/* ===== CONTACT FORM VALIDATION & TOAST ===== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const toast = document.getElementById('toastNotification');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;
        const requiredInputs = form.querySelectorAll('[required]');

        requiredInputs.forEach((input) => {
            const group = input.closest('.form-group');
            if (!input.value.trim()) {
                isValid = false;
                if (group) group.classList.add('error');
            } else {
                if (group) group.classList.remove('error');
            }

            if (input.type === 'email' && input.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value.trim())) {
                    isValid = false;
                    if (group) group.classList.add('error');
                }
            }
        });

        if (isValid) {
            // Show toast message
            if (toast) {
                toast.classList.add('show');
                setTimeout(() => toast.classList.remove('show'), 4000);
            }
            form.reset();
        }
    });
}

/* ===== BACK TO TOP BUTTON ===== */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
}
