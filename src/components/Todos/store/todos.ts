import {combine, createApi, createEvent, createStore} from 'effector';
import {$todosCategories} from './categories';
import {fetchTodosFromAsyncStorageFx, updateTodosInAsyncStorageFx} from './fx';
import {TodoProps} from './index.d';

export * from './index.d';

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

export const $visibilityFilter = createStore<
  (todos: TodoProps[]) => TodoProps[]
>(todos => todos);

export const todosShow = createApi($visibilityFilter, {
  all: () => todos => {
    const todosCategories = $todosCategories.getState();
    if (todosCategories.filter(c => c).length == 0) return todos;
    return todos.filter(
      ({categories}) => !!categories.find(c => todosCategories.includes(c)),
    );
  },
  completed: () => todos => todos.filter(({completed}) => completed),
  uncompleted: () => todos => todos.filter(({completed}) => !completed),
});

$todosCategories.watch(() => {
  todosShow.all();
});

export const $visibleTodos = combine(
  $todos,
  $visibilityFilter,
  (todos, filter) => filter(todos),
);

//#region Fx Init
fetchTodosFromAsyncStorageFx();

fetchTodosFromAsyncStorageFx.done.watch(({result}) => {
  todosInit(result);
});

$todos.watch(state => {
  updateTodosInAsyncStorageFx(state);
});
//#endregion
