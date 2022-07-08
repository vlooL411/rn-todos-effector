import {faPlusCircle, faXmarkCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {createRef, RefObject, useMemo, useRef, useState} from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import useBlurKeyboardHide from '../hooks/useBlurKeyboardHide';

export type CategoriesProps = {
  categories: string[];
  onChange: (index: number, value: string, prevValue: string) => void;
  onAdd: (category: string) => void;
  onRemove: (category: string) => void;
  onFocus?: () => void;
};
const Categories = ({
  categories,
  onChange,
  onAdd,
  onRemove,
  onFocus,
}: CategoriesProps) => {
  const [state] = useState({lastText: ''});
  const inputsRef = useRef<RefObject<TextInput>[]>([]);

  useBlurKeyboardHide({
    onBlur: () => inputsRef.current.forEach(i => i.current?.blur()),
  });

  const cats = useMemo(() => {
    inputsRef.current = [];
    return categories.map((category, index) => {
      const inputRef = createRef<TextInput>();
      inputsRef.current.push(inputRef);
      return (
        <View key={`${index}-${category}`} style={styles.categoryContainer}>
          <TextInput
            ref={inputRef}
            style={styles.category}
            numberOfLines={1}
            maxLength={30}
            placeholder="Enter category"
            onFocus={() => {
              state.lastText = category;
              onFocus?.();
            }}
            onChangeText={text => (state.lastText = text)}
            onBlur={() => {
              onChange(index, state.lastText, category);
            }}>
            {category}
          </TextInput>
          <TouchableOpacity onPress={() => onRemove(category)}>
            <FontAwesomeIcon icon={faXmarkCircle} size={22} />
          </TouchableOpacity>
        </View>
      );
    });
  }, [categories, onChange, onFocus, onRemove, state]);

  return (
    <View style={styles.container}>
      {cats}
      <TouchableOpacity
        style={styles.categoryContainer}
        onPress={() => {
          Keyboard.dismiss();
          onAdd('');
        }}>
        {cats.length == 0 ? (
          <Text style={[styles.category, styles.category_add]}>
            Add Category
          </Text>
        ) : (
          <FontAwesomeIcon
            icon={faPlusCircle}
            size={25}
            color={styles.category_add.backgroundColor}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    flexDirection: 'row',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 8,
  },
  category: {
    borderRadius: 8,
    backgroundColor: 'gray',
    paddingHorizontal: 6,
    paddingVertical: 4,
    marginRight: 3,
    fontSize: 17,
    height: 32,
  },
  category_add: {
    backgroundColor: '#c65123',
  },
});

export default Categories;
