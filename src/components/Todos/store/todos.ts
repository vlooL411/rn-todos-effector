import {createEvent, createStore} from 'effector';
import {TodoProps} from '../index.d';
import {fetchTodosFromAsyncStorageFx, updateTodosInAsyncStorageFx} from './fx';

const todosInit = createEvent<TodoProps[]>('init todos');
export const todosAdd = createEvent<TodoProps>('add todo');
export const todosRemove = createEvent<Pick<TodoProps, 'id'>>('remove todo');
export const todosChange = createEvent<
  Partial<Omit<TodoProps, 'id'>> & Required<Pick<TodoProps, 'id'>>
>('change todo');

export const $todos = createStore<TodoProps[]>([])
  .on(todosAdd, (state, todo) => {
    const isNext = state.length == 0 || state[0]?.title;
    if (!isNext) return [todo, ...state.slice(1)];
    return [todo, ...state];
  })
  .on(todosRemove, (state, todo) => {
    return state.filter(({id}) => id != todo.id);
  })
  .on(todosChange, (state, todo) => {
    const index = state.findIndex(({id}) => id == todo.id);
    if (index == -1) return state;
    state[index] = {...state[index], ...todo};
    return [...state];
  })
  .on(todosInit, (_, todos) => todos);

//#region Fx Init
fetchTodosFromAsyncStorageFx();

fetchTodosFromAsyncStorageFx.done.watch(({result}) => {
  todosInit(result);
});

$todos.watch(state => {
  updateTodosInAsyncStorageFx(state);
});
//#endregion
