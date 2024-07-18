import React, { useState } from 'react';
import './generate.css';
import generatebg from '../../assets/generatebg.png';
import genpreview from '../../assets/gen-preview.png';
import gendown from '../../assets/gen-down.png';
import axios from "axios";

const Generate = () => {
  const [question, setQuestion] = useState("");
  const [selectedTab, setSelectedTab] = useState('');
  const [numCharacters, setNumCharacters] = useState(1);
  const [characters, setCharacters] = useState([]);
  const [scenes, setScenes] = useState([{ id: 1, heading: 'Scene 1', details: '' }]);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleNumCharactersChange = (e) => {
    const num = parseInt(e.target.value);
    setNumCharacters(num);
    setCharacters(Array(num).fill({ name: '', description: '' }));
  };

  const handleCharacterChange = (index, field, value) => {
    const updatedCharacters = characters.map((char, i) =>
      i === index ? { ...char, [field]: value } : char
    );
    setCharacters(updatedCharacters);
  };

  // const resetCharacters = () => {
  //   setCharacters(Array(numCharacters).fill({ name: '', description: '' }));
  // };

  const handleCharacterSave = () => {
    // Log scenes array before replacement
    //console.log('Scenes before replacement:', scenes);

    // Iterate through scenes and characters to replace names with descriptions
    const updatedScenes = scenes.map((scene) => {
      let updatedDetails = scene.details;
      characters.forEach((char) => {
        updatedDetails = updatedDetails.replace(new RegExp(char.name, 'g'), char.description);
      });
      return { ...scene, details: updatedDetails };
    });

    // Log scenes array after replacement
    // console.log('Scenes after replacement:', updatedScenes);

    // Update state with the modified scenes
    //setScenes(updatedScenes);
    alert('Character information saved')
  };

  const addScene = () => {
    if (scenes.length >= 6) return;
    const newId = scenes.length + 1;
    setScenes([...scenes, { id: newId, heading: `Scene ${newId}`, details: '' }]);
  };

  const handleSceneChange = (index, value) => {
    const updatedScenes = scenes.map((scene, i) =>
      i === index ? { ...scene, details: value } : scene
    );
    setScenes(updatedScenes);
  };

  const handleSave = () => {
    // Log scenes array before replacement
    console.log('Scenes before replacement:', scenes);

    // Iterate through scenes and characters to replace names with descriptions
    const updatedScenes = scenes.map((scene) => {
      let updatedDetails = scene.details;
      characters.forEach((char) => {
        updatedDetails = updatedDetails.replace(new RegExp(char.name, 'g'), char.description);
      });
      return { ...scene, details: updatedDetails };
    });

    alert('Scenes saved');
    // Log scenes array after replacement
    console.log('Scenes after replacement:', updatedScenes);

    // Update state with the modified scenes
    //setScenes(updatedScenes);
  };

  const SceneManager = () => {
    return (
      <div className="scene-manager">
        {scenes.map((scene, index) => (
          <div key={scene.id} className="scene-container">
            <div className="scene-header">
              <h2 className="scene-heading">{scene.heading}</h2>
              {scene.id === scenes.length && scenes.length < 6 && (
                <button onClick={addScene} className="add-button">+</button>
              )}
            </div>
            <textarea
              placeholder={`Enter details for ${scene.heading}`}
              className="scene-textbox"
              value={scene.details}
              onChange={(e) => handleSceneChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>
    );
  };




  async function generateAnswer(e) {
    e.preventDefault(); // Prevent the form from submitting
    console.log("Loading...");
    try {
      const response = await axios({
        url: "http://localhost:4000/generate-dialogue",
        method: "post",
        data: { question }
      });
      console.log(response.data.generatedText);
    } catch (error) {
      console.error("Error generating answer:", error);
    }
  }




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
              <textarea value={question} onChange={(e) => setQuestion(e.target.value)}
                id="gen-storyline" name="gen-storyline" rows="5" required></textarea>

            <label htmlFor="gen-style">Comic Style:</label>
            <input type="text" id="gen-style" name="gen-style" required />

            <button onClick={generateAnswer} id="gdialogue" className="genDialogue" type="submit">Generate dialogue</button> 
          </form>}



          {selectedTab === 'tab2' && (
            <div>
              <label htmlFor="num-characters">Number of Characters:</label>
              <select id="num-characters" onChange={handleNumCharactersChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              <div id="character-inputs">
                {characters.map((char, index) => (
                  <div key={index} className="character-row">
                    <input
                      type="text"
                      placeholder="Character Name"
                      className="name-input"
                      value={char.name}
                      onChange={(e) => handleCharacterChange(index, 'name', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Character Description"
                      className="description-input"
                      value={char.description}
                      onChange={(e) => handleCharacterChange(index, 'description', e.target.value)}
                    />
                  </div>
                ))}
                <button id="gen-char-save" onClick={handleCharacterSave}>Create character/s</button>
              </div>
            </div>
          )}



          {selectedTab === 'tab3' && (
            <div>
              <div>
                <SceneManager />
              </div>
              <div>
                <button type='submit' id='gen-sceneinfo' onClick={handleSave}>Save scenes</button>
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
              <img src={genpreview} alt='' />
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