import React from 'react';
import Popup from 'reactjs-popup';
import {SetData} from '../api/get';

function AddWordPopup({open, setOpen, missingWord}) {
    const handleClick = async event => {
        SetData('add-word', [missingWord]);
        setOpen(false);
    };

    const onClose = () => setOpen(false);

    return (
        <Popup open={open} closeOnDocumentClick onClose={onClose}>
            {() => (
                <div class="AddWord">
                    <div>
                        Can't find the word {missingWord} in the word list. Would you like to add it?
                    </div>
                    <div class="AddWordButtons">
                        <button class="Green" onClick={() => handleClick()}>
                            Yes
                        </button>
                        <button class="Red" onClick={() => setOpen(false)}>
                            No
                        </button>
                    </div>
                </div>
            )}
        </Popup>
    );
}

export default AddWordPopup;
