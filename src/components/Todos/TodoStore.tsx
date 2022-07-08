import React, {useCallback} from 'react';
import Todo from '../Todo/Todo';
import {TodoProps, todosChange, todosRemove} from './store';

const TodoStore = (props: TodoProps & {index: number}) => {
  const {id, index} = props;

  const onChange = useCallback(
    (todoChange: Partial<TodoProps>) => todosChange({...todoChange, id}),
    [id],
  );

  const onRemove = useCallback(() => todosRemove({id}), [id]);

  return (
    <Todo {...props} index={index} onChange={onChange} onRemove={onRemove} />
  );
};

export default TodoStore;
