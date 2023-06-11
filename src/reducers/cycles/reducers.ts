import { CyclesActionTypes } from './actions';
import { produce } from 'immer';

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}
interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export function CyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case CyclesActionTypes.ADD_NEW_CYCLE:
      return produce(state, (draftState) => {
        draftState.cycles.push(action.payload.newCycle);
        draftState.activeCycleId = action.payload.newCycle.id;
      });

    case CyclesActionTypes.INTERRUPT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      );

      if (currentCycleIndex < 0) {
        return state;
      }
      return produce(state, (draftState) => {
        draftState.activeCycleId = null;
        draftState.cycles[currentCycleIndex].interruptedDate = new Date();
      });
    }

    case CyclesActionTypes.MARK_CYCLE_AS_FINISHED: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      );
      if (currentCycleIndex === 0) {
        return state;
      }
      return produce(state, (draftState) => {
        draftState.activeCycleId = null;
        draftState.cycles[currentCycleIndex].finishedDate = new Date();
      });
    }
    default:
      return state;
  }
}
