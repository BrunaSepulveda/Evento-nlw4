import styles from '../styles/components/ChallengeBox.module.css'
import { useContext } from 'react';
import { ChallengesContext } from '../context/ChallengesContext';
import { CountdownContext } from '../context/CountdownContext';

export function ChallengeBox() {
  const { activeChallenge, resetChallenge, completedChallenge } = useContext(ChallengesContext);
  const { resetCountdown } = useContext(CountdownContext);

  const handleChallengeSuceeded = () => {
    completedChallenge();
    resetCountdown();
  };

  const handleChallengeFailed = () => {
    resetChallenge();
    resetCountdown();
  };

  return(
    <div className={ styles.challengeBoxContainer }>
      { activeChallenge ? (
        <div className={ styles.challengeActive }>
          <header>Ganhe { activeChallenge.amount } </header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt=""/>
            <strong> Novo desafio </strong>
            <p> { activeChallenge.description } </p>
            <footer>
              <button
                type="button"
                className={styles.challengeFailedButton}
                onClick={ handleChallengeFailed }
              >
                Falhei
              </button>
              <button
                type="button"
                className={styles.challengeSucceededButton}
                onClick={ handleChallengeSuceeded }
              >
                Completei
              </button>
            </footer>
          </main>
        </div>
      ) : (
        <div className={ styles.challengeNotActive }>
          <strong>Finalize um ciclo para receber um desafio.</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up"/>
            Avance de level completando desafios.
          </p>
        </div>
      )}
    </div>
  );
}