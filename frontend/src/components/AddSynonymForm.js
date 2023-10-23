import React, { useState } from 'react';
import {HasWord, GetSynonyms, SetData} from '../api/get';

function AddSynonymForm({word, synonyms, setSynonyms, setMissingWord, setShowAddWord, setShowAddSynonymButton}) {
    const [synonym, setSynonym] = useState('');

    const handleChange = (event) => {
      setSynonym(event.target.value);
    };

    const handleSubmit = async event => {
      event.preventDefault();
      if (await HasWord(synonym)) {
        if (!synonyms.includes(synonym)) {
          await SetData('add-synonym', [word, synonym]);
          setSynonyms(await GetSynonyms(word));
        }
        setShowAddSynonymButton(true)
      } else {
        setMissingWord(synonym);
        setShowAddWord(true);
      }
    };

    return (
      <div class="AddSynonymFrom">
        <form onSubmit={handleSubmit}>
            <label>
              <input type="text" value={synonym} onChange={handleChange} />
            </label>
        </form>
      </div>
    );
  }

export default AddSynonymForm;