import React, { useState } from 'react';
import './generate.css';
import generatebg from '../../assets/generatebg.png';
import genpreview from '../../assets/gen-preview.png';
import gendown from '../../assets/gen-down.png';

const Generate = () => {
  const [selectedTab, setSelectedTab] = useState(''); // State to track selected tab content
  const [numCharacters, setNumCharacters] = useState(1);
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleNumCharactersChange = (e) => {
    setNumCharacters(parseInt(e.target.value));
  };


  const SceneManager = () => {
    const [scenes, setScenes] = useState([{ id: 1, heading: 'Scene 1' }]);
  
    const addScene = () => {
      if (scenes.length >= 6) return; // Prevent adding more than 6 scenes
      const newId = scenes.length + 1;
      setScenes([...scenes, { id: newId, heading: `Scene ${newId}` }]);
    };
  
    return (
      <div className="scene-manager">
        {scenes.map((scene) => (
          <div key={scene.id} className="scene-container">
            <div className="scene-header">
              <h2 className="scene-heading">{scene.heading}</h2>
              {scene.id === scenes.length && scenes.length < 6 && (
                <button onClick={addScene} className="add-button">+</button>
              )}
            </div>
            <textarea placeholder={`Enter details for ${scene.heading}`} className="scene-textbox" />
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="gen-container">
      <div className="gen-left">
        <div className="gen-navbar">
          <div className={`gen-nav-item ${selectedTab === 'tab1' ? 'active' : ''}`} onClick={() => handleTabClick('tab1')}>
            Story Board
          </div>
          <div className={`gen-nav-item ${selectedTab === 'tab2' ? 'active' : ''}`} onClick={() => handleTabClick('tab2')}>
            Characters
          </div>
          <div className={`gen-nav-item ${selectedTab === 'tab3' ? 'active' : ''}`} onClick={() => handleTabClick('tab3')}>
            Scenes
          </div>
        </div>
        <div className="gen-scrollable-content">
          {selectedTab === 'tab1' && <form>
            <label htmlFor="gen-email">Email:</label>
            <input type="email" id="gen-email" name="gen-email" required />

            <label htmlFor="gen-storyline">Storyline:</label>
            <textarea 
            id="gen-storyline" name="gen-storyline" rows="7" required></textarea>

              {/* value={question} onChange={(e)=> setQuestion(e.target.value) */}

            <label htmlFor="gen-style">Comic Style:</label>
            <input type="text" id="gen-style" name="gen-style" required />

            <button id="gdialogue" className="genDialogue" type="submit">Generate dialogue</button> 

            

          </form> }
          {selectedTab === 'tab2' && 
          
          (
            <div>
              <label htmlFor="num-characters">Number of Characters:</label>
              <select id="num-characters" onChange={handleNumCharactersChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>

              <div id="character-inputs">
                {[...Array(numCharacters)].map((_, i) => (
                  <div key={i} className="character-row">
                    <input type="text" placeholder="Character Name" className="name-input" />
                    <input type="text" placeholder="Character Description" className="description-input" />
                  </div>
                ))}
                <button id="gen-char-save"> Create character/s </button>
              </div>
            </div>
          )}
    
    {selectedTab === 'tab3' && (
  <div>
    <div>
      <SceneManager />
    </div> 
    <div>
      <button type='submit' id='gen-sceneinfo'>Save scenes</button>
    </div>
  </div>
)}

        </div>
      </div>



      <div className="gen-right">
      <h1 className="gen-head">Transform Your Stories into Stunning Comics !!!</h1>
      <div className="boxes-container">
      <div className="box-wrapper">
      <h2 className="box-heading">View in Browser</h2>
      <div className="box">
        <img src={genpreview} alt=''/>
      </div>
      </div>
    <div className="box-wrapper">
      <h2 className="box-heading">Download</h2>
      <div className="box">
      <img src={gendown} alt='' />
      </div>
    </div>
  </div>
</div>

      
<div className="image-container">
    <img src={generatebg} alt="" className="generatebg" />
    <button className="gen-button">Click to Craft your Comic</button>
  </div>



    </div>
  );
};

export default Generate;