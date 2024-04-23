//          CREATE A NEW HOUSE

const createNewHouse = (houseName, sigil, motto, signatureColor, story) => {
    const newHouse = {
        HouseName: houseName,
        Sigil: sigil,
        Motto: motto,
        SignatureColor: signatureColor,
        Story: story
    };
  
    fetch(`${baseData}`, {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify(newHouse),
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then(() => { getGreatHouses(baseData) })
    .catch((err) => () => {
        renderError(err)
        cardsContainer.innerHTML = '';
    });
};

const generateFormNewHouse = () => {
    cardsContainer.innerHTML = '';
    setStyleFlex(document.getElementById('render-spinner'));
    setStyleNone(searchBar);
    setTimeout (() => {
        setStyleNone(document.getElementById('render-spinner'));
        cardsContainer.innerHTML += `
            <form class="house-form">
                <h2>Add House</h2>
                <div>
                    <label for="new-house-name">
                        Name
                    </label>
                    <input type="text" id="new-house-name" required>
                    <label for="new-house-motto">
                        Motto
                    </label>
                    <input type="text" id="new-house-motto" required>
                </div>
                <div>
                    <label for="new-house-sigil">
                        Emblem
                    </label>
                    <input type="url" id="new-house-sigil" required>
                </div>
                <div>
                    <label for="new-house-color">
                        Signature color
                    </label>
                    <input type="color" id="new-house-color" value="#FFFFFF" aria-label="House color signature" required>
                </div>
                <div>
                    <label for="new-house-story">
                        Story
                    </label>
                    <textarea id="new-house-story" required></textarea>
                </div>        
                <div>
                    <button class="negative-btn abort_new_house">
                        <i class="fa-solid fa-xmark"></i>
                        <span>Cancel</span>
                    </button>
                    <button type="submit" class="edit-btn save_new_house">
                        <i class="fa-solid fa-check"></i>
                        <span>Save House</span>
                    </button>
                </div>
            </form>
        `;
        document.querySelector('.abort_new_house').addEventListener('click', () => {
            getGreatHouses(baseData);
        });
        document.querySelector('.house-form').addEventListener('submit', (e) => {
            e.preventDefault();
            validateNewHouse(); 
        });
    }, 2000)
};

const validateNewHouse = () => {
    const newHouseName = document.getElementById('new-house-name').value.trim();
    const newHouseMotto = document.getElementById('new-house-motto').value.trim();
    const newHouseSigil = document.getElementById('new-house-sigil').value.trim();
    const newHouseColor = document.getElementById('new-house-color').value.trim();
    const newHouseStory = document.getElementById('new-house-story').value.trim();

    if (newHouseName === '') {
        formError(
            document.getElementById('new-house-name'),
            'Please provide a name for the new house.'
        );
    } else if (newHouseMotto === '') {
        formError(
            document.getElementById('new-house-motto'),
            'Please provide the motto of the new house.'
        );
    } else if (!imgFromUrl(newHouseSigil)) {
        formError(
            document.getElementById('new-house-sigil'),
            'The URL provided is not valid. Please provide an image that works.'
        );
    } else if (newHouseStory === '') {
        formError(
            document.getElementById('new-house-story'),
            'Please provide the story of the new house.'
        );
    } else {
        fetch(baseData)
            .then(res => res.json())
            .then(houses => {
                const houseExists = houses.some(house => house.HouseName === newHouseName);
                if (houseExists) {
                    formError(
                        document.getElementById('new-house-name'),
                        'This house already exists.'
                    );
                } else {
                    createNewHouse(
                        newHouseName,
                        newHouseSigil,
                        newHouseMotto,
                        newHouseColor,
                        newHouseStory
                    );
                }
            })
            .catch(err => {
                renderError((err), generateFormNewHouse);
            });
    }
};

//      CREATE A NEW CHARACTER

const createNewCharacter = (characterName, characterHouse, gender, avatar, state, description, biography) => {
    const newCharacter = {
        Name: characterName,
        GreatHousId: characterHouse,
        Gender: gender,
        Avatar: avatar,
        State: state,
        Description: description,
        Biography: biography
    };
  
    fetch(`${baseData}/${characterHouse}/Characters`, {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify(newCharacter),
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then(() => { getHouseCharacters(`${characterHouse}`)})
    .catch((err) => () => {
        renderError(err)
        cardsContainer.innerHTML = '';
    });
};

const generateFormNewCharacter = () => {
    cardsContainer.innerHTML = '';
    setStyleNone(searchBar);
    setStyleFlex(document.getElementById('render-spinner'));
    setTimeout (() => {
        setStyleNone(document.getElementById('render-spinner'));
        cardsContainer.innerHTML += `
        <form class="character-form">
            <h2>Add Character</h2>
            <div>
                <label for="new-character-name">
                    Name
                </label>
                <input type="text" id="new-character-name" required>
                <label for="new-character-house">
                    House
                </label>
                <select id="new-character-house" class="from-house" required>
                </select>
            </div>
            <div>
                <label for="new-character-gender">
                    Gender
                </label>
                <select id="new-character-gender" required>
                    <option value="Other/Unknown">Other/Unknown</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <label for="new-character-state">
                    State
                </label>
                <select id="new-character-state" required>
                    <option value="Unknown">Unknown</option>
                    <option value="Alive">Alive</option>
                    <option value="Dead">Dead</option>
                </select>
            </div>
            <div>
                <label for="new-character-avatar">
                    Portrait
                </label>
                <input type="url" id="new-character-avatar" required>
            </div>
            <div>
                <label for="new-character-description">
                    Description
                </label>
                <textarea id="new-character-description" required maxlength="730"></textarea>
            </div>
            <div>
                <label for="new-character-biography">
                    Biography
                </label>
                <textarea id="new-character-biography" required></textarea>
            </div>
            <div>
                <button class="negative-btn abort_new_character">
                    <i class="fa-solid fa-xmark"></i>
                    <span>Cancel</span>
                </button>
                <button type="submit" class="edit-btn save_new_character">
                    <i class="fa-solid fa-check"></i>
                    <span>Save</span>
                </button>
            </div>
        </form>
        `;
        linkHousesWithSelect();
        document.querySelector('.abort_new_character').addEventListener('click', () => {
            getGreatHouses(baseData);
        });
        document.querySelector('.character-form').addEventListener('submit', (e) => {
            e.preventDefault();
            validateNewCharacter(); 
        });
    }, 2000)
};

const validateNewCharacter = () => {
    const newCharacterName = document.getElementById('new-character-name').value.trim();
    const newCharacterGreatHouse = document.getElementById('new-character-house').value;
    const newCharacterGender = document.getElementById('new-character-gender').value;
    const newCharacterAvatar = document.getElementById('new-character-avatar').value;
    const newCharacterState = document.getElementById('new-character-state').value;
    const newCharacterDescription = document.getElementById('new-character-description').value.trim();
    const newCharacterBiography = document.getElementById('new-character-biography').value.trim();

    if (newCharacterName === '') {
        formError(
            document.getElementById('new-character-name'),
            'Please provide a name for the character.'
        );
    } else if (!imgFromUrl(newCharacterAvatar)) {
        formError(
            document.getElementById('new-character-avatar'),
            'The URL provided is not valid. Please provide an image that works.'
        );
    } else if (newCharacterDescription === '') {
        formError(
            document.getElementById('new-character-description'),
            'Please provide a description for the character.'
        );
    } else if (newCharacterBiography === '') {
        formError(
            document.getElementById('new-character-biography'),
            'Please provide the biography of the character'
        );
    } else {
        fetch(`${baseData}/${newCharacterGreatHouse}`)
            .then(res => res.json())
            .then(characters => {
                const {Members} = characters
                    const characterExists = Members.some(member => member.Name === newCharacterName);
                    if (characterExists) {
                        formError(
                            document.getElementById('new-character-name'),
                            'This character already exists.'
                        );
                    } else {
                        createNewCharacter(
                            newCharacterName,
                            newCharacterGreatHouse,
                            newCharacterGender,
                            newCharacterAvatar,
                            newCharacterState,
                            newCharacterDescription,
                            newCharacterBiography
                        );
                    }
                }) 
            .catch(err => {
                renderError((err), generateFormNewCharacter);
            });
    }
};
