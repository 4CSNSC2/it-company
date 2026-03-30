// ========== ИНИЦИАЛИЗАЦИЯ АНИМАЦИЙ ==========
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// ========== ПАНЕЛЬ ПРОГРЕССА ПРОКРУТКИ ==========
window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
    
    // Изменение навигации при скролле
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Подсветка активного пункта меню
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========== МОБИЛЬНОЕ МЕНЮ ==========
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });
}

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuBtn?.querySelector('i');
        if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });
});

// ========== ПЛАВНАЯ ПРОКРУТКА ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== АНИМАЦИЯ СЧЕТЧИКОВ ==========
const counters = document.querySelectorAll('.stat-number');
let counted = false;

const animateCounters = () => {
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        let current = 0;
        const increment = target / 50;
        
        const updateCount = () => {
            if (current < target) {
                current = Math.ceil(current + increment);
                counter.innerText = current;
                setTimeout(updateCount, 30);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

// Запуск счетчиков при появлении секции
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                animateCounters();
                counted = true;
            }
        });
    }, { threshold: 0.3 });
    observer.observe(statsSection);
}

// ========== ОБРАБОТКА ФОРМЫ ОБРАТНОЙ СВЯЗИ ==========
const contactForm = document.getElementById('contactForm');
const modal = document.getElementById('modal');
const closeModal = document.querySelector('.close-modal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');

function showModal(title, message) {
    if (modalTitle) modalTitle.innerText = title;
    if (modalMessage) modalMessage.innerText = message;
    if (modal) modal.style.display = 'flex';
    
    setTimeout(() => {
        if (modal) modal.style.display = 'none';
    }, 3000);
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name')?.value || 'Гость';
        showModal('Сообщение отправлено!', `Спасибо, ${name}! Наш менеджер свяжется с вами в ближайшее время. (Демо-режим)`);
        contactForm.reset();
    });
}

// ========== ПОДПИСКА НА НОВОСТИ ==========
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showModal('Подписка оформлена!', 'Спасибо за подписку! Мы будем присылать вам свежие статьи и новости.');
        newsletterForm.reset();
    });
}

// ========== ДЕМО-ССЫЛКИ ==========
document.querySelectorAll('.service-link, .read-more').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        showModal('В разработке', 'Этот раздел будет доступен в ближайшее время. Следите за обновлениями!');
    });
});

// ========== ПАРАЛЛАКС ЭФФЕКТ ==========
const shapes = document.querySelectorAll('.shape');
window.addEventListener('scroll', () => {
    shapes.forEach((shape, index) => {
        const speed = 0.3 + (index * 0.1);
        shape.style.transform = `translateY(${window.scrollY * speed}px)`;
    });
});

// ========== АНИМАЦИЯ ПОЯВЛЕНИЯ КАРТОЧЕК ==========
const cards = document.querySelectorAll('.service-card, .case-card, .blog-card');
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    cardObserver.observe(card);
});

// ========== ПРИВЕТСТВИЕ В КОНСОЛИ ==========
console.log('%c🚀 NEXUSTECH | IT-компания будущего', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%cСайт готов к работе! Команда может дорабатывать контент.', 'color: #8b5cf6; font-size: 12px;');