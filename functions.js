//      RESPONSIVE DESIGN

const setStyleNone = (element) => {
   element.style.display = 'none';
};

const setStyleFlex = (element) => {
    element.style.display = 'flex';
};

const toggleMobileNav = () => {
    const navItems = document.querySelector('.nav-items');
    const navBtn = document.getElementById('hamb-menu');
    
    // Alternar la clase 'open' en navItems
    navItems.classList.toggle('open');

    // Cambiar el ícono del botón de hamburguesa según el estado del menú
    if (navItems.classList.contains('open')) {
        navBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    } else {
        navBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
};

//    ACTIVATE DARK/LIGHT MODE

let darkMode = localStorage.getItem('darkMode') === 'true';
const darkModeToggle = document.getElementById('btn-darkmode');

const toggleDarkMode = () => {
    darkMode = !darkMode;
    if (darkMode) {
        document.body.classList.add('darkmode');
        document.getElementById('darkmode-btn-description').innerHTML = `Light Mode`
    } else {
        document.body.classList.remove('darkmode');
        document.getElementById('darkmode-btn-description').innerHTML = `Dark Mode`
    }
    localStorage.setItem('darkMode', darkMode);
}