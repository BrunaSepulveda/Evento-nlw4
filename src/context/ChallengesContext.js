import { createContext, useState } from 'react';
import challenges from '../../challenges.json'

export const ChallengesContext = createContext();

export const ChallengesProvider = ({ children }) => {
  const [ level, setLevel ] = useState(1);
  const [ currentExperience, setCurrentExperience] = useState(0);
  const [ challengesCompleted, setChallengesCompleted ] = useState(0);
  const [ activeChallenge, setActiveChallenge ] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  const startNewChallenge = () => {
    const radomChalengeIndex = Math.floor(Math.random() * challenges.length);
    const challengesSelected = challenges[radomChalengeIndex];

    setActiveChallenge(challengesSelected)
  };

  const resetChallenge = () => {
    setActiveChallenge(null);
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
  }

  return (
    <ChallengesContext.Provider value={context}>
      {children}
    </ChallengesContext.Provider>
  );
}