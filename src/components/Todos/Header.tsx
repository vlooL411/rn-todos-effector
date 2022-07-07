import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const TodosHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todos</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: '#c65123',
  },
  title: {color: '#ffffffcc', fontSize: 22},
});

export default TodosHeader;
