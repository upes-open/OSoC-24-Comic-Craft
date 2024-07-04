import React from 'react';
import './home.css';  // Make sure this path is correct based on your actual structure
import Line1 from '../../assets/Line_1.png';  // Adjust path based on actual structure
import RightArrow from '../../assets/Right_arrow.png';  // Adjust path based on actual structure
// import LandingBottom from '../../assets/landing_bottom.jpeg'; 

const HomePage = () => {
    return (
        <div>
            <nav>
                {/* Add your navigation items here */}
            </nav>
            <div className="top-halfhome">
                <div className="texthome">
                    <div className="firsthome">WELCOME TO</div>
                    <div className="2nd">A WORLD</div>
                    <div className="3rd">OF WONDER AND WHIMSY!</div>
                    <img src={Line1} alt="" className="srchome" />
                </div>
                <div className="button-containerhome">
                    <button className="buttonhome">
                        LOGIN
                        <img src={RightArrow} alt="Arrow" />
                    </button>
                </div>
            </div>
            <div className="bottom-halfhome">
              {/* <img src={LandingBottom} alt="Bottom" /> */}
            </div>
        </div>
    );
};

export default HomePage;
