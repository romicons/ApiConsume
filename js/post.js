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
                renderError((err), generateFormNewHouse());
            });
    }
};


   