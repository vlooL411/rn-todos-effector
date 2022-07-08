import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {memo, useCallback, useRef} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity} from 'react-native';

type Props = {onAdd: () => void};
export const AddTodo = memo(({onAdd}: Props) => {
  const anim = useRef(new Animated.Value(1)).current;

  const onAnim = useCallback(
    (dir: boolean) => {
      Animated.spring(anim, {
        toValue: dir ? 1 : 0,
        useNativeDriver: true,
      }).start();
    },
    [anim],
  );

  const rotate = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  return (
    <TouchableOpacity
      onPressIn={() => onAnim(true)}
      onPress={onAdd}
      onPressOut={() => onAnim(false)}
      style={styles.container}>
      <Animated.View style={{transform: [{rotate}]}}>
        <FontAwesomeIcon icon={faPlus} color={'#c65123'} size={16} />
      </Animated.View>
      <Text style={styles.text}>Add Todo</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {color: '#283f83', fontSize: 16, marginLeft: 4},
});
