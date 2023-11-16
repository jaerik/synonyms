import React, { useState } from 'react';
import AddSynonymForm from './AddSynonymForm'
import AddSynonymButton from './AddSynonymButton'

function SynonymList({setShowAddWord, word, synonyms, setSynonyms, setMissingWord}) {
  const [showAddSynonymButton, setShowAddSynonymButton] = useState(true);
  return (
    <div class="SynonymList">
      {synonyms.map((synonym) => <div id="synonym" key={synonym}>{synonym}</div>)}
      { showAddSynonymButton
        ? <AddSynonymButton setShowAddSynonymButton={setShowAddSynonymButton} />
        : <AddSynonymForm word={word} setShowAddWord={setShowAddWord} synonyms={synonyms} setSynonyms={setSynonyms} setMissingWord={setMissingWord} setShowAddSynonymButton={setShowAddSynonymButton}/>
      }
    </div>
  );
}

export default SynonymList;

