import { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal';

export const ChallengesContext = createContext();

export const ChallengesProvider = ({ children, ...rest}) => {
  const [ level, setLevel ] = useState(rest.level ?? 1);
  const [ currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [ challengesCompleted, setChallengesCompleted ] = useState(rest.challengesCompleted ?? 0);
  const [ activeChallenge, setActiveChallenge ] = useState(null);
  const [ isLevelModalOpen, setIsLevelModalOpen ] = useState(false)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  },[]);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  },[level,currentExperience,challengesCompleted]);

  const levelUp = () => {
    setLevel(level + 1);
    setIsLevelModalOpen(true);
  };

  const closeLevelModal = () => {
    setIsLevelModalOpen(false)
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
    closeLevelModal,
  }

  return (
    <ChallengesContext.Provider value={context}>
      {children}
      { isLevelModalOpen && <LevelUpModal /> }
    </ChallengesContext.Provider>
  );
}