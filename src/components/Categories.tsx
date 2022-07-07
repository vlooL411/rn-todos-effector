import {faXmarkCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useMemo, useState} from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = {
  categories: string[];
  onChange: (index: number, value: string, prevValue: string) => void;
  onAdd: (category: string) => void;
  onRemove: (category: string) => void;
};
const Categories = ({categories, onChange, onAdd, onRemove}: Props) => {
  const [state] = useState({lastText: ''});

  const cats = useMemo(() => {
    return categories.map((category, index) => {
      return (
        <View key={`${index}-${category}`} style={styles.categoryContainer}>
          <TextInput
            style={styles.category}
            numberOfLines={1}
            maxLength={30}
            placeholder="enter category"
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
  }, [categories]);

  return (
    <View style={styles.container}>
      {cats}
      <TouchableOpacity
        style={styles.categoryContainer}
        onPress={() => {
          Keyboard.dismiss();
          onAdd('');
        }}>
        <Text style={[styles.category, styles.category_add]}>
          {'Add Category'}
        </Text>
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
