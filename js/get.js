const cardsContainer = document.querySelector('.content');
const baseData = 'https://66173e3eed6b8fa434823b5c.mockapi.io/gotdata/v1/GreatHouses';


//      GET GREAT HOUSES DATA

const getGreatHouses = (fetchUrl) => {
    fetch(fetchUrl)
        .then(res => res.json())
        .then(data => createCardHouses(data))
        .catch(err => renderError(err))
}

const createCardHouses = (houses) => {
    cardsContainer.innerHTML= '';
    setStyleFlex(document.getElementById('render-spinner'));
    setTimeout (() => {
        setStyleNone(document.getElementById('render-spinner'));
        houses.forEach(house => {
            const { HouseName, Sigil, id, Motto,} = house;
            cardsContainer.innerHTML += `
            <div class="house-card">
                <h2>${HouseName}</h2>
                <img src="${Sigil}" alt="${HouseName} Sigil">
                <h3>${Motto}</h3>
                <button class="view_characters_btn" data-cardid="${id}">
                    <i class="fa-solid fa-arrow-right-to-bracket"></i>
                    <span>View characters</span>
                </button>
            </div>
            `;
        });
        viewHouseCharacters(document.querySelectorAll(".view_characters_btn"));
    }, 2000)
};

const viewHouseCharacters = (btns) => {
    btns.forEach((btn) =>
      btn.addEventListener("click", () => {
        getHouseCharacters(btn.dataset.cardid);
        //getDetalleAlumna(btn.getAttribute("data-cardid"));
      })
    );
};