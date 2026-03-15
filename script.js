document.addEventListener('DOMContentLoaded', function () {
    // ===== DARK MODE TOGGLE =====
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Check local storage
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }

    darkModeToggle.addEventListener('change', function () {
        if (this.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });

    // ===== MOBILE MENU TOGGLE =====
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn) {
        menuBtn.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            this.classList.toggle('close');
        });
    }

    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (menuBtn) menuBtn.classList.remove('close');
                }
            }
        });
    });

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===== BACK TO TOP BUTTON =====
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    // ===== SCROLL ANIMATIONS =====
    const animatedElements = document.querySelectorAll('.animate');
    function checkScrollAnimations() {
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top < windowHeight - 100) {
                el.classList.add('show');
            }
        });
    }
    window.addEventListener('scroll', checkScrollAnimations);
    checkScrollAnimations();

    // ===== SKILL BARS ANIMATION =====
    const skillBars = document.querySelectorAll('.skill-bar');
    let skillsAnimated = false;

    function animateSkillBars() {
        if (skillsAnimated) return;
        const skillsSection = document.querySelector('.skills');
        if (!skillsSection) return;
        const rect = skillsSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight - 150) {
            skillBars.forEach(bar => {
                const percent = bar.getAttribute('data-percent');
                const progressDiv = bar.querySelector('.progress');
                if (progressDiv && percent) {
                    progressDiv.style.width = '0%';
                    setTimeout(() => {
                        progressDiv.style.width = percent + '%';
                    }, 80);
                }
            });
            skillsAnimated = true;
        }
    }

    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars();

    // ===== PROJECT CARD HOVER EFFECT =====
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const img = card.querySelector('.project-image img');
        if (!img) return;
        card.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.05)';
        });
        card.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });

    // ===== CONTRIBUTION GRAPH (MOCK) =====
    const grid = document.getElementById('contributionGrid');
    if (grid) {
        for (let i = 0; i < 52 * 7; i++) {
            const cell = document.createElement('div');
            const level = Math.floor(Math.random() * 5); // 0-4
            if (level > 0) cell.classList.add(`level-${level}`);
            grid.appendChild(cell);
        }
    }

    // ===== CONTACT FORM =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thank you for your message! (Demo form)');
            this.reset();
        });
    }
});
