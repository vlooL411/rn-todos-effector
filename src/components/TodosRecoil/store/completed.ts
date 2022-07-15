import {atom} from 'recoil';

export const todosCompletedState = atom<boolean | null>({
  key: 'todos_completed',
  default: null,
});
