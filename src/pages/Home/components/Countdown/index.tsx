import { useEffect } from 'react';
import { CountDownContainer, Separator } from './styles';
import { differenceInSeconds } from 'date-fns';

import { useCycle } from '../../../../contexts/CyclesContext';
export function CountDown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondPassed,
  } = useCycle();

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  useEffect(() => {
    if (activeCycleId) {
      document.title = `${minutes}:${seconds} | Ignite Timer`;
    } else {
      document.title = 'Ignite Timer';
    }
  }, [minutes, seconds, activeCycle, activeCycleId]);

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        );

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished();

          clearInterval(interval);
          setSecondPassed(totalSeconds);
        } else {
          setSecondPassed(secondsDifference);
        }
      });
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, markCurrentCycleAsFinished, setSecondPassed]);

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  );
}
