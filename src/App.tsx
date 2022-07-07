import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import Todos from './components/Todos';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Todos />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
});

export default App;
