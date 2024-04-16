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
        document.getElementById('render-spinner').style.filter = 'none';
    } else {
        document.body.classList.remove('darkmode');
        document.getElementById('darkmode-btn-description').innerHTML = `Dark Mode`
        document.getElementById('render-spinner').style.filter = 'invert(1)';
    }
    localStorage.setItem('darkMode', darkMode);
}

//      CHANGE CARD SHADOW 

const setInnerShadowColor = (element, color) => {
    element.style.boxShadow = `inset 0 0 5px 4px ${color}`;
}

//      RENDER ERROR

const renderError = (errorDetail, callFunction) => {
    const errorContainer = document.getElementById('warning-container');
    setStyleFlex(errorContainer);

    errorContainer.innerHTML += `
        <div> 
            <i class="fa-solid fa-circle-exclamation"></i>
            <h3>Error</h3>
        </div>
        <div>
            <p>Ups! Something went wrong.</p>
        </div>
        <div>
            <p>Error details:</p>
            <p>${errorDetail}</p>
        </div>
        <div>
            <p>Please, try again later.</p>
        </div>
        <div>
            <button class="negative-btn" id="close-error">
                <i class="fa-solid fa-arrow-left"></i>
                <span>Go back</span>
            </button>
        </div>
    `

    const closeError = document.getElementById('close-error')
    closeError.addEventListener('click', () => {
        setStyleNone(errorContainer);
        callFunction;
    }
)};

//          INITIALIZE APP 

const initializeApp = () => {
    getGreatHouses(baseData);
}
