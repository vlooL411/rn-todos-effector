import {combine, createApi, createStore} from 'effector';
import {$todosCategories} from './categories';
import {TodoProps} from './index.d';
import {$todos} from './todos';

type VisibilityFilter = (todos: TodoProps[]) => TodoProps[];
export const $visibilityFilter = createStore<VisibilityFilter>(todos => todos);

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
