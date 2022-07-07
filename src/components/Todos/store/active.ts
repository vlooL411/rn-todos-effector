import {createEvent, createStore} from 'effector';
import {TodoProps} from './todos';

export const todoActiveSet = createEvent<TodoProps>('todos active set');
export const todoActiveUnSet = createEvent('todos active unset');

export const $todoActive = createStore<TodoProps | null>(null)
  .on(todoActiveSet, (_, todo) => todo)
  .on(todoActiveUnSet, () => null);
