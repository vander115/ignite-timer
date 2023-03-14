import { HandPalm, Play } from 'phosphor-react';

import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles';
import { useEffect, useState } from 'react';
import { NewCycleForm } from './NewCycleForm';
import { CountDown } from './Countdown';

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  function handleCreateNewCycle({ task, minutesAmount }: NewCycleFormData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task,
      minutesAmount,
      startDate: new Date(),
    };

    setCycles((previus) => [...previus, newCycle]);
    setActiveCycleId(id);
    setAmountSecondsPassed(0);
    reset();
  }

  function handleInterruptCycle() {
    setCycles((previous) =>
      previous.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      }),
    );

    setActiveCycleId(null);
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  const task = watch('task');

  useEffect(() => {
    if (activeCycle) document.title = `${minutes}:${seconds} | Ignite Timer`;
  }, [minutes, seconds, activeCycle, activeCycleId]);

  console.log(cycles);

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <NewCycleForm />
        <CountDown />

        {activeCycle ? (
          <StopCountDownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton type="submit" disabled={!task}>
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  );
}
