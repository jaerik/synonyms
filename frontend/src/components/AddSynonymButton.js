import React from 'react';

function AddSynonymButton({setShowAddSynonymButton}) {
    const handleClick = () => {
        setShowAddSynonymButton(false);
    };

    return(
        <div class="plus-button-container">
            <button class="plus-button" onClick={handleClick}></button>
        </div>
    );
}

export default AddSynonymButton;