const getCharacters = (firstFilter, secondFilter, thirdFilter) => {
    fetch(baseData)
        .then(res => res.json())
        .then(housesData => {
            housesData.forEach(house => {
                const { id: HouseId } = house;
                fetch(`${baseData}/${HouseId}`)
                    .then(res => res.json())
                    .then(houseDetails => {
                        const {Sigil:CharacterEmblem, SignatureColor} = houseDetails;
                        fetch(`${baseData}/${HouseId}/Characters`)
                            .then(res => res.json())
                            .then(characters => {
                                let filteredCharacters = characters;
                                if (firstFilter !== '') {
                                    filteredCharacters = filteredCharacters.filter(character => character.GreatHousId === firstFilter);
                                }
                                if (secondFilter !== '') {
                                    filteredCharacters = filteredCharacters.filter(character => character.Gender === secondFilter);
                                }
                                if (thirdFilter !== '') {
                                    filteredCharacters = filteredCharacters.filter(character => character.State === thirdFilter);
                                }
                                createFilteredCharacters(filteredCharacters, CharacterEmblem, SignatureColor);
                            })
                            .catch(err => renderError(err));
                    })
                    .catch(err => renderError(err));
            });
        })
        .catch(err => renderError(err));
};
const createFilteredCharacters = (characters, houseSigil, houseSignatureColor) => {
    cardsContainer.innerHTML = '';
    setStyleFlex(document.getElementById('render-spinner'));
    setStyleNone(searchBar);
    setTimeout(() => {
        setStyleFlex(searchBar);
        setStyleNone(document.getElementById('render-spinner'));
        characters.forEach(character => {
            const { id, Name, Avatar, Description, GreatHousId } = character;
            const characterCard = document.createElement('div');
            characterCard.classList.add('filtered-character-card');
            characterCard.innerHTML = `
                <div>
                    <div class="header-card">
                        <div>
                            <h2>${Name}</h2>
                            <img src="${houseSigil}" alt="${Name} House" class="character-emblem">
                        </div>
                        <img src="${Avatar}" alt="${Name} portrait" class="character-portrait">
                    </div>
                    <div>
                        <p>${Description}</p>
                    </div>
                </div>
                <div>
                    <button data-houseid="${GreatHousId}" data-cardid="${id}" class="view_more_details_btn">
                        <i class="fa-solid fa-arrow-right-to-bracket"></i>
                        <span>View more details</span>
                    </button>
                </div>
            `;
            cardsContainer.appendChild(characterCard);
            viewCharacterDetails(document.querySelectorAll(".view_more_details_btn"));
            setInnerShadowColor(characterCard, houseSignatureColor); // Aplicar color de sombra aquí
        });
    }, 2000);
};



const searchBy = () => {
    let houseFilter = document.getElementById('house-search').value;
    let genderFilter = document.getElementById('gender-search').value;
    let stateFilter = document.getElementById('state-search').value;
    getCharacters(houseFilter, genderFilter, stateFilter);
};

document.getElementById('btn-search').addEventListener('click', searchBy);

document.getElementById('btn-cancel-search').addEventListener('click', () => {
    document.getElementById('search-form').reset();
});
