const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

const menuButton = document.querySelector('.menu-button');
const menuItems = document.querySelector('.menu-items');
let isOpen = false;

menuButton.addEventListener('click', () => {
    isOpen = !isOpen;
    if (isOpen) {
        menuButton.style.transform = 'translate(-50%, -50%) scale(1.2)';
        menuButton.style.boxShadow = '0 20px 30px rgba(108, 99, 255, 0.5)';
        menuItems.style.animationPlayState = 'paused';
        
        document.querySelectorAll('.menu-item').forEach((item, index) => {
            const angle = (index * 90) * (Math.PI / 180);
            const x = Math.cos(angle) * 150;
            const y = Math.sin(angle) * 150;
            item.style.transform = `translate(${x}px, ${y}px) scale(1.2)`;
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    } else {
        menuButton.style.transform = 'translate(-50%, -50%)';
        menuButton.style.boxShadow = '0 10px 20px rgba(108, 99, 255, 0.3)';
        menuItems.style.animationPlayState = 'running';
        
        document.querySelectorAll('.menu-item').forEach((item, index) => {
            const positions = [
                'translate(120px, 0)',
                'translate(0, -120px)',
                'translate(-120px, 0)',
                'translate(0, 120px)'
            ];
            item.style.transform = positions[index];
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    }
});


const dragScrollContainer = document.querySelector('.drag-scroll-container');
let isDragging = false;
let startX, scrollLeft;

dragScrollContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - dragScrollContainer.offsetLeft;
    scrollLeft = dragScrollContainer.scrollLeft;
    dragScrollContainer.style.cursor = 'grabbing';
});

dragScrollContainer.addEventListener('mouseleave', () => {
    isDragging = false;
    dragScrollContainer.style.cursor = 'grab';
});

dragScrollContainer.addEventListener('mouseup', () => {
    isDragging = false;
    dragScrollContainer.style.cursor = 'grab';
});

dragScrollContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - dragScrollContainer.offsetLeft;
    const walk = (x - startX) * 2; 
    dragScrollContainer.scrollLeft = scrollLeft - walk;
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

function revealOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .team-member, .section-title');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('visible');
        } else {
            element.classList.remove('visible');
        }
    });
}

const ctaButtons = document.querySelectorAll('.cta-btn');

ctaButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.classList.add('pulse');
    });
    
    button.addEventListener('mouseleave', () => {
        button.classList.remove('pulse');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    const circularMenu = document.querySelector('.circular-menu');
    
    setTimeout(() => {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 300);
    
    setTimeout(() => {
        circularMenu.style.opacity = '1';
        circularMenu.style.transform = 'translateY(0) scale(1)';
    }, 700);
    
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .hero-content, .circular-menu {
                opacity: 0;
                transition: all 1s ease;
            }
            
            .hero-content {
                transform: translateY(30px);
            }
            
            .circular-menu {
                transform: translateY(30px) scale(0.8);
            }
            
            .feature-card, .team-member, .section-title {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.8s ease;
            }
            
            .feature-card.visible, .team-member.visible, .section-title.visible {
                opacity: 1;
                transform: translateY(0);
            }
        </style>
    `);
}); 