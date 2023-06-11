import { HandPalm, Play } from 'phosphor-react';
import * as zod from 'zod';
import { NewCycleForm } from './components/NewCycleForm';
import { CountDown } from './components/Countdown';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles';
import { useCycle } from '../../contexts/CyclesContext';

export function Home() {
  const { activeCycle, createCreateNewCycle, interruptCycle } = useCycle();

  const newCiclyFormSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa!'),
    minutesAmount: zod
      .number()
      .min(5, 'O ciclo precisa ser no minimo de 5 minutos')
      .max(60, 'O ciclo precisa ser no maximo de 60 minutos'),
  });

  type NewCycleFormData = zod.infer<typeof newCiclyFormSchema>;

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCiclyFormSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    createCreateNewCycle(data);
    reset();
  };

  const task = watch('task');

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <CountDown />

        {activeCycle ? (
          <StopCountDownButton type="button" onClick={interruptCycle}>
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
