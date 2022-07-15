import React, {useCallback} from 'react';
import {useSetRecoilState} from 'recoil';
import Todo from '../Todo/Todo';
import {TodoProps} from '../Todos/index.d';
import {todosChange, todosRemove} from './store/todos';

const TodoRecoil = (props: TodoProps & {index: number}) => {
  const {id, index} = props;

  const onChange = useSetRecoilState(todosChange);
  const onRemove = useSetRecoilState(todosRemove);

  const change = useCallback(
    (todoChange: Partial<TodoProps>) => onChange({...todoChange, id}),
    [id, onChange],
  );

  const remove = useCallback(() => onRemove({id}), [id, onRemove]);

  return <Todo {...props} index={index} onChange={change} onRemove={remove} />;
};

export default TodoRecoil;
