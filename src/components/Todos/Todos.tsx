import {useStore} from 'effector-react';
import React, {useCallback, useRef} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
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

  const flatRef = useRef<FlatList>(null);

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
      behavior={Platform.OS == 'ios' ? 'padding' : undefined}>
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
      <View>
        <FlatList
          ref={flatRef}
          data={visibleTodos}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            return (
              <Todo
                {...item}
                index={index}
                onFocus={() => {
                  flatRef.current?.scrollToItem({
                    item,
                    animated: true,
                    viewPosition: 0,
                  });
                }}
              />
            );
          }}
          ListHeaderComponent={<AddTodo onAdd={onAddTodo} />}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  filterContainer: {},
  filterText: {fontSize: 18, color: '#000', paddingLeft: 10, paddingTop: 8},
});

export default Todos;
