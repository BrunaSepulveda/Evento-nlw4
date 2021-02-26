import styles from '../styles/components/LevelUpModal.module.css';
import { useContext } from 'react';
import { ChallengesContext } from '../context/ChallengesContext';
import { CountdownContext } from '../context/CountdownContext';

export const LevelUpModal = () => {
  const { level, closeLevelModal } = useContext(ChallengesContext)
  return(
    <div className={ styles.levelModalOverlay }>
      <div className={ styles.levelModalContainer }>
        <header>{ level }</header>
        <strong>
          Parabéns
        </strong>
        <p>
          Você alcançou um novo level.
        </p>
        <button
          type="button"
          onClick={ closeLevelModal }
        >
          <img src="/icons/close.svg" alt="Fechar modal"/>
        </button>
      </div>
    </div>
  );
};