import React, {ReactElement} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Categories, {CategoriesProps} from '../Categories';
import {AddTodo} from '../Todo';
import TodosHeader from './Header';
import {TodoProps} from './index.d';

type Props = {
  todos: TodoProps[];
  categories: CategoriesProps;
  onAddTodo: () => void;
  RenderTodo: (props: TodoProps & {index: number}) => ReactElement;
};
const Todos = ({todos, categories, onAddTodo, RenderTodo}: Props) => {
  return (
    <View style={styles.flex}>
      <TodosHeader />
      <View style={styles.filterContainer}>
        <Text style={styles.filterText}>Filter categories:</Text>
        <Categories {...categories} />
      </View>
      <KeyboardAvoidingView style={styles.flex}>
        <ScrollView>
          <AddTodo onAdd={onAddTodo} />
          {todos.map((item, index) => (
            <RenderTodo key={item.id} index={index} {...item} />
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
