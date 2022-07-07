import {useStore} from 'effector-react';
import React, {useCallback, useEffect} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import Todo, {AddTodo} from '../Todo';
import Categories from '../Categories';
import TodosHeader from './Header';
import {
  $todosCategories,
  todosCategoryAdd,
  todosCategoryChange,
  todosCategoryRemove,
} from './store';
import {$visibleTodos, todosAdd} from './store/todos';

const Todos = () => {
  const todosCategories = useStore($todosCategories);
  const visibleTodos = useStore($visibleTodos);

  const onAddTodo = useCallback(() => {
    todosAdd({
      id: `${Math.random()}`,
      title: '',
      categories: todosCategories.filter(c => c),
      completed: false,
    });
  }, [todosCategories]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TodosHeader />
      <Categories
        categories={todosCategories}
        onChange={(index, category) => todosCategoryChange({index, category})}
        onAdd={todosCategoryAdd}
        onRemove={todosCategoryRemove}
      />
      <FlatList
        data={visibleTodos}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => {
          return <Todo {...item} index={index} onPress={() => {}} />;
        }}
        ListHeaderComponent={<AddTodo onAdd={onAddTodo} />}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: '#fff', flex: 1, height: '100%'},
});

export default Todos;
