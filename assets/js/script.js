// Кэширрование часто-используемых элементов
const addToCartIcons = document.querySelectorAll('.card-container img');
const cartNotification = document.querySelector('.cart-notification');
const starsContainer = document.querySelector('.stars-container');

let hideNotificationTimeout;

// Функция показа уведомления с использованием requestAnimationFrame
function showCartNotification() {
    cartNotification.classList.remove('show');
    clearTimeout(hideNotificationTimeout);

    requestAnimationFrame(() => {
        cartNotification.classList.add('show');
    });

    hideNotificationTimeout = setTimeout(() => {
        cartNotification.classList.remove('show');
    }, 1500);
}

// Обработчик для каждой иконки корзины
addToCartIcons.forEach(icon => icon.addEventListener('click', showCartNotification));

// Генерация случайного числа
function random_number(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция создания звёзд, отложенная через requestIdleCallback или setTimeout
function createStars(number_of_star = 150) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < number_of_star; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        const starRadius = random_number(1, 3);
        star.style.cssText = `
            top: ${random_number(0, window.innerHeight)}px;
            left: ${random_number(0, window.innerWidth)}px;
            width: ${starRadius}px;
            height: ${starRadius}px;
            animation: twinkle ${random_number(2, 6)}s ease-in-out infinite,
                       moveRandom ${random_number(4, 10)}s ease-in-out infinite alternate;
        `;
        fragment.appendChild(star);
    }
    starsContainer.appendChild(fragment);
}

// Отложенная загрузка звёзд
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => createStars());
} else {
    setTimeout(createStars, 50); // fallback на setTimeout для браузеров, не поддерживающих requestIdleCallback
}

// Reg/Auth - Popup

const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

// Переключение между формами Login и Register
registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

// Открытие popup и блокировка прокрутки
btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
    document.body.style.overflow = 'hidden';
});

// Закрытие popup
iconClose.addEventListener('click', () => {
    wrapper.classList.add('closing');
});

// Убираем класс закрытия и восстанавливаем прокрутку после завершения анимации
wrapper.addEventListener('transitionend', () => {
    if (wrapper.classList.contains('closing')) {
        wrapper.classList.remove('active-popup', 'closing');
        document.body.style.overflow = '';
    }
});
