//      START APP

initializeApp();

//      RESPONSIVE DESIGN

darkModeToggle.addEventListener('click', toggleDarkMode);

document.getElementById('hamb-menu').addEventListener('click', toggleMobileNav)

document.getElementById('go-home-btn').addEventListener('click', () => {getGreatHouses(baseData)});

document.getElementById('add-house').addEventListener('click', () => {
    generateFormNewHouse()
    toggleMobileNav()
});