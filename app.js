const menuBar = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar_menu');

menuBar.addEventListener('click', function() {
    menuBar.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});