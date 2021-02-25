import { createContext, useEffect, useState } from 'react';
import challenges from '../../challenges.json'

export const ChallengesContext = createContext();

export const ChallengesProvider = ({ children }) => {
  const [ level, setLevel ] = useState(1);
  const [ currentExperience, setCurrentExperience] = useState(0);
  const [ challengesCompleted, setChallengesCompleted ] = useState(0);
  const [ activeChallenge, setActiveChallenge ] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  },[]);

  const levelUp = () => {
    setLevel(level + 1);
  };

  const startNewChallenge = () => {
    const radomChalengeIndex = Math.floor(Math.random() * challenges.length);
    const challengesSelected = challenges[radomChalengeIndex];

    setActiveChallenge(challengesSelected);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo Desafio', {
        body: `Valendo ${ challengesSelected.amount }xp!`
      });
    }
  };

  const resetChallenge = () => {
    setActiveChallenge(null);
  };

  const completedChallenge = () => {
    if (!activeChallenge) {
      return;
    }
    const { amount } = activeChallenge;
    let finalExperience = currentExperience + amount;
    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }
    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  };

  const context = {
    level,
    currentExperience,
    challengesCompleted,
    activeChallenge,
    challenges,
    experienceToNextLevel,
    startNewChallenge,
    resetChallenge,
    completedChallenge,
  }

  return (
    <ChallengesContext.Provider value={context}>
      {children}
    </ChallengesContext.Provider>
  );
}