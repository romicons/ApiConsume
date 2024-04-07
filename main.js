//    ACTIVATE DARK/LIGHT MODE

let darkMode = localStorage.getItem('darkMode') === 'true';
const darkModeToggle = document.getElementById('btn-darkmode');

const toggleDarkMode = () => {
    darkMode = !darkMode;
    if (darkMode) {
        document.body.classList.add('darkmode');
    } else {
        document.body.classList.remove('darkmode');
    }
    localStorage.setItem('darkMode', darkMode);
}

darkModeToggle.addEventListener('click', toggleDarkMode);