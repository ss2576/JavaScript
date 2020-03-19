/* Индекс слайда по умолчанию */
let slideIndex = 1;
let loadIcon = document.querySelector('.fa-spinner');
showSlides(slideIndex);
/* Функция увеличивает индекс на 1, показывает следующй слайд*/
function setNextRightImage() {
    showSlides(slideIndex += 1);
}
/* Функция уменьшяет индекс на 1, показывает предыдущий слайд*/
function setNextLeftImage() {
    showSlides(slideIndex -= 1);  
}
/* Устанавливает текущий слайд */
function currentSlide(n) {
    showSlides(slideIndex = n);
}
/* Функция скрывает иконку загрузки */
function hideLoadIcon(loadIcon) {
    loadIcon.style.display = "none";
}
/* Основная функция слайдера */
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("item");
    let dots = document.getElementsByClassName("slider-dots_item");
    
    window.addEventListener('load', function (){
        hideLoadIcon(loadIcon);
    });

    if (n > slides.length) {
      slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace("active", "");
    }
    
    dots[slideIndex - 1].className += " active";
    slides[slideIndex - 1].style.display = "block";
    /* определяем,какая функция вызвала функцию showSlides */
    let callerName = arguments.callee.caller.name;
        
    if (callerName == 'setNextRightImage'){
        slides[slideIndex - 1].classList.add('slider-rightToLeftAnimation');
        setTimeout(() => {
            slides[slideIndex - 1].classList.remove('slider-rightToLeftAnimation');
        }, 450);
    }
    if (callerName == 'setNextLeftImage'){
        slides[slideIndex - 1].classList.add('slider-leftToRightAnimation');
        setTimeout(() => {
            slides[slideIndex - 1].classList.remove('slider-leftToRightAnimation');
        }, 450); 
    }   
}





