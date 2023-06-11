import { Cycle } from './reducers';

export enum CyclesActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CYCLE = 'INTERRUPT_CYCLE',
  MARK_CYCLE_AS_FINISHED = 'MARK_CYCLE_AS_FINISHED',
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: CyclesActionTypes.ADD_NEW_CYCLE,
    payload: { newCycle },
  };
}

export function markCurrentCycleAsFinishedAction() {
  return {
    type: CyclesActionTypes.MARK_CYCLE_AS_FINISHED,
  };
}

export function interruptCurrentCycleAction() {
  return {
    type: CyclesActionTypes.INTERRUPT_CYCLE,
  };
}
