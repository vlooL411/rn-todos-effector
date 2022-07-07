import {useStore} from 'effector-react';
import React, {useCallback} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Categories from '../Categories';
import Todo, {AddTodo} from '../Todo';
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
    <View style={styles.flex}>
      <TodosHeader />
      <View style={styles.filterContainer}>
        <Text style={styles.filterText}>Filter categories:</Text>
        <Categories
          categories={todosCategories}
          onChange={(index, category) => todosCategoryChange({index, category})}
          onAdd={todosCategoryAdd}
          onRemove={todosCategoryRemove}
        />
      </View>
      <KeyboardAvoidingView style={styles.flex}>
        <ScrollView>
          <AddTodo onAdd={onAddTodo} />
          {visibleTodos.map((item, index) => (
            <Todo key={item.id} {...item} index={index} onFocus={() => {}} />
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  filterContainer: {},
  filterText: {fontSize: 18, color: '#000', paddingLeft: 10, paddingTop: 8},
});

export default Todos;
