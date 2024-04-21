//      DELETE HOUSE

const deleteHouse = (idHouse) => {
    fetch(`${baseData}/${idHouse}`, {
        method: "DELETE",
    })
    .then(() => { getGreatHouses(baseData) })
    .catch((err) => 
        renderError(err))
};

const generateHouseModalWarning = (idHouse) => {
    fetch(`${baseData}/${idHouse}/Characters`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch characters for the house.');
            }
        })
        .then(characters => {
            const modalContainer = document.createElement('div');
            modalContainer.classList.add('modal-warning');
            modalContainer.innerHTML = `
                <div class="modal-window">
                    <div>
                        <h2>
                            <i class="fa-solid fa-triangle-exclamation"></i>
                            WARNING 
                        </h2>
                    </div>
                    <div>
                        <p>
                            ${characters.length > 0 ? `This house cannot be deleted because it contains characters. You will have to delete them first.` : `Are you sure you wanna delete this House? Once you've done it, you can't undo it.`}
                        </p>
                    </div>
                    ${characters.length > 0 ? `
                    <div>
                        <button class="negative-btn cancel_delete_house">
                            <i class="fa-solid fa-xmark"></i>
                            <span>Close window</span>
                        </button>
                    </div>` 
                    : `
                    <div>
                        <button class="negative-btn cancel_delete_house">
                            <i class="fa-solid fa-xmark"></i>
                            <span>Cancel</span>
                        </button>
                        <button type="submit" class="edit-btn confirm_delete_house">
                            <i class="fa-solid fa-check"></i>
                            <span>Confirm</span>
                        </button>
                    </div>
                    `}
                </div>
            `;
            document.body.appendChild(modalContainer);
            modalContainer.querySelector('.cancel_delete_house').addEventListener('click', () => {
                modalContainer.remove();
            });
            if (characters.length === 0) {
                modalContainer.querySelector('.confirm_delete_house').addEventListener('click', (e) => {
                    e.preventDefault();
                    deleteHouse(idHouse);
                    modalContainer.remove();
                });
            }
        })
        .catch(err => renderError(err));
};





//      DELETE CHARACTER

const deleteCharacter = (idHouse, idCharacter) => {
    fetch(`${baseData}/${idHouse}/Characters/${idCharacter}`, {
        method: "DELETE",
    })
    .then(() => { getHouseCharacters(idHouse) })
    .catch((err) => 
        renderError(err))
};

const generateCharacterModalWarning = (idHouse, idCharacter) => {
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-warning');
    modalContainer.innerHTML = `
        <div class="modal-window">
            <div>
                <h2>
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    WARNING 
                </h2>
            </div>
            <div>
                <p>
                    Are you sure you wanna delete this Character? Once you've done it, you can't undo it.
                </p>
            </div>
            <div>
                <button class="negative-btn cancel_delete_character">
                    <i class="fa-solid fa-xmark"></i>
                    <span>Cancel</span>
                </button>
                <button type="submit" class="edit-btn confirm_delete_character">
                    <i class="fa-solid fa-check"></i>
                    <span>Confirm</span>
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modalContainer);
    modalContainer.querySelector('.cancel_delete_character').addEventListener('click', () => {
        modalContainer.remove();
    });
    modalContainer.querySelector('.confirm_delete_character').addEventListener('click', (e) => {
        e.preventDefault();
        deleteCharacter(idHouse, idCharacter);
        modalContainer.remove();
    });
};
