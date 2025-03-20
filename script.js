// Маппинг технологий на иконки
const techIcons = {
    'HTML5': 'fab fa-html5',
    'CSS3': 'fab fa-css3-alt',
    'JavaScript': 'fab fa-js-square',
    'React': 'fab fa-react',
    'Node.js': 'fab fa-node',
    'MongoDB': 'fas fa-database'
};

// Основная функция инициализации
document.addEventListener('DOMContentLoaded', () => {
    // Загрузка темы
    loadTheme();

    // Генерация проектов
    renderProjects();

    // Инициализация формы
    initContactForm();

    // Инициализация переключателя темы
    initThemeSwitcher();
});

// Загрузка сохраненной темы
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.querySelector('.theme-switcher i').className = 'fas fa-sun';
    }
}

// Рендеринг проектов
function renderProjects() {
    const projects = [
        {
            title: 'Блог "Мир Вдохновения"',
            description: 'Платформа для статей о путешествиях',
            tech: ['HTML5', 'CSS3', 'JavaScript'],
            image: 'images/blog-thumb.jpg',
            link: 'projects/blog-mir-vdohnoveniya.html'
        },
        {
            title: 'Магазин бытовой техники',
            description: 'Лендинг для интернет-магазина',
            tech: ['HTML5', 'CSS3', 'JavaScript'],
            image: 'images/store-thumb.jpg',
            link: 'projects/magazin-bytovoy-produktsii.html'
        },
        {
            title: 'Почтовый клиент',
            description: 'Управление электронной почтой',
            tech: ['HTML5', 'CSS3', 'JavaScript'],
            image: 'images/mailbox-thumb.jpg',
            link: 'projects/lichnyy-pochtovyy-yashchik.html'
        }
    ];

    const container = document.querySelector('.projects');

    projects.forEach(project => {
        const card = document.createElement('article');
        card.className = 'project-card';
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}" loading="lazy">
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tech-stack">
                    ${generateTechBadges(project.tech)}
                </div>
                <a href="${project.link}" class="project-link">Подробнее</a>
            </div>
        `;
        container.appendChild(card);
    });
}

// Генерация технологических баджей
function generateTechBadges(techArray) {
    return techArray.map(tech => {
        const iconClass = techIcons[tech] || 'fas fa-code';
        return `
            <div class="tech-badge">
                <i class="${iconClass}"></i>
                <span>${tech}</span>
            </div>
        `;
    }).join('');
}

// Инициализация формы обратной связи
function initContactForm() {
    const form = document.getElementById('contactForm');
    const alertBox = document.getElementById('alert');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');

        // Показать лоадер
        toggleLoader(btn, true);

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                form.reset();
                showAlert(alertBox, 'Сообщение успешно отправлено!', 'success');
            } else {
                throw new Error('Ошибка сервера');
            }
        } catch (error) {
            showAlert(alertBox, 'Ошибка отправки. Попробуйте снова.', 'error');
        } finally {
            toggleLoader(btn, false);
        }
    });
}

// Управление лоадером
function toggleLoader(button, isLoading) {
    button.disabled = isLoading;
    button.querySelector('.btn-text').style.opacity = isLoading ? '0' : '1';
    button.querySelector('.loader').style.display = isLoading ? 'block' : 'none';
}

// Показать уведомление
function showAlert(container, message, type) {
    container.textContent = message;
    container.className = `alert ${type}`;
    container.style.display = 'block';

    setTimeout(() => {
        container.style.display = 'none';
    }, 3000);
}

// Инициализация переключателя темы
function initThemeSwitcher() {
    const switcher = document.querySelector('.theme-switcher');
    const icon = switcher.querySelector('i');

    switcher.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            icon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        } else {
            icon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        }
    });
}

// Функции для работы с фреймами
window.toggleFrame = (id) => {
    const frame = document.getElementById(id);
    frame.style.display = frame.style.display === 'block' ? 'none' : 'block';
};

window.showSkillInfo = (id) => {
    const frame = document.getElementById(id);
    frame.style.display = 'block';
};

window.hideSkillInfo = (id) => {
    const frame = document.getElementById(id);
    frame.style.display = 'none';
};

// Показ QR-кода
window.showQRCode = () => {
    const qrCode = document.getElementById('qr-code');
    qrCode.style.display = 'block';
};

window.hideQRCode = () => {
    const qrCode = document.getElementById('qr-code');
    qrCode.style.display = 'none';
};