import styles from '../styles/components/Countdown.module.css'
import { useContext } from 'react';
import { CountdownContext } from '../context/CountdownContext';

export function Countdown() {
  const { 
    minutes,
    seconds,
    hasFinished,
    isActive,
    startCountdown,
    resetCountdown
  } = useContext(CountdownContext);

  const [ dezenaMinute, unidadeMinute ] = String(minutes).padStart(2,'0').split('');
  const [ dezenaSecond, unidadeSecond ] = String(seconds).padStart(2,'0').split('');

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