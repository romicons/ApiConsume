const getCharacters = (firstFilter, secondFilter, thirdFilter) => {
    const housesData = getHouses();

    if (!housesData) {
        renderError('No se han encontrado datos de casas en el almacenamiento local');
        return;
    }

    const fetchPromises = housesData.map(house => {
        const { id: HouseId, Sigil: CharacterEmblem, SignatureColor } = house;
        return fetch(`${baseData}/${HouseId}/Characters`)
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
                return filteredCharacters.map(character => ({ ...character, CharacterEmblem, SignatureColor }));
            })
            .catch(err => {
                renderError(err);
                return [];
            });
    });

    Promise.all(fetchPromises)
        .then(charactersData => {
            const characters = charactersData.flat();
            createFilteredCharacters(characters);
        })
        .catch(err => renderError(err));
};

const createFilteredCharacters = (characters) => {
    cardsContainer.innerHTML = '';
    setStyleFlex(document.getElementById('render-spinner'));
    setStyleNone(searchBar);

    setTimeout(() => {
        setStyleFlex(searchBar);
        setStyleNone(document.getElementById('render-spinner'));

        if (characters.length === 0) {
            cardsContainer.innerHTML = `
                <div class="no-characters-found">
                    <h2>
                        <i class="fas fa-exclamation-circle"></i>
                        We're sorry!
                    </h2>
                    <p>It appears that there are no characters that coincide with your search. Please try again with other filters.</p>
                </div>
            `;
        } else {
            characters.forEach(character => {
                const { id, Name, Avatar, Description, GreatHousId, CharacterEmblem, SignatureColor } = character;
                const characterCard = document.createElement('div');
                characterCard.classList.add('filtered-character-card');
                characterCard.innerHTML = `
                    <div>
                        <div class="header-card">
                            <div>
                                <h2>${Name}</h2>
                                <img src="${CharacterEmblem}" alt="${Name} House" class="character-emblem">
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
                setInnerShadowColor(characterCard, SignatureColor);
            });
        }
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
