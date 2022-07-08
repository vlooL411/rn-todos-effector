import {faPlusCircle, faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import useBlurKeyboardHide from '../../hooks/useBlurKeyboardHide';
import useSwipe from '../../hooks/useSwipe';
import Completed from '../Completed';
import ModalYesNot from '../Modal/ModalYesNot';
import TodoCategories from './TodoCategories';

const SWIPE_WIDTH = 40;

type TodoProps = {
  completed: boolean;
  title: string;
  categories: string[];
};

type Props = TodoProps & {
  index: number;
  onFocus: () => void;
  onChange: (todo: Partial<TodoProps>) => void;
  onRemove: () => void;
};
const Todo = ({
  index,
  completed,
  title,
  categories,
  onFocus,
  onChange,
  onRemove,
}: Props) => {
  const [state] = useState({lastTextTitle: title});
  const [requestRemove, setRequestRemove] = useState(false);

  const {width} = useWindowDimensions();
  const translateX = useRef(new Animated.Value(-width)).current;
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, [translateX]);

  useBlurKeyboardHide({
    onBlur: () => inputRef.current?.blur(),
  });

  const isCategories = categories.length != 0;
  const {panHandlers, translateSwipe} = useSwipe({
    offset: SWIPE_WIDTH,
    onLeft: () => setRequestRemove(true),
    onRight: () => {
      if (isCategories) return;
      onChange({categories: [...categories, '']});
    },
  });

  const range = [isCategories ? 0 : -SWIPE_WIDTH, 0, SWIPE_WIDTH];
  const translateXClamp = translateSwipe.interpolate({
    inputRange: range,
    outputRange: range,
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <View style={styles.containerActions}>
        <FontAwesomeIcon icon={faTrash} size={25} color="#c33131" />
        <FontAwesomeIcon icon={faPlusCircle} size={25} color="#4ccb4c" />
      </View>
      <View style={styles.addCategory}>
        <Text
          style={styles.addCategoryText}
          numberOfLines={1}
          adjustsFontSizeToFit>
          Add Category
        </Text>
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
              ref={inputRef}
              onFocus={onFocus}
              onChangeText={text => (state.lastTextTitle = text)}
              onBlur={() => onChange({title: state.lastTextTitle})}
              style={styles.title}
              placeholder="Title"
              placeholderTextColor="#0000004b">
              {title}
            </TextInput>
          </View>
        </Animated.View>

        {isCategories && (
          <TodoCategories
            categories={categories}
            onChange={onChange}
            onFocus={onFocus}
          />
        )}
      </Animated.View>
      {requestRemove && (
        <ModalYesNot
          title="Remove Todo"
          onYes={() => {
            setRequestRemove(false);
            onRemove();
          }}
          onNot={() => setRequestRemove(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {width: '100%'},
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
  containerActions: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
});

export default Todo;
