import {useStore} from 'effector-react';
import React, {useCallback} from 'react';
import Todos from '../Todos/Todos';
import {$visibleTodos, todosAdd} from './store';
import {
  $todosCategories,
  todosCategoryAdd,
  todosCategoryChange,
  todosCategoryRemove,
} from './store/categories';
import TodoStore from './TodoStore';

const TodosEffector = () => {
  const todos = useStore($visibleTodos);
  const todosCategories = useStore($todosCategories);

  const onAddTodo = useCallback(() => {
    console.log(todosCategories);
    todosAdd({
      id: `${Math.random()}`,
      title: '',
      completed: false,
      categories: todosCategories.filter(c => c),
    });
  }, [todosCategories]);

  return (
    <Todos
      todos={todos}
      RenderTodo={TodoStore}
      categories={{
        categories: todosCategories,
        onAdd: todosCategoryAdd,
        onChange: (index, category) => todosCategoryChange({index, category}),
        onRemove: todosCategoryRemove,
      }}
      onAddTodo={onAddTodo}
    />
  );
};

export default TodosEffector;
