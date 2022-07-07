import {useStore} from 'effector-react';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import useSwipe from '../../hooks/useSwipe';
import Completed from '../Completed';
import ModalYesNot from '../Modal/ModalYesNot';
import {TodoProps, todosChange, todosRemove} from '../Todos/store';
import {
  $todoActive,
  todoActiveSet,
  todoActiveUnSet,
} from '../Todos/store/active';
import TodoCategories from './TodoCategories';

const SWIPE_WIDTH = 80;

type Props = TodoProps & {index: number; onPress: () => void};
const Todo = (props: Props) => {
  const {id, index, completed, title, categories} = props;
  const active = useStore($todoActive)?.id == id;
  const [state] = useState({lastTextTitle: title});
  const [requestRemove, setRequestRemove] = useState(false);

  const {width} = useWindowDimensions();
  const translateX = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, []);

  const onChange = useCallback(
    (todo: Partial<TodoProps>) => todosChange({...todo, id}),
    [id],
  );

  const {panHandlers, translateSwipe} = useSwipe({
    offset: SWIPE_WIDTH,
    onLeft: () => setRequestRemove(true),
    onRight: () => (active ? todoActiveUnSet() : todoActiveSet(props)),
  });

  const range = [0, 0, SWIPE_WIDTH];
  const translateXClamp = translateSwipe.interpolate({
    inputRange: range,
    outputRange: range,
    extrapolate: 'clamp',
  });

  return (
    <View>
      {index != 0 && <View style={styles.line} />}
      <View style={styles.remove}>
        <Text style={styles.removeText}>Remove</Text>
      </View>
      <Animated.View
        style={[
          styles.contentContainer,
          {transform: [{translateX: translateXClamp}]},
        ]}
        {...panHandlers}>
        <Animated.View style={{transform: [{translateX}]}}>
          <View style={styles.titleContainer}>
            <Completed
              value={completed}
              onChange={value => onChange({completed: value})}
            />
            <TextInput
              onChangeText={text => (state.lastTextTitle = text)}
              onBlur={() => onChange({title: state.lastTextTitle})}
              style={styles.title}
              placeholder="Title"
              placeholderTextColor="#0000004b">
              {title}
            </TextInput>
          </View>
          <TodoCategories categories={categories} onChange={onChange} />
        </Animated.View>
      </Animated.View>
      {requestRemove && (
        <ModalYesNot
          title="Remove Todo"
          onYes={() => {
            setRequestRemove(false);
            todosRemove(props);
          }}
          onNot={() => setRequestRemove(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    backgroundColor: '#d7d7d7',
    height: 2,
    width: '96%',
    borderRadius: 100,
    alignSelf: 'center',
  },
  contentContainer: {
    backgroundColor: '#fff',
    paddingVertical: '.5%',
    paddingHorizontal: '2%',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  titleContainer: {flexDirection: 'row', alignItems: 'center'},
  title: {
    flex: 1,
    fontSize: 20,
    color: '#000',
    padding: 8,
    marginLeft: 6,
  },
  remove: {
    position: 'absolute',
    left: 10,
    width: SWIPE_WIDTH - 10,
    height: '100%',
    justifyContent: 'center',
  },
  removeText: {color: 'red', fontSize: 18, fontWeight: '500'},
});

export default Todo;
