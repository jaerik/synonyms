import React, { useState } from 'react';
import AddSynonymForm from './AddSynonymForm'
import AddSynonymButton from './AddSynonymButton'

/*function SynonymList({setShowAddWord, word, synonyms, setSynonyms}) {
    return (
      <div class="SynonymList">
        <ul>
          {synonyms.map((synonym) => <li id="synonym" key={synonym}>{synonym}</li>)}
          <li><AddSynonymButton/></li>
        </ul>
      </div>
    );
}*/

function SynonymList({setShowAddWord, word, synonyms, setSynonyms, setMissingWord}) {
  const [showAddSynonymButton, setShowAddSynonymButton] = useState(true);
  /*const [showAddSynonymForm, setShowAddSynonymForm] = useState(false);*/
  return (
    <div class="SynonymList">
      {synonyms.map((synonym) => <div id="synonym" key={synonym}>{synonym}</div>)}
      { showAddSynonymButton ? <AddSynonymButton setShowAddSynonymButton={setShowAddSynonymButton} /> : null }
      { !showAddSynonymButton ? <AddSynonymForm word={word} setShowAddWord={setShowAddWord} synonyms={synonyms} setSynonyms={setSynonyms} setMissingWord={setMissingWord} setShowAddSynonymButton={setShowAddSynonymButton}/> : null }
    </div>
  );
}

export default SynonymList;

//<li><AddSynonymForm word={word} synonyms={synonyms} setSynonyms={setSynonyms} setShowAddWord={setShowAddWord}/></li>
