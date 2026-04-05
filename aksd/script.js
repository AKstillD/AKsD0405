/* ========================================
   AKstillDreamin Official Project Page
   Interactive JavaScript
======================================== */

// ========================================
// 1. Initialize on DOM Load
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initParticles();
    initScrollAnimations();
    initSmoothScroll();
    initMobileMenu();
    initScrollIndicator();
});

// ========================================
// 2. Navbar Scroll Effect
// ========================================

function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ========================================
// 3. Particle Effect (Canvas)
// ========================================

function initParticles() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
            
            // Random color: gold, cyan, or purple
            const colors = [
                { r: 240, g: 192, b: 64 },  // gold
                { r: 0, g: 212, b: 255 },   // cyan
                { r: 153, g: 69, b: 255 }   // purple
            ];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Wrap around screen
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
            ctx.fill();
            
            // Add glow
            ctx.shadowBlur = 15;
            ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
        }
    }
    
    // Create particles
    function createParticles() {
        const particleCount = Math.min(100, Math.floor(canvas.width / 10));
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    createParticles();
    
    // Connect particles
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    const opacity = (1 - distance / 150) * 0.15;
                    ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        connectParticles();
        
        animationFrameId = requestAnimationFrame(animate);
    }
    
    animate();
    
    // Mouse interaction
    let mouse = { x: null, y: null };
    
    canvas.addEventListener('mousemove', function(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        
        particles.forEach(particle => {
            const dx = mouse.x - particle.x;
            const dy = mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                particle.vx -= dx / distance * 0.05;
                particle.vy -= dy / distance * 0.05;
            }
        });
    });
    
    canvas.addEventListener('mouseleave', function() {
        mouse.x = null;
        mouse.y = null;
    });
}

// ========================================
// 4. Scroll Animations (AOS-like)
// ========================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => observer.observe(el));
}

// ========================================
// 5. Smooth Scroll for Navigation
// ========================================

function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navMenu = document.querySelector('.nav-menu');
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                    }
                }
            }
        });
    });
}

// ========================================
// 6. Mobile Menu Toggle
// ========================================

function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
}

// ========================================
// 7. Scroll Indicator
// ========================================

function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const overviewSection = document.getElementById('overview');
            if (overviewSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = overviewSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
        
        // Hide scroll indicator when scrolled
        window.addEventListener('scroll', function() {
            if (window.scrollY > 200) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }
}

// ========================================
// 8. Member Card Hover Effects
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const memberCards = document.querySelectorAll('.member-card');
    
    memberCards.forEach(card => {
        const color = card.getAttribute('data-color');
        
        if (color) {
            card.addEventListener('mouseenter', function() {
                this.style.borderColor = color;
                this.style.boxShadow = `
                    0 15px 50px rgba(0, 0, 0, 0.3),
                    0 0 40px ${color}40
                `;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                this.style.boxShadow = 'none';
            });
        }
    });
});

// ========================================
// 9. Audio Player Functionality
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const playBtns = document.querySelectorAll('.play-btn');
    let currentAudio = null;
    let currentBtn = null;
    
    playBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const audioId = this.getAttribute('data-audio');
            const audio = document.getElementById(audioId);
            const progressBar = document.getElementById('progress-' + audioId.split('-')[1]);
            const timeDisplay = document.getElementById('time-' + audioId.split('-')[1]);
            
            // Stop other audio if playing
            if (currentAudio && currentAudio !== audio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                if (currentBtn) {
                    currentBtn.classList.remove('playing');
                    currentBtn.innerHTML = '<i class="fas fa-play"></i>';
                }
            }
            
            // Toggle play/pause
            if (audio.paused) {
                audio.play();
                this.classList.add('playing');
                this.innerHTML = '<i class="fas fa-pause"></i>';
                currentAudio = audio;
                currentBtn = this;
            } else {
                audio.pause();
                this.classList.remove('playing');
                this.innerHTML = '<i class="fas fa-play"></i>';
            }
            
            // Update progress bar
            audio.addEventListener('timeupdate', function() {
                const progress = (audio.currentTime / audio.duration) * 100;
                progressBar.style.width = progress + '%';
                
                // Update time display
                const currentMinutes = Math.floor(audio.currentTime / 60);
                const currentSeconds = Math.floor(audio.currentTime % 60);
                const durationMinutes = Math.floor(audio.duration / 60);
                const durationSeconds = Math.floor(audio.duration % 60);
                
                timeDisplay.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')} / ${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
            });
            
            // Reset when ended
            audio.addEventListener('ended', function() {
                btn.classList.remove('playing');
                btn.innerHTML = '<i class="fas fa-play"></i>';
                progressBar.style.width = '0%';
                timeDisplay.textContent = '0:00 / 0:00';
            });
        });
    });
    
    // Progress bar click to seek
    document.querySelectorAll('.progress-container').forEach(container => {
        container.addEventListener('click', function(e) {
            const trackItem = this.closest('.track-item');
            const playBtn = trackItem.querySelector('.play-btn');
            const audioId = playBtn.getAttribute('data-audio');
            const audio = document.getElementById(audioId);
            
            const rect = this.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            const percentage = clickX / width;
            
            audio.currentTime = audio.duration * percentage;
        });
    });
    
    // Volume button (toggle mute)
    document.querySelectorAll('.volume-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const trackItem = this.closest('.track-item');
            const playBtn = trackItem.querySelector('.play-btn');
            const audioId = playBtn.getAttribute('data-audio');
            const audio = document.getElementById(audioId);
            
            audio.muted = !audio.muted;
            
            if (audio.muted) {
                this.innerHTML = '<i class="fas fa-volume-mute"></i>';
                this.style.color = 'var(--color-gray)';
            } else {
                this.innerHTML = '<i class="fas fa-volume-up"></i>';
                this.style.color = '';
            }
        });
    });
});

// ========================================
// 10. Track Play Button Animation (Legacy - Keep for compatibility)
// ========================================

// Legacy code removed - now using audio player functionality

// ========================================
// 11. Parallax Effect on Hero
// ========================================

window.addEventListener('scroll', function() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && window.scrollY < window.innerHeight) {
        const scrolled = window.scrollY;
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 1.5;
    }
});

// ========================================
// 11. Dynamic Background Effect
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.background = 'radial-gradient(circle at center, rgba(153, 69, 255, 0.03), transparent)';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.background = 'none';
        });
    });
});

// ========================================
// 12. Performance Optimization
// ========================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for high-frequency events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimize scroll events
const optimizedScrollHandler = throttle(function() {
    // Custom scroll logic can be added here
}, 100);

window.addEventListener('scroll', optimizedScrollHandler);

// ========================================
// 13. Loading Animation
// ========================================

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Fade in hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 1.5s ease-out';
    }
});

// ========================================
// 14. Easter Egg - Konami Code
// ========================================

(function() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function activateEasterEgg() {
        // Add special effects
        document.body.style.animation = 'rainbow 2s linear infinite';
        
        // Create style for rainbow animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        // Show alert
        setTimeout(() => {
            alert('🎉 You found the secret! AKstillDreamin\' loves you! 🎸');
            document.body.style.animation = 'none';
        }, 2000);
    }
})();

// ========================================
// 15. Console Message
// ========================================

console.log('%c🎸 AKstillDreamin\' 🎸', 'color: #f0c040; font-size: 24px; font-weight: bold; text-shadow: 0 0 10px rgba(240, 192, 64, 0.8);');
console.log('%cNEO HEROES FROM HISTORY. IDOLS FROM THE FUTURE.', 'color: #00d4ff; font-size: 14px; font-weight: bold;');
console.log('%c역사 속 영웅이 미래 아이돌로 귀환하다', 'color: #ffffff; font-size: 12px;');
console.log('%cWe Are Still Dreaming...', 'color: #9945ff; font-size: 12px; font-style: italic;');