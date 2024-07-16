// src/components/Generate/generate.js
import React, { useState } from 'react';
import './generate.css'; // Assuming you already have this CSS file
import axios from "axios";
import generatebg from '../../assets/generatebg.png';
import genpreview from '../../assets/gen-preview.png';
import gendown from '../../assets/gen-down.png';


const Generate = () => {

  const [selectedTab, setSelectedTab] = useState('');
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };
  const [question, setQuestion] = useState("");

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
          {selectedTab === 'tab1' &&
            <form>
              <label htmlFor="gen-email">Email:</label>
              <input type="email" id="gen-email" name="gen-email" required />

              <label htmlFor="gen-storyline">Storyline:</label>
              <textarea value={question} onChange={(e) => setQuestion(e.target.value)}
                id="gen-storyline" name="gen-storyline" rows="5" required></textarea>

              <label htmlFor="gen-style">Comic Style:</label>
              <input type="text" id="gen-style" name="gen-style" required />

              <button onClick={generateAnswer} className="genDialogue" id="gdialogue" type="submit">Generate dialogue</button>
            </form>
          }
          {selectedTab === 'tab2' && <p>Header 2 Content</p>}
          {selectedTab === 'tab3' && <p>Header 3 Content</p>}
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

