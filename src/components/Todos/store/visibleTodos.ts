import {createStore, sample} from 'effector';
import {TodoProps} from '../index.d';
import {$todosCategories} from './categories';
import {$todos} from './todos';

export const $visibleTodos = createStore<TodoProps[]>([]);

sample({
  clock: [$todosCategories, $todos],
  source: {todos: $todos, todosCategories: $todosCategories},
  fn: ({todos, todosCategories}) => {
    if (todosCategories.filter(c => c).length == 0) return todos;
    return todos.filter(
      ({categories}) => !!categories.find(c => todosCategories.includes(c)),
    );
  },
  target: $visibleTodos,
});
