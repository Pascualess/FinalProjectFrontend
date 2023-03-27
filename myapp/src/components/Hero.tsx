import './Hero.css';
import React from 'react';


function Hero () {
    return (<>       
        <div className="hero">
            <img alt="heroImg" src="roadimg.png" />

        <div className="hero-text">
        <h1>Let's plan your trip!</h1>
        <h2>We can help you find exciting things to do at your destination.</h2>
        </div>
        </div>
    </>
    )
}

export default Hero;