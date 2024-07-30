import React from 'react';
import videoSrc from '../../assets/guide.mp4'; // Adjust the path as necessary
import './userguide.css'; // Import the CSS file

const VideoComponent = () => {
  return (
    <div>
      <div className="video-container">
        <h1>A Wizard's Guide To Crafting Magic</h1>
        <video controls width="700" className="video">
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <hr />
      <div className="sections-container">
        <div className="section characters-section">
          <h2 className="characters-heading">Characters</h2>
          <ul className="characters-list">
            <li>Create up to 3 characters for your tale.</li>
            <li>Provide only the <b>physical description</b> of the characters and not the actions.</li>
            <li>Take note of the spellings, uppercase/lowercase details, etc.</li>
          </ul>
        </div>
        <div className="section scenes-section">
          <h2 className="scenes-heading">Scenes</h2>
          <ul className="scenes-list">
            <li>Create up to 6 scenes for your comic.</li>
            <li><b>DO NOT</b> use any pronouns like 'he/she/they/them' for scene descriptions. Stick to character names.</li>
            <li>Do not reference previous scenes. Build each scene like a new one, with detailed descriptions.</li>
          </ul>
        </div>
        <div className="section storyboard-section">
          <h2 className="storyboard-heading">Storyboard</h2>
          <ul className="storyboard-list">
            <li>Provide the email ID at which you wish to receive the generated comic.The specified email may or may not be the same as the email used for account creation.</li>
            <li>Only Gmail addresses (ending in @gmail.com) are allowed.Other email providers are not supported.</li>
            <li>Describe the storyline in a way that gives an overview and sums up all the scenes thus interconnecting them.</li>
          </ul>
        </div>
      </div>
      <div className="instructions-container">
      <h2 className="instructions-heading">Instructions for the Right Pane</h2>
        <ul className="instructions-list">
          <li>Click the buttons in a sequential order only <br /> <i>Generate Character --> Download --> Click to Craft your Comic </i></li>
          <li>This section will take time to bring in your best results, so hang in tight!</li>
          <li>Once the loading screen disappears, you are free to click the next button.</li>
          <li>Download feature gives you a sneak peek of what is cooking for you!</li>
          <li>Once a comic is done, refresh the page to craft another comic.</li>
        </ul>
      </div>
      <div className="happy-crafting-container">
        <h1>Happy Crafting!</h1>
      </div>
    </div>
  );
};

export default VideoComponent;
