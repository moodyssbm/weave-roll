import React, {
  useEffect,
  useState
} from 'react';

import {AiFillFire} from 'react-icons/ai';
import {FaWind,
  FaMountain,
  FaWater,
  FaDiceOne,
  FaDiceTwo,
  FaDiceThree,
  FaDiceFour,
  FaDiceFive,
  FaDiceSix,
} from 'react-icons/fa';

let die = ['fire', 'water', 'wind', 'earth', 'wild', 'fail'];

export default function App() {
  let [topText, setTopText] = useState('');
  let [gameState, setGameState] = useState('');
  let [actionPage, setActionPage] = useState(<p>Loading...</p>);
  let [challengeType, setChallengeType] = useState('');
  let [diceToRoll, setDiceToRoll] = useState(0);
  let [rolls, setRolls] = useState({
    'fire': 0,
    'water': 0,
    'earth': 0,
    'wind': 0,
    'wild': 0,
    'fail': 0
  });

  useEffect(() => {
    switch(gameState) {
      case 'new':
        setTopText(`Weave Roller`);
        setActionPage(newChallengePage);
        setRolls({
          'fire': 0,
          'water': 0,
          'earth': 0,
          'wind': 0,
          'wild': 0,
          'fail': 0
        });

        break;
      case 'how':
        setTopText('Argue for more!');
        setActionPage(howManyPage);
        break;
      case 'results': 
        setTopText("How'd you do?");
        setActionPage(resultsPage);
        break;
      default:
        setTopText("Oh no.");
        setActionPage(<p>Something went wrong</p>);
        break;
    }
  }, [gameState]);

  let selectChallenge = (ct) => {
    setChallengeType(ct);
    setGameState('how');
  };

  let selectHowMany = (n) => {
    setRolls({
      'fire': 0,
      'water': 0,
      'earth': 0,
      'wind': 0,
      'wild': 0,
      'fail': 0
    });

    while(n > 0) {
      let rnd = Math.floor(Math.random() * 6);
      rolls[die[rnd]]++;

      if(die[rnd] === 'wild') {
        n++;
      }

      n--;
    }

    setRolls(rolls);
    console.log(rolls);
    setGameState('results');
  }

  let newChallengePage = <div className="newChallengePage">
    <p className="pageText">Select a Challenge type:</p>
    <p className="ncpButtons">
      <AiFillFire onClick={() => selectChallenge('fire')} className="icon-btn fire"/>
      <FaWind onClick={() => selectChallenge('wind')} className="icon-btn wind"/>
      <FaMountain onClick={() => selectChallenge('earth')} className="icon-btn earth"/>
      <FaWater onClick={() => selectChallenge('water')} className="icon-btn water"/>
    </p>
  </div>;

  let howManyPage = <div>
    <p className="pageText">Select how many dice to roll:</p>
    <FaDiceOne className={`icon-btn ${challengeType}`} onClick={() => {selectHowMany(1)}}/>
    <FaDiceTwo className={`icon-btn ${challengeType}`} onClick={() => {selectHowMany(2)}}/>
    <FaDiceThree className={`icon-btn ${challengeType}`} onClick={() => {selectHowMany(3)}}/>
    <FaDiceFour className={`icon-btn ${challengeType}`} onClick={() => {selectHowMany(4)}}/>
    <FaDiceFive className={`icon-btn ${challengeType}`} onClick={() => {selectHowMany(5)}}/>
    <FaDiceSix className={`icon-btn ${challengeType}`} onClick={() => {selectHowMany(6)}}/>
  </div>;

  let weave = <span>
    <span className="fire">W</span>
    <span className="wind">e</span>
    <span>a</span>
    <span className="earth">v</span>
    <span className="water">e</span>
  </span>;

  let resultsPage = <div>
    <h3>
      You rolled <span className={challengeType}>{rolls[challengeType] + rolls['wild']} {challengeType}</span>, {rolls['wild']} of which were Weave rolls.
    </h3>

    <button className={`action-btn ${challengeType}-btn`} onClick={() => setGameState('new')}>Roll Again!</button>

    <p className="rollResults">Full rolls below:</p>
<p className="rollResults">W {rolls['wild']} ~ <AiFillFire/> {rolls['fire']} ~ <FaWind/> {rolls['wind']} ~ <FaMountain/> {rolls['earth']} ~ <FaWater/> {rolls['water']} ~ X {rolls['fail']}</p>
  </div>;

  // Init any necessary state values
  useEffect(() => setGameState('new'), []);

  return(
    <React.Fragment>
      <h1 className="topText">{topText}</h1>
      {actionPage}
    </React.Fragment>
  );
}