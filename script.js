// Particles Animation
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        
        // Random animation duration
        const duration = Math.random() * 20 + 10;
        particle.style.animationDuration = `${duration}s`;
        
        // Random delay
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Service cards animation - simples e elegante
function animateServiceCards() {
    const cards = document.querySelectorAll('.service-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.parentElement.querySelectorAll('.service-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate');
                    }, index * 150);
                });
            }
        });
    }, { threshold: 0.1 });

    const servicesGrid = document.querySelector('.services-grid');
    if (servicesGrid) {
        observer.observe(servicesGrid);
    }
}

// Animação de texto aparecendo letra por letra
function typewriterEffect() {
    const titles = document.querySelectorAll('.section-title');
    
    titles.forEach((title, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const text = title.textContent;
                    title.textContent = '';
                    title.style.opacity = '1';
                    
                    let charIndex = 0;
                    const speed = 50;
                    
                    function type() {
                        if (charIndex < text.length) {
                            title.textContent += text.charAt(charIndex);
                            charIndex++;
                            setTimeout(type, speed);
                        }
                    }
                    
                    setTimeout(type, 500);
                    observer.unobserve(title);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(title);
    });
}

// Parallax effect for hero section (apenas desktop)
function parallaxEffect() {
    if (window.innerWidth <= 768) return;
    
    const hero = document.querySelector('.hero');
    
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const moveX = (mouseX - 0.5) * 30;
        const moveY = (mouseY - 0.5) * 30;
        
        const logoIcon = document.querySelector('.logo-icon');
        if (logoIcon) {
            logoIcon.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
}

// Typing effect for hero subtitle
function typingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    
    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.opacity = '1';
    
    let index = 0;
    const speed = 50;
    
    function type() {
        if (index < text.length) {
            subtitle.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    setTimeout(type, 1000);
}

// Add glitch effect to logo on hover
function glitchEffect() {
    const logoText = document.querySelector('.logo-text');
    if (!logoText) return;
    
    logoText.addEventListener('mouseenter', () => {
        logoText.style.animation = 'glitch 0.3s infinite';
    });
    
    logoText.addEventListener('mouseleave', () => {
        logoText.style.animation = 'none';
    });
}

// Add CSS for glitch animation
const style = document.createElement('style');
style.textContent = `
    @keyframes glitch {
        0% {
            transform: translate(0);
        }
        20% {
            transform: translate(-2px, 2px);
        }
        40% {
            transform: translate(-2px, -2px);
        }
        60% {
            transform: translate(2px, 2px);
        }
        80% {
            transform: translate(2px, -2px);
        }
        100% {
            transform: translate(0);
        }
    }
`;
document.head.appendChild(style);

// Service cards hover effect with 3D tilt (apenas desktop)
function cardTiltEffect() {
    if (window.innerWidth <= 768) return;
    
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = counter.textContent;
                const isPercentage = target.includes('%');
                const number = parseInt(target.replace(/\D/g, ''));
                
                let current = 0;
                const increment = number / 50;
                const duration = 2000;
                const stepTime = duration / 50;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        counter.textContent = isPercentage ? `${number}%` : `${number}+`;
                        clearInterval(timer);
                    } else {
                        counter.textContent = isPercentage ? `${Math.floor(current)}%` : `${Math.floor(current)}+`;
                    }
                }, stepTime);
                
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// Cursor trail effect (apenas desktop)
function cursorTrail() {
    // Apenas em desktop
    if (window.innerWidth <= 768) return;
    
    const trail = [];
    const trailLength = 20;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.style.position = 'fixed';
        dot.style.width = '4px';
        dot.style.height = '4px';
        dot.style.background = '#00ff88';
        dot.style.borderRadius = '50%';
        dot.style.pointerEvents = 'none';
        dot.style.zIndex = '9999';
        dot.style.opacity = (trailLength - i) / trailLength;
        dot.style.transition = 'all 0.3s ease';
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateTrail() {
        trail.forEach((dot, index) => {
            const next = trail[index + 1] || { offsetLeft: mouseX, offsetTop: mouseY };
            dot.style.left = `${next.offsetLeft}px`;
            dot.style.top = `${next.offsetTop}px`;
        });
        
        trail[0].style.left = `${mouseX}px`;
        trail[0].style.top = `${mouseY}px`;
        
        requestAnimationFrame(updateTrail);
    }
    
    updateTrail();
}

// Scroll progress indicator (desabilitado no mobile)
function scrollProgress() {
    // Apenas em desktop
    if (window.innerWidth > 768) {
        const progress = document.createElement('div');
        progress.style.position = 'fixed';
        progress.style.top = '0';
        progress.style.left = '0';
        progress.style.width = '0%';
        progress.style.height = '3px';
        progress.style.background = 'linear-gradient(90deg, #00ff88 0%, #0066ff 100%)';
        progress.style.zIndex = '10000';
        progress.style.transition = 'width 0.1s ease';
        document.body.appendChild(progress);
        
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progress.style.width = `${scrolled}%`;
        });
    }
}

// Tech badges floating animation
function floatingBadges() {
    const badges = document.querySelectorAll('.tech-badge');
    
    badges.forEach((badge, index) => {
        const delay = index * 200;
        const duration = 3000 + Math.random() * 2000;
        
        setInterval(() => {
            badge.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                badge.style.transform = 'translateY(0)';
            }, duration / 2);
        }, duration);
    });
}

// WhatsApp button animation
function whatsappAnimation() {
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (!whatsappBtn) return;
    
    // Pulse animation
    setInterval(() => {
        whatsappBtn.style.transform = 'scale(1.1)';
        setTimeout(() => {
            whatsappBtn.style.transform = 'scale(1)';
        }, 300);
    }, 3000);
}

// Service card icon animation on hover
function iconAnimation() {
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
        const icon = card.querySelector('.service-icon');
        
        card.addEventListener('mouseenter', () => {
            icon.style.animation = 'iconBounce 0.6s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            icon.style.animation = 'none';
        });
    });
    
    // Add keyframe animation
    const iconStyle = document.createElement('style');
    iconStyle.textContent = `
        @keyframes iconBounce {
            0%, 100% { transform: translateY(0); }
            25% { transform: translateY(-10px) rotate(5deg); }
            50% { transform: translateY(0) rotate(-5deg); }
            75% { transform: translateY(-5px) rotate(3deg); }
        }
    `;
    document.head.appendChild(iconStyle);
}

// Loading animation
function loadingAnimation() {
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
}

// Form submission to WhatsApp
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Animação quando o formulário aparece na tela
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    observer.observe(form);

    // Máscara para telefone
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        
        if (value.length > 6) {
            value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
        } else if (value.length > 2) {
            value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else if (value.length > 0) {
            value = `(${value}`;
        }
        
        e.target.value = value;
    });

    // Submit do formulário
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Pegar valores do formulário
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;

        // Formatar mensagem para WhatsApp
        const whatsappMessage = `
*📋 Nova Solicitação de Orçamento*

*👤 Nome:* ${name}
*📧 Email:* ${email}
*📱 WhatsApp:* ${phone}
*🔧 Serviço:* ${service}

*💬 Detalhes do Projeto:*
${message}

---
_Enviado via site Sandro.ai_
        `.trim();

        // Codificar mensagem para URL
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // Número do WhatsApp (substitua pelo seu número)
        const whatsappNumber = '5521987303639'; // ALTERE AQUI!

        // URL do WhatsApp
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Feedback visual
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor" style="animation: spin 1s linear infinite;">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"/>
            </svg>
            Abrindo WhatsApp...
        `;
        submitBtn.disabled = true;

        // Adicionar animação de spin
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        // Abrir WhatsApp
        setTimeout(() => {
            window.open(whatsappURL, '_blank');
            
            // Resetar botão
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Resetar formulário
                form.reset();
                
                // Mensagem de sucesso
                alert('✅ Formulário enviado! Você será redirecionado para o WhatsApp.');
            }, 1000);
        }, 1500);
    });
}

// Initialize all functions when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    animateServiceCards();
    typewriterEffect();
    animateStatItems();
    parallaxEffect();
    // typingEffect(); // Descomente se quiser o efeito de digitação
    glitchEffect();
    cardTiltEffect();
    animateCounters();
    cursorTrail();
    scrollProgress();
    floatingBadges();
    whatsappAnimation();
    iconAnimation();
    loadingAnimation();
    setupContactForm();
});

// Animação dos stat items
function animateStatItems() {
    const statItems = document.querySelectorAll('.stat-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 150);
            }
        });
    }, { threshold: 0.1 });

    statItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px) scale(0.9)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
}

// Prevent right-click on images (optional security)
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// Add smooth reveal effect for sections
const revealSections = () => {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 1s ease';
        observer.observe(section);
    });
};

// Call reveal sections
document.addEventListener('DOMContentLoaded', revealSections);

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            particle.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
        });
        
        alert('🎉 Código secreto ativado! Modo Rainbow! 🌈');
    }
});

console.log('%c👨‍💻 Sandro.ai', 'font-size: 24px; font-weight: bold; color: #00ff88;');
console.log('%c🚀 Desenvolvido com paixão e tecnologia', 'font-size: 14px; color: #a0a0b0;');
console.log('%cInteressado em trabalhar juntos? Entre em contato!', 'font-size: 12px; color: #0066ff;');
