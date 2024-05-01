const cardsContainer = document.querySelector('.content');
const searchBar = document.getElementById('search-form');
const baseData = 'https://66173e3eed6b8fa434823b5c.mockapi.io/gotdata/v1/GreatHouses';

//      GET GREAT HOUSES DATA

const getGreatHouses = (fetchUrl) => {
    fetch(fetchUrl)
        .then(res => res.json())
        .then(data => {
            createCardHouses(data)
            updateHouses(data);
        })
        .catch(err => renderError(err, createCardHouses(baseData)))
};

const createCardHouses = (houses) => {
    cardsContainer.innerHTML= '';
    setStyleFlex(document.getElementById('render-spinner'));
    setStyleNone(searchBar);
    setTimeout (() => {
        setStyleNone(document.getElementById('render-spinner'));
        setStyleFlex(searchBar);
        houses.forEach(house => {
            const { HouseName, Sigil, id, Motto,} = house;
            cardsContainer.innerHTML += `
            <div class="house-card">
                <h2>${HouseName}</h2>
                <img src="${Sigil}" alt="${HouseName} Sigil">
                <h3>${Motto}</h3>
                <button class="view_characters_btn" data-cardid="${id}">
                    <i class="fa-solid fa-arrow-right-to-bracket"></i>
                    <span>View more</span>
                </button>
            </div>
            `;
        });
        viewHouseCharacters(document.querySelectorAll(".view_characters_btn"));
    }, 2000)
    linkHousesWithSelect();
};

const viewHouseCharacters = (btns) => {
    btns.forEach((btn) =>
      btn.addEventListener("click", () => {
        getHouseCharacters(btn.dataset.cardid);
      })
    );
};

//      GET GREAT HOUSES CHARACTERS 

const getHouseCharacters = (idHouse) => {
    Promise.all([
        fetch(`${baseData}/${idHouse}`).then(res => res.json()), 
        fetch(`${baseData}/${idHouse}/Characters`).then(res => res.json())
    ])
    .then(([houseData, membersData]) => {
        createHouseCharacters(houseData, membersData);
    })
    .catch(err => renderError(err, createHouseCharacters(idHouse)))
};

const createHouseCharacters = (houseData, houseCharacters) => {
    const { Sigil, SignatureColor, HouseName, Story, id:idHouse, Members } = houseData;
    cardsContainer.innerHTML = '';
    setStyleFlex(document.getElementById('render-spinner'));
    setStyleNone(searchBar);
    setTimeout (() => {
        setStyleFlex(searchBar);
        setStyleNone(document.getElementById('render-spinner'));
        cardsContainer.innerHTML += `
            <div class="house-information-section">
                <div>
                    <button class="back_to_great_houses">
                        <i class="fa-solid fa-arrow-left"></i>
                        <span>Go back</span>
                    </button>
                    <img src="${Sigil}" class="house-emblem" alt="${HouseName} Emblem">
                </div>
                <h2>${HouseName}</h2>
                <div>
                    <p>
                        ${Story}
                    </p>
                </div>
                <div>
                    <button class="negative-btn delete_house_btn">
                        <i class="fa-solid fa-trash"></i>
                        <span>Delete House</span>
                    </button>
                    <button class="positive-btn edit_house_btn" data-cardId="${idHouse}">
                        <i class="fa-solid fa-pen"></i>
                        <span>Edit House</span>
                    </button>
                </div>
            </div>
        `;
        if (Members.length === 0) {
            cardsContainer.innerHTML += `
            <div class="no-content">
                <div>
                    <h3>
                        <i class="fa-solid fa-circle-exclamation"></i>
                        Ups!
                    </h3>
                </div>
                <div>
                    <p>Looks like this house doesn't have any characters yet. Please try to add some.</p>
                </div>
            </div>
            `;
        } else {
            houseCharacters.forEach(character => {
                const { id, Name, Avatar, Description } = character;
                cardsContainer.innerHTML += `
                    <div class="reduced-character-card">
                        <div>
                            <div class="header-card">
                                <h2>${Name}</h2>
                                <img src="${Avatar}" alt="${Name} portrait}">
                            </div>
                            <div>
                                <p>${Description}</p>
                            </div>
                        </div>
                        <div>
                            <button data-houseid="${idHouse}" data-cardid="${id}" class="view_more_details_btn">
                                <i class="fa-solid fa-arrow-right-to-bracket"></i>
                                <span>View more details</span>
                            </button>
                        </div>
                    </div>
                `;
                const characterCards = document.querySelectorAll('.reduced-character-card');
                characterCards.forEach(card => {setInnerShadowColor(card, SignatureColor);});
                viewCharacterDetails(document.querySelectorAll(".view_more_details_btn"));
            });
        }
        document.querySelector('.delete_house_btn').addEventListener('click', () => {generateHouseModalWarning(idHouse)});
        document.querySelector('.edit_house_btn').addEventListener('click', () => {generateEditHouseForm(idHouse)});
        document.querySelector('.back_to_great_houses').addEventListener('click', () => { getGreatHouses(baseData) });
    }, 2000);
};

const viewCharacterDetails = (btns) => {
    btns.forEach((btn) => {
        const idHouse = btn.dataset.houseid; 
        const idCharacter = btn.dataset.cardid;
        btn.dataset.houseid = idHouse;
        btn.addEventListener("click", () => {
            getCharacter(idHouse, idCharacter);
        });
    })    
};

//      GET CHARACTER

const getCharacter = (idHouse, idCharacter) => {
    Promise.all([
        fetch(`${baseData}/${idHouse}/Characters/${idCharacter}`).then(res => res.json()), 
        fetch(`${baseData}/${idHouse}`).then(res => res.json())
    ])
    .then(([characterData, houseData]) => {
        createCharacterExtendedCard(characterData, houseData);
    })
    .catch(err => renderError(err, createHouseCharacters(idHouse)));
};

const createCharacterExtendedCard = (character, house) => {
    cardsContainer.innerHTML = '';
    setStyleFlex(document.getElementById('render-spinner'));
    setStyleNone(searchBar);
    setTimeout (() => {
        setStyleNone(document.getElementById('render-spinner'));

        const { id, Name, Gender, Avatar, State, Biography } = character;
        const { Sigil, SignatureColor, id:idHouse } = house; 

        cardsContainer.innerHTML = `
            <div class="extended-character-card">
                <div class="character-info-card">
                    <div>
                        <button class="back_to_house_characters">
                            <i class="fa-solid fa-arrow-left"></i>
                            <span>Go back</span>
                        </button>
                        <img src="${Sigil}" class="house-emblem" alt="${Name} House">
                    </div>
                    <div>
                        <h2>${Name}</h2>
                    </div>
                    <div>
                        <h3>Gender: ${Gender}</h3>
                        <h3>State: ${State}</h3>
                    </div>
                    <div>
                        <img src="${Avatar}" class="character-portrait" alt="${Name} Portrait">
                    </div>
                </div>
                <div>
                    <h2>Biography</h2>
                    <p>
                        ${Biography}
                    </p>
                </div>
                <div>
                    <button class="negative-btn delete_character_btn">
                        <i class="fa-solid fa-trash"></i>
                        <span>Delete</span>
                    </button>
                    <button class="edit-btn edit_character_btn"">
                        <i class="fa-solid fa-pen"></i>
                        <span>Edit</span>
                    </button>
                </div>
            </div>
        `;
        setInnerShadowColor(document.querySelector('.extended-character-card'), `${SignatureColor}`);
        document.querySelector('.back_to_house_characters').addEventListener('click', () => { getHouseCharacters(idHouse)});
        document.querySelector(".edit_character_btn").addEventListener('click', () => { generateEditCharacterForm(idHouse, id) })
        document.querySelector('.delete_character_btn').addEventListener('click', () => {generateCharacterModalWarning(idHouse, id)});
    }, 2000);
};