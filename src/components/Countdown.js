import styles from '../styles/components/Countdown.module.css'
import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../context/ChallengesContext';

let countdownTimeout;
export function Countdown() {
  const { startNewChallenge } = useContext(ChallengesContext)

  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [ dezenaMinute, unidadeMinute ] = String(minutes).padStart(2,'0').split('');
  const [ dezenaSecond, unidadeSecond ] = String(seconds).padStart(2,'0').split('');

  const startCountdown = () => {
    setIsActive(true);
  }

  const resetCountdown = () => {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(25 * 60);
  }

  useEffect(() => {
    if(isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge()
    }
  }, [isActive, time])

  return (
    <div>
      <div className={ styles.countdownContainer }>
        <div>
          <span>{ dezenaMinute }</span>
          <span>{ unidadeMinute }</span>
        </div>
        <span>:</span>
        <div>
          <span>{ dezenaSecond }</span>
          <span>{ unidadeSecond }</span>
        </div>
      </div>
      <div>
        { hasFinished ? (
          <button
            disabled
            className={ styles.countdownButton }
          >
            Ciclo encerrado
          </button>
        ) : (
          <>
          { isActive ? (
            <button 
              type="button"
              className={ `${styles.countdownButton} ${styles.countdownButtonActive}` }
              onClick={ resetCountdown }
            >
              Abandonar ciclo
            </button>
            ) : (
              <button
                type="button"
                className={ styles.countdownButton }
                onClick={startCountdown}
              >
                Iniciar ciclo
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}