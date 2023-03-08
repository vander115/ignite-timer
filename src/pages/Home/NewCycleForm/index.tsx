import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import { AmountMinutesInput, FormContainer, TaskInput } from './styles';

export function NewCycleForm() {
  const newCiclyFormSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa!'),
    minutesAmount: zod
      .number()
      .min(5, 'O ciclo precisa ser no minimo de 5 minutos')
      .max(60, 'O ciclo precisa ser no maximo de 60 minutos'),
  });

  type NewCycleFormData = zod.infer<typeof newCiclyFormSchema>;

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCiclyFormSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

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

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em:</label>
      <TaskInput
        type="text"
        list="task-sugestions"
        id="task"
        disabled={!!activeCycle}
        placeholder="Nome do projeto"
        {...register('task')}
      />

      <datalist id="task-sugestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
        <option value="Projeto 4" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <AmountMinutesInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />
      <span>minutos.</span>
    </FormContainer>
  );
}
