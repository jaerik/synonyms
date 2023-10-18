import React, { useState } from 'react';
import AddWordPopup from './AddWordPopup';
import SynonymList from './SynonymList';
import {HasWord, GetSynonyms} from '../api/get';

function SynonymForm() {
  const [word, setWord] = useState('');
  const [missingWord, setMissingWord] = useState('');
  const [showAddWord, setShowAddWord] = useState(false);
  const [showSynonyms, setShowSynonyms] = useState(false);
  const [synonyms, setSynonyms] = useState([]);

  const handleChange = (event) => {
    setShowSynonyms(false);
    setWord(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (await HasWord(word)) {
      setSynonyms(await GetSynonyms(word));
      setShowSynonyms(true)
    } else {
      setMissingWord(word);
      setShowAddWord(true);
    }
  };

  return (
      <div class="Navigator">
        <div class="SynonymsForm">
          <form onSubmit={handleSubmit}>
              <label>
                <input type="text" value={word} placeholder="word" autofocus="autofocus" onChange={handleChange} />
              </label>
          </form>
          <AddWordPopup open={showAddWord} setOpen={setShowAddWord} missingWord={missingWord}/>
        </div>
        { showSynonyms ? <SynonymList word={word} synonyms={synonyms} setSynonyms={setSynonyms} setShowAddWord={setShowAddWord} setMissingWord={setMissingWord}/> : null }
      </div>
  );
}

export default SynonymForm;
