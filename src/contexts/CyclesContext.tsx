import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { Cycle, CyclesReducer } from '../reducers/cycles/reducers';
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from '../reducers/cycles/actions';
import { differenceInSeconds } from 'date-fns';

interface ICreateCycleData {
  task: string;
  minutesAmount: number;
}

interface ICycleContextData {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  markCurrentCycleAsFinished: () => void;
  amountSecondsPassed: number;
  setSecondPassed: (seconds: number) => void;
  interruptCycle: () => void;
  createCreateNewCycle: (data: ICreateCycleData) => void;
}

export const CycleContext = createContext({} as ICycleContextData);

export function CycleContextProvider({ children }: { children: ReactNode }) {
  const [cyclesState, dispachCycle] = useReducer(
    CyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(
        '@ignite-timer:cyclesState-1.0.0',
      );

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON);
      }

      return initialState;
    },
  );

  const { cycles, activeCycleId } = cyclesState;

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const setSecondPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds);
  };

  const markCurrentCycleAsFinished = () => {
    dispachCycle(markCurrentCycleAsFinishedAction());
  };

  const createCreateNewCycle = ({ task, minutesAmount }: ICreateCycleData) => {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task,
      minutesAmount,
      startDate: new Date(),
    };

    dispachCycle(addNewCycleAction(newCycle));
    setAmountSecondsPassed(0);
  };

  const interruptCycle = () => {
    dispachCycle(interruptCurrentCycleAction());

    console.log('interruptCycle');
  };
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      const secondsDifference = differenceInSeconds(
        new Date(),
        new Date(activeCycle.startDate),
      );

      return secondsDifference;
    }

    return 0;
  });

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);

    localStorage.setItem('@ignite-timer:cyclesState-1.0.0', stateJSON);
  }, [cyclesState]);

  const value = {
    cycles,
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondPassed,
    interruptCycle,
    createCreateNewCycle,
  };

  return (
    <CycleContext.Provider value={value}>{children}</CycleContext.Provider>
  );
}

export function useCycle(): ICycleContextData {
  const context = useContext(CycleContext);

  if (!context) {
    throw new Error('useCycle must be used within a CycleContextProvider');
  }

  return context;
}
