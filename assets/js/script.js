// Библиотека Flatpickr для выбора дат
src="https://cdn.jsdelivr.net/npm/flatpickr/dist/l10n/ru.js"
    flatpickr("#dateRange", {
    mode: "range",
    dateFormat: "d.m.Y",
    locale: "ru"
});
//

// Липкая шапка / смена фона
const header = document.getElementById('header');
const headerTop = header.offsetTop;

window.addEventListener('scroll', () => {
    if (window.scrollY > headerTop) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
//

// Видео разворачивается на весь экран
function playVideoHandler(e) {
    e.preventDefault();

    const wrapper = document.getElementById("videoWrapper");

    // Сохраняем исходное содержимое, чтобы потом восстановить
    const originalContent = wrapper.innerHTML;

    const iframe = document.createElement("iframe");
    iframe.src = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1";
    iframe.width = "560";
    iframe.height = "315";
    iframe.frameBorder = "0";
    iframe.allow = "autoplay; fullscreen";

    wrapper.innerHTML = "";
    wrapper.appendChild(iframe);

    setTimeout(() => {
        if (iframe.requestFullscreen) {
            iframe.requestFullscreen();
        } else if (iframe.webkitRequestFullscreen) {
            iframe.webkitRequestFullscreen();
        } else if (iframe.msRequestFullscreen) {
            iframe.msRequestFullscreen();
        }
    }, 300);

    function exitHandler() {
        if (
            !document.fullscreenElement &&
            !document.webkitFullscreenElement &&
            !document.msFullscreenElement
        ) {
            // Восстанавливаем сохранённый исходный контент
            wrapper.innerHTML = originalContent;

            // Снова привязываем обработчик клика
            document.getElementById("playVideo").addEventListener("click", playVideoHandler);

            // Убираем слушатели, чтобы избежать утечек
            document.removeEventListener("fullscreenchange", exitHandler);
            document.removeEventListener("webkitfullscreenchange", exitHandler);
            document.removeEventListener("MSFullscreenChange", exitHandler);
        }
    }

    document.addEventListener("fullscreenchange", exitHandler);
    document.addEventListener("webkitfullscreenchange", exitHandler);
    document.addEventListener("MSFullscreenChange", exitHandler);
}

// Привязываем обработчик после загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
    const playBtn = document.getElementById("playVideo");
    if (playBtn) {
        playBtn.addEventListener("click", playVideoHandler);
    }
});

//

//Валидация формы
document.getElementById('form-email').addEventListener('submit', function(e) {
    e.preventDefault(); // не отправляем форму сразу

    const emailInput = document.getElementById('emailInput');
    const emailError = document.getElementById('emailError');

    // Регулярка для проверки email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailInput.value.trim())) {
        emailInput.classList.add('error');
        emailError.textContent = 'Введите корректный e-mail';
    } else {
        emailInput.classList.remove('error');
        emailError.textContent = '';
        // Тут можно отправить форму
        console.log('Email корректный:', emailInput.value);
        this.submit();
    }
});
//

//картинка на весь экран
document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".gallery__image-grid-item");
    let currentIndex = 0;

    // Создаём lightbox
    const lightbox = document.createElement("div");
    lightbox.classList.add("lightbox");
    lightbox.innerHTML = `
    <span class="lightbox-close">&times;</span>
    <span class="lightbox-arrow left">&#10094;</span>
    <img src="" alt="">
    <span class="lightbox-arrow right">&#10095;</span>
  `;
    document.body.appendChild(lightbox);

    const imgEl = lightbox.querySelector("img");
    const closeBtn = lightbox.querySelector(".lightbox-close");
    const arrowLeft = lightbox.querySelector(".lightbox-arrow.left");
    const arrowRight = lightbox.querySelector(".lightbox-arrow.right");

    // Массив ссылок на изображения
    const images = Array.from(items).map(item => item.getAttribute("data-image"));

    function showImage(index) {
        currentIndex = (index + images.length) % images.length; // зацикливание
        imgEl.style.opacity = 0;
        setTimeout(() => {
            imgEl.src = images[currentIndex];
            imgEl.style.opacity = 1;
        }, 150);
    }

    // Клик по картинке
    items.forEach((item, index) => {
        item.addEventListener("click", () => {
            lightbox.classList.add("active");
            showImage(index);
        });
    });

    // Кнопки
    closeBtn.addEventListener("click", () => lightbox.classList.remove("active"));
    arrowLeft.addEventListener("click", () => showImage(currentIndex - 1));
    arrowRight.addEventListener("click", () => showImage(currentIndex + 1));

    // Закрытие по фону
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) lightbox.classList.remove("active");
    });

    // Переключение стрелками на клавиатуре
    document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("active")) return;
        if (e.key === "ArrowLeft") showImage(currentIndex - 1);
        if (e.key === "ArrowRight") showImage(currentIndex + 1);
        if (e.key === "Escape") lightbox.classList.remove("active");
    });
});
//

//гамбургер
const menu = document.querySelector('.gamburger-menu-popup');
const closeBtn = document.querySelector('.gamburger-menu-popup__close');
const burgerBtn = document.querySelector('.header__gamburger');

burgerBtn.addEventListener('click', () => {
    menu.classList.add('active');
    closeBtn.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    menu.classList.remove('active');
    closeBtn.classList.remove('active');
});


//