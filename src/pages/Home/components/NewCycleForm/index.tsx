import { useFormContext } from 'react-hook-form';
import { AmountMinutesInput, FormContainer, TaskInput } from './styles';
import { useCycle } from '../../../../contexts/CyclesContext';

export function NewCycleForm() {
  const { activeCycle } = useCycle();
  const { register } = useFormContext();

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
