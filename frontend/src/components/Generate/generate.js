import React, { useState } from "react";
import "./generate.css";
import generatebg from "../../assets/generatebg.png";
import genpreview from "../../assets/gen-preview.png";
import gendown from "../../assets/gen-down.png";
import { Link } from "react-router-dom";
import axios from "axios";

const Generate = () => {
  const [selectedTab, setSelectedTab] = useState("");
  const [numCharacters, setNumCharacters] = useState(1);
  const [characters, setCharacters] = useState([]);
  const [scenes, setScenes] = useState([{ id: 1, heading: "Scene 1", content: "" }]);
  const [question, setQuestion] = useState("");
  const [processedScenes, setProcessedScenes] = useState([]);
  const [imageUrls, setImageUrls] = useState([]); // Define state for image URLs


  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  async function generateAnswer(e) {
    e.preventDefault();
    console.log("Loading...");
    console.log(question);
    try {
      const response = await axios({
        url: "http://localhost:4000/generate-dialogue",
        method: "post",
        data: { question },
      });
      console.log(response.data.generatedText);
    } catch (error) {
      console.error("Error generating answer:", error);
    }
  }

  const handleNumCharactersChange = (e) => {
    setNumCharacters(parseInt(e.target.value));
  };

  const handleCharacterSubmit = (e) => {
    e.preventDefault();
    const newCharacters = Array.from(e.target.elements)
      .filter(
        (element) =>
          element.className === "name-input" ||
          element.className === "description-input"
      )
      .reduce((acc, element, index, array) => {
        if (index % 2 === 0) {
          acc.push({
            name: element.value,
            description: array[index + 1].value,
          });
        }
        return acc;
      }, []);
    setCharacters(newCharacters);
    alert("Character information saved successfully!");
  };

  const replaceCharacterNames = (text) => {
    let processedText = text;
    characters.forEach((char) => {
      const regex = new RegExp(char.name, "gi");
      processedText = processedText.replace(regex, char.description);
    });
    return processedText;
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const SceneManager = () => {
    const addScene = () => {
      if (scenes.length >= 6) return;
      const newId = scenes.length + 1;
      setScenes([
        ...scenes,
        { id: newId, heading: `Scene ${newId}`, content: "" },
      ]);
    };

    return (
      <div className="scene-manager">
        {scenes.map((scene, index) => (
          <div key={scene.id} className="scene-container">
            <div className="scene-header">
              <h2 className="scene-heading">{scene.heading}</h2>
              {index === scenes.length - 1 && scenes.length < 6 && (
                <button onClick={addScene} className="add-button">
                  +
                </button>
              )}
            </div>
            <textarea
              placeholder={`Enter details for ${scene.heading}`}
              className="scene-textbox"
              name={`scene-${scene.id}`}
            />
          </div>
        ))}
      </div>
    );
  };

  const handleSaveScenes = (e) => {
    e.preventDefault();
    const sceneElements = Array.from(e.target.elements).filter(
      (element) => element.className === "scene-textbox"
    );
    const updatedScenes = scenes.map((scene, index) => ({
      ...scene,
      content: sceneElements[index].value,
      processedContent: replaceCharacterNames(sceneElements[index].value),
    }));
    setProcessedScenes(updatedScenes.map(scene => scene.processedContent));
    alert("Scenes are processed successfully!");
    console.log("Processed Scenes:", updatedScenes);
  };

  
const generateComic = async () => {
  const payload = {
    artStyle: 'pixar art',
    pages: [
      {
        scenes: processedScenes
      }
    ]
  };
  console.log("Payload is:", payload);


  try {
    const response = await axios.post('http://localhost:4000/comic/generate', payload, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    console.log('Comic generated:', response.data);
    const imageUrlsFromResponse = response.data.pages.flat(); // Flatten the array if needed
    setImageUrls(imageUrlsFromResponse); // Update state with multiple URLs
  } catch (error) {
    console.error('Failed to generate comic:', error);
  }
};
  

const downloadImages = async () => {
  try {
    if (imageUrls.length === 0) {
      throw new Error('No image URLs available');
    }

    for (const url of imageUrls) {
      console.log(`Downloading image from URL: ${url}`);
      const response = await fetch(`http://localhost:4000/proxy-image?url=${encodeURIComponent(url)}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch image from proxy: ${url}`);
      }

      const filename = await response.text(); // Get the filename from server response

      // Use XHR to download the image to 'images' folder on backend
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `http://localhost:4000/download-image?filename=${filename}`, true);
      xhr.responseType = 'blob';

      xhr.onload = function () {
        const blob = xhr.response;
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };

      xhr.send();
    }
  } catch (error) {
    console.error('Error downloading images:', error);
  }
};

  
  return (
    <div className="gen-container">
      <div className="gen-left">
        <div className="gen-navbar">
          <div
            className={`gen-nav-item ${selectedTab === "tab1" ? "active" : ""}`}
            onClick={() => handleTabClick("tab1")}
          >
            Story Board
          </div>
          <div
            className={`gen-nav-item ${selectedTab === "tab2" ? "active" : ""}`}
            onClick={() => handleTabClick("tab2")}
          >
            Characters
          </div>
          <div
            className={`gen-nav-item ${selectedTab === "tab3" ? "active" : ""}`}
            onClick={() => handleTabClick("tab3")}
          >
            Scenes
          </div>
        </div>
        <div className="gen-scrollable-content">
          {selectedTab === "tab1" && (
            <form className="story-board-tab">
              <label htmlFor="gen-email">Email:</label>
              <input type="email" id="gen-email" name="gen-email" required />

              <label htmlFor="gen-storyline">Storyline:</label>
              <textarea
                id="gen-storyline"
                name="gen-storyline"
                rows="7"
                value={question}
                onChange={handleQuestionChange}
                required
              ></textarea>

              <label htmlFor="gen-style">Comic Style:</label>
              <input type="text" id="gen-style" name="gen-style" required />

              <button
                id="gdialogue"
                className="genDialogue"
                type="submit"
                onClick={generateAnswer}
              >
                Generate dialogue
              </button>
            </form>
          )}
          {selectedTab === "tab2" && (
            <div>
              <label htmlFor="num-characters">Number of Characters:</label>
              <select id="num-characters" onChange={handleNumCharactersChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>

              <form onSubmit={handleCharacterSubmit}>
                {[...Array(numCharacters)].map((_, i) => (
                  <div key={i} className="character-row">
                    <input
                      type="text"
                      placeholder="Character Name"
                      className="name-input"
                    />
                    <input
                      type="text"
                      placeholder="Character Description"
                      className="description-input"
                    />
                  </div>
                ))}
                <button type="submit" id="gen-char-save">
                  Create character/s
                </button>
              </form>
            </div>
          )}
          {selectedTab === "tab3" && (
            <form onSubmit={handleSaveScenes}>
              <SceneManager />
              <button type="submit" id="gen-sceneinfo">
                Save scenes
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="gen-right">
        <h1 className="gen-head">
          Transform Your Stories into Stunning Comics !!!
        </h1>
        <div className="boxes-container">
          <div className="box-wrapper">
            <h2 className="box-heading">View in Browser</h2>
            <div className="box">
            <Link to="/view-browser"> {/* Use Link for navigation */}
              <img src={genpreview} alt="" />
              </Link>
            </div>
          </div>
          <div className="box-wrapper">
            <h2 className="box-heading">Download</h2>
            <div className="box" onClick={downloadImages}>
              <img src={gendown} alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="image-container">
        <img src={generatebg} alt="" className="generatebg" />
        <button className="gen-button" onClick={generateComic}>Click to Craft your Comic</button>
      </div>
    </div>
  );
};

export default Generate;
