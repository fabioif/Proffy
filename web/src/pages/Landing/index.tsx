import React from 'react';

import logo from '../../assets/images/logo.svg';
import landingimg from '../../assets/images/landing.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHertIcon from '../../assets/images/icons/purple-heart.svg';

import './styles.css';

function  Landing(){
return (
    <div id="page-landing">
        <div id="page-landing-content" className="container">
            <div className="logo-container">
                <img src={logo} alt="Proffy"/>
                <h2>Sua plataforma de estudos online.</h2>
            </div>
            <img src={landingimg}
             alt="Platafirna de estudos"
             />

            <div className="buttons-container"> 
            <a href="" className="study">
                <img src={studyIcon} alt="Estudar"/>
            </a>

            <a href="" className="give-classes">
                <img src={giveClassesIcon} alt="Estudar"/>
            </a>
            </div>
                <span className="total-connections"> 
                Total de 200 conexões já realizadas <img src={purpleHertIcon} alt="Coração roxo"/>
                
                </span>
        </div>
    </div>


)
}

export default Landing;