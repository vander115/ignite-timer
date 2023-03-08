import { HandPalm, Play } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { differenceInSeconds } from 'date-fns';

import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles';
import { useEffect, useState } from 'react';
import { NewCycleForm } from './NewCycleForm';
import { CountDown } from './Countdown';

const newCiclyFormSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa!'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser no minimo de 5 minutos')
    .max(60, 'O ciclo precisa ser no maximo de 60 minutos'),
});

type NewCycleFormData = zod.infer<typeof newCiclyFormSchema>;

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
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCiclyFormSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

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
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  const task = watch('task');

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        );

        if (secondsDifference >= totalSeconds) {
          setCycles((previous) =>
            previous.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() };
              } else {
                return cycle;
              }
            }),
          );

          clearInterval(interval);
          setAmountSecondsPassed(totalSeconds);
        } else {
          setAmountSecondsPassed(secondsDifference);
        }
      });
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle]);

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
