AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

window.addEventListener('scroll', function() {
    var winScroll = document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    var progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
    
    var navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    var sections = document.querySelectorAll('section');
    var navLinks = document.querySelectorAll('.nav-links a');
    
    var current = '';
    sections.forEach(function(section) {
        var sectionTop = section.offsetTop;
        var sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

var menuBtn = document.querySelector('.menu-btn');
var navLinks = document.querySelector('.nav-links');

if (menuBtn) {
    menuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        var icon = menuBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });
}

document.querySelectorAll('.nav-links a').forEach(function(link) {
    link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        var icon = menuBtn ? menuBtn.querySelector('i') : null;
        if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });
});

document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        var target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

var counters = document.querySelectorAll('.stat-number');
var counted = false;

function animateCounters() {
    counters.forEach(function(counter) {
        var target = parseInt(counter.getAttribute('data-count'));
        var current = 0;
        var increment = target / 50;
        
        function updateCount() {
            if (current < target) {
                current = Math.ceil(current + increment);
                counter.innerText = current;
                setTimeout(updateCount, 30);
            } else {
                counter.innerText = target;
            }
        }
        updateCount();
    });
}

var statsSection = document.querySelector('.stats-section');
if (statsSection) {
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting && !counted) {
                animateCounters();
                counted = true;
            }
        });
    }, { threshold: 0.3 });
    observer.observe(statsSection);
}

var contactForm = document.getElementById('contactForm');
var modal = document.getElementById('modal');
var closeModal = document.querySelector('.close-modal');
var modalTitle = document.getElementById('modalTitle');
var modalMessage = document.getElementById('modalMessage');

function showModal(title, message) {
    if (modalTitle) modalTitle.innerText = title;
    if (modalMessage) modalMessage.innerText = message;
    if (modal) modal.style.display = 'flex';
    
    setTimeout(function() {
        if (modal) modal.style.display = 'none';
    }, 3000);
}

if (closeModal) {
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
}

window.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var nameInput = document.getElementById('name');
        var name = nameInput ? nameInput.value : 'Гость';
        showModal('Сообщение отправлено', 'Спасибо, ' + name + '! Наш менеджер свяжется с вами в ближайшее время.');
        contactForm.reset();
    });
}

var newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        showModal('Подписка оформлена', 'Спасибо за подписку! Мы будем присылать вам свежие статьи и новости.');
        newsletterForm.reset();
    });
}

document.querySelectorAll('.service-link, .read-more').forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        showModal('В разработке', 'Этот раздел будет доступен в ближайшее время.');
    });
});

var shapes = document.querySelectorAll('.shape');
window.addEventListener('scroll', function() {
    shapes.forEach(function(shape, index) {
        var speed = 0.3 + (index * 0.1);
        shape.style.transform = 'translateY(' + (window.scrollY * speed) + 'px)';
    });
});

var cards = document.querySelectorAll('.service-card, .case-card, .blog-card');
var cardObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

cards.forEach(function(card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    cardObserver.observe(card);
});