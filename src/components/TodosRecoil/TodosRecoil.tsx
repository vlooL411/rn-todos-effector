import React, {useCallback} from 'react';
import {Text} from 'react-native';
import {
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil';
import Todos from '../Todos/Todos';
import {
  todosCategoriesState,
  todosCategoryAdd,
  todosCategoryChange,
  todosCategoryRemove,
} from './store/categories';
import {filterTodos, todosAdd} from './store/todos';
import TodoRecoil from './TodoRecoil';

const TodosRecoil = () => {
  const {state, contents: todos} = useRecoilValueLoadable(filterTodos);
  const todosCategories = useRecoilValue(todosCategoriesState);

  const onAdd = useSetRecoilState(todosAdd);
  const onCategoryAdd = useSetRecoilState(todosCategoryAdd);
  const onCategoryChange = useSetRecoilState(todosCategoryChange);
  const onCategoryRemove = useSetRecoilState(todosCategoryRemove);

  const onAddTodo = useCallback(() => {
    onAdd({
      id: `${Math.random()}`,
      title: '',
      completed: false,
      categories: todosCategories.filter(c => c),
    });
  }, [onAdd, todosCategories]);

  if (state == 'loading') return <Text>Loading...</Text>;
  return (
    <Todos
      todos={todos}
      RenderTodo={TodoRecoil}
      categories={{
        categories: todosCategories,
        onAdd: onCategoryAdd,
        onChange: (index, category) => onCategoryChange({index, category}),
        onRemove: onCategoryRemove,
      }}
      onAddTodo={onAddTodo}
    />
  );
};

export default TodosRecoil;
