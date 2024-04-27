//      EDIT HOUSE

const editHouse = (idHouse, editedHouseName, editedSigil, editedMotto, editedSignatureColor, editedStory) => {
    const editedHouse = {
        ...idHouse,
        HouseName: editedHouseName,
        Sigil: editedSigil,
        Motto: editedMotto,
        SignatureColor: editedSignatureColor,
        Story: editedStory
    };
    
    fetch(`${baseData}/${idHouse}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify(editedHouse),
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

const generateEditHouseForm = (idHouse) => {
    fetch(`${baseData}/${idHouse}`)
    .then(res => res.json())
    .then(data => {
    const { id, HouseName, Motto, Sigil, SignatureColor, Story } = data;
    cardsContainer.innerHTML = '';
    setStyleFlex(document.getElementById('render-spinner'));
    setStyleNone(searchBar);
    setTimeout(() => {
        setStyleNone(document.getElementById('render-spinner'));
        cardsContainer.innerHTML += `
            <div class="house-information-section">
                    <div>
                        <h2>House ${HouseName}</h2>
                        <img src="${Sigil}" class="house-emblem" alt="${HouseName} Emblem">
                    </div>
                    <div>
                        <h3>${Motto}</h3>
                    </div>
                    <div>
                        <p>
                            ${Story}
                        </p>
                    </div>
            </div>
            <form class="edit-house-form">
                <h2>Edit House</h2>
                <div>
                    <label for="house-name-edited">
                        Name
                    </label>
                    <input type="text" id="house-name-edited" value="${HouseName}" required>
                    <label for="house-motto-edited">
                        Motto
                    </label>
                    <input type="text" id="house-motto-edited" value="${Motto}" required>
                </div>
                <div>
                    <label for="house-sigil-edited">
                        Emblem
                    </label>
                    <input type="url" id="house-sigil-edited" value="${Sigil}" required>
                </div>
                <div>
                    <label for="house-color-edited">
                        Signature color
                    </label>
                    <input type="color" id="house-color-edited" aria-label="House color signature" value="${SignatureColor}" required>
                </div>
                <div>
                    <label for="house-story-edited">
                        Story
                    </label>
                    <textarea id="house-story-edited" required>${Story}</textarea>
                </div>        
                <div>
                    <button class="negative-btn abort_edit_house">
                        <i class="fa-solid fa-xmark"></i>
                        <span>Cancel</span>
                    </button>
                    <button type="submit" class="edit-btn save_edited_house">
                        <i class="fa-solid fa-check"></i>
                        <span>Save House</span>
                    </button>
                </div>
            </form>
        `;
        document.querySelector('.abort_edit_house').addEventListener('click', (e) => {
            e.preventDefault();
            getGreatHouses(baseData);
        });
        document.querySelector('.edit-house-form').addEventListener('submit', (e) => {
            e.preventDefault();
            validateEditHouse(id);
        });
    }, 2000)
})};


const validateEditHouse = (idHouse) => {
    const houseNameEdited = document.getElementById('house-name-edited').value.trim();
    const houseMottoEdited = document.getElementById('house-motto-edited').value.trim();
    const houseSigilEdited = document.getElementById('house-sigil-edited').value.trim();
    const houseSignatureColorEdited = document.getElementById('house-color-edited').value.trim();
    const houseStoryEdited = document.getElementById('house-story-edited').value.trim();

    if (houseNameEdited === '') {
        formError(
            document.getElementById('house-name-edited'),
            'Please provide a name for the house.'
        );
    } else if (houseMottoEdited === '') {
        formError(
            document.getElementById('house-motto-edited'),
            'Please provide a motto for the house.'
        );
    } else if (!imgFromUrl(houseSigilEdited)) {
        formError(
            document.getElementById('house-sigil-edited'),
            'The URL provided is not valid. Please provide an image that works.'
        );
    } else if (houseStoryEdited === '') {
        formError(
            document.getElementById('house-story-edited'),
            'Please provide the story of the house.'
        );
    } else {
        fetch(`${baseData}/${idHouse}`)
            .then(res => res.json())
            .then(data => {
                const { HouseName } = data;
                if (houseNameEdited !== HouseName) {
                    fetch(baseData)
                        .then(res => res.json())
                        .then(houses => {
                            const houseExists = houses.some(house => house.HouseName === houseNameEdited);
                            if (houseExists) {
                                formError(
                                    document.getElementById('house-name-edited'),
                                    'This house already exists.'
                                );
                            } else {
                                editHouse(
                                    idHouse,
                                    houseNameEdited,
                                    houseSigilEdited,
                                    houseMottoEdited,
                                    houseSignatureColorEdited,
                                    houseStoryEdited
                                );
                            }
                        })
                        .catch(err => {
                            renderError((err), generateEditHouseForm);
                        });
                } else {
                    editHouse(
                        idHouse,
                        houseNameEdited,
                        houseSigilEdited,
                        houseMottoEdited,
                        houseSignatureColorEdited,
                        houseStoryEdited
                    );
                }
            })
            .catch(err => {
                renderError((err), generateEditHouseForm);
            });
    }
};

//      EDIT HOUSE

const editCharacter = (idCharacter, idHouse, editedName, editedHouse, editedGender, editedAvatar, editedState, editedDescription, editedBiography) => {
    const editedCharacter = {
        ...idCharacter,
        Name: editedName,
        GreatHousId: editedHouse,
        Gender: editedGender,
        Avatar: editedAvatar,
        State: editedState,
        Description: editedDescription,
        Biography: editedBiography
    };
    
    fetch(`${baseData}/${idHouse}/Characters/${idCharacter}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify(editedCharacter),
    })
    .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(() => { getHouseCharacters(editedHouse) })
      .catch((err) => () => {
          renderError(err)
          cardsContainer.innerHTML = '';
      });
};

const generateEditCharacterForm = async (idHouse, idCharacter) => {
    try {
        const res = await fetch(`${baseData}/${idHouse}/Characters/${idCharacter}`);
        const data = await res.json();

        const { Name, GreatHousId, Gender, Avatar, State, Description, Biography } = data;

        const form = document.createElement('form');
        form.classList.add('edit-character-form');
        console.log(GreatHousId);
        linkHousesWithSelect();
        form.innerHTML = `
            <h2>Edit Character</h2>
            <div class="row-col">
                <div>
                    <label for="character-name-edited">
                        Name
                    </label>
                    <input type="text" id="character-name-edited" value="${Name}" required>
                </div>
                <div>
                    <label for="character-house-edited">
                        House
                    </label>
                    <select id="character-house-edited" class="from-house" required>
                    </select>
                </div>
            </div>
            <div class="row-col">
                <div>
                    <label for="character-gender-edited">
                        Gender
                    </label>
                    <select id="character-gender-edited" required>
                        <option value="Other/Unknown">Other/Unknown</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div>
                    <label for="character-state-edited">
                        State
                    </label>
                    <select id="character-state-edited" required>
                        <option value="Unknown">Unknown</option>
                        <option value="Alive">Alive</option>
                        <option value="Dead">Dead</option>
                    </select>
                </div>
            </div>
            <div>
                <label for="character-avatar-edited">
                    Portrait
                </label>
                <input type="url" id="character-avatar-edited" value="${Avatar}" required>
            </div>
            <div>
                <label for="character-description-edited">
                    Description
                </label>
                <textarea id="character-description-edited" required maxlength="730">${Description}</textarea>
            </div>
            <div>
                <label for="character-biography-edited">
                    Biography
                </label>
                <textarea id="character-biography-edited" required>${Biography}</textarea>
            </div>
            <div>
                <button class="negative-btn abort_edit_character">
                    <i class="fa-solid fa-xmark"></i>
                    <span>Cancel</span>
                </button>
                <button type="submit" class="edit-btn save_edit_character">
                    <i class="fa-solid fa-check"></i>
                    <span>Save</span>
                </button>
            </div>
        `;
        cardsContainer.appendChild(form);
        document.getElementById('character-gender-edited').value = Gender;
        document.getElementById('character-state-edited').value = State;
        document.getElementById('character-house-edited').value = GreatHousId;
        console.log(document.getElementById('character-house-edited').value)

        form.querySelector('.abort_edit_character').addEventListener('click', (e) => {
            e.preventDefault();
            setStyleNone(form);
        });
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            validateEditCharacter(idHouse, idCharacter);
        });
    } catch (err) {
        renderError(err);
    }
};

const validateEditCharacter = (idHouse, idCharacter) => {
    const characterNameEdited = document.getElementById('character-name-edited').value.trim();
    const characterGreatHouseEdited = document.getElementById('character-house-edited').value;
    const characterGenderEdited = document.getElementById('character-gender-edited').value;
    const characterAvatarEdited = document.getElementById('character-avatar-edited').value;
    const characterStateEdited = document.getElementById('character-state-edited').value;
    const characterDescriptionEdited = document.getElementById('character-description-edited').value.trim();
    const characterBiographyEdited = document.getElementById('character-biography-edited').value.trim();

    fetch(`${baseData}/${idHouse}`)
        .then(res => res.json())
        .then(characters => {
            const { Members } = characters;
            const characterOriginal = Members.find(member => member.id === idCharacter);
            const characterNameOriginal = characterOriginal.Name;
            
            if (characterNameEdited !== characterNameOriginal) {
                if (characterNameEdited === '') {
                    formError(
                        document.getElementById('character-name-edited'),
                        'Please provide a name for the character.'
                    );
                } else if (!imgFromUrl(characterAvatarEdited)) {
                    formError(
                        document.getElementById('character-avatar-edited'),
                        'The URL provided is not valid. Please provide an image that works.'
                    );
                } else if (characterDescriptionEdited === '') {
                    formError(
                        document.getElementById('character-description.edited'),
                        'Please provide a description for the character.'
                    );
                } else if (characterBiographyEdited === '') {
                    formError(
                        document.getElementById('character-biography-edited'),
                        'Please provide the biography of the character'
                    );
                } else {
                    const characterExists = Members.some(member => member.Name === characterNameEdited);
                    if (characterExists) {
                        formError(
                            document.getElementById('character-name-edited'),
                            'This character already exists.'
                        );
                    } else {
                        editCharacter(
                            idCharacter,
                            idHouse,
                            characterNameEdited,
                            characterGreatHouseEdited,
                            characterGenderEdited,
                            characterAvatarEdited,
                            characterStateEdited,
                            characterDescriptionEdited,
                            characterBiographyEdited
                        );
                    }
                }
            } else {
                if (!imgFromUrl(characterAvatarEdited)) {
                    formError(
                        document.getElementById('character-avatar-edited'),
                        'The URL provided is not valid. Please provide an image that works.'
                    );
                } else if (characterDescriptionEdited === '') {
                    formError(
                        document.getElementById('character-description.edited'),
                        'Please provide a description for the character.'
                    );
                } else if (characterBiographyEdited === '') {
                    formError(
                        document.getElementById('character-biography-edited'),
                        'Please provide the biography of the character'
                    );
                } else {
                    editCharacter(
                        idCharacter,
                        idHouse,
                        characterNameEdited,
                        characterGreatHouseEdited,
                        characterGenderEdited,
                        characterAvatarEdited,
                        characterStateEdited,
                        characterDescriptionEdited,
                        characterBiographyEdited
                    );
                }
            }
        }) 
        .catch(err => {
            renderError((err), generateFormNewCharacter);
        });
};