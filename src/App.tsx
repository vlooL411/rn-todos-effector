import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import TodosEffector from './components/Todos/TodosEffector';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TodosEffector />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
});

export default App;
