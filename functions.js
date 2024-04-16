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
    
    navItems.classList.toggle('open');

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
        document.getElementById('render-spinner').style.filter = 'invert(1)';
    } else {
        document.body.classList.remove('darkmode');
        document.getElementById('darkmode-btn-description').innerHTML = `Dark Mode`
        document.getElementById('render-spinner').style.filter = 'none';
    }
    localStorage.setItem('darkMode', darkMode);
}

//      CHANGE CARD BORDER 

const setInnerShadowColor = (element, color) => {
    element.style.boxShadow = `inset 0 0 5px 4px ${color}`;
}
