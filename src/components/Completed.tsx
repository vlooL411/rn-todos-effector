import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, TouchableOpacity} from 'react-native';

type Props = {value: boolean; onChange: (value: boolean) => void};
const Completed = ({value, onChange}: Props) => {
  const scale = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: value ? 0.82 : 0,
      useNativeDriver: true,
    }).start();
  }, [value]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onChange(!value)}
      activeOpacity={1}>
      <Animated.View style={[styles.completed, {transform: [{scale}]}]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {height: 25, width: 25, borderWidth: 1, borderRadius: 100},
  completed: {
    backgroundColor: '#c65123',
    borderRadius: 100,
    height: '100%',
    width: '100%',
  },
});

export default Completed;
