import {atom, DefaultValue, selector} from 'recoil';
import {TodoProps} from '../../Todos/index.d';
import {todosCategoriesState} from './categories';
import {todosCompletedState} from './completed';
import {getTodosAsync, setTodosAsync} from './fx';

export const todosState = atom<TodoProps[]>({
  key: 'todos',
  default: [],
  effects: [getTodosAsync, setTodosAsync],
});

export const todosAdd = selector<TodoProps>({
  key: 'todos_add',
  get: ({get}) => get(todosState)[0],
  set: ({get, set}, todo) => {
    if (todo instanceof DefaultValue) return;
    const todos = get(todosState);
    const isNext = todos.length == 0 || !!todos[0]?.title;
    if (!isNext) return set(todosState, [todo, ...todos.slice(1)]);
    set(todosState, [todo, ...todos]);
  },
});

export const todosChange = selector<Partial<TodoProps>>({
  key: 'todos_change',
  get: ({get}) => get(todosState)[0],
  set: ({get, set}, todo) => {
    if (todo instanceof DefaultValue) return;
    const todos = get(todosState);
    const todoIndex = todos.findIndex(({id}) => id == todo.id);
    if (todoIndex == -1) return;
    const newTodos = [...todos];
    newTodos[todoIndex] = {...newTodos[todoIndex], ...todo};
    set(todosState, newTodos);
  },
});

export const todosRemove = selector<Pick<TodoProps, 'id'>>({
  key: 'todos_remove',
  get: ({get}) => get(todosState)[0],
  set: ({get, set}, todo) => {
    if (todo instanceof DefaultValue) return;
    const todos = get(todosState);
    set(
      todosState,
      todos.filter(({id}) => id != todo.id),
    );
  },
});

export const filterTodos = selector<TodoProps[]>({
  key: 'filter_todos',
  get: ({get}) => {
    const todos = get(todosState);
    const todosCategories = get(todosCategoriesState);
    const todosCompleted = get(todosCompletedState);

    const filters: ((todo: TodoProps) => boolean)[] = [];

    if (todosCompleted != null)
      filters.push(todo => todo.completed == todosCompleted);
    if (todosCategories.filter(c => c).length != 0)
      filters.push(todo =>
        todo.categories.some(c => todosCategories.includes(c)),
      );

    if (filters.length == 0) return todos;
    if (filters.length == 1) {
      const filter = filters[0];
      return todos.filter(filter);
    }
    return todos.filter(todo => filters.every(f => f(todo)));
  },
});
