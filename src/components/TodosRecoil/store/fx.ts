import AsyncStorage from '@react-native-async-storage/async-storage';
import {AtomEffect, DefaultValue} from 'recoil';
import {TodoProps} from '../../Todos/index.d';

export const createGetAsyncCustomEffect =
  <T>(
    getAsyncValue: () => T | DefaultValue | Promise<T | DefaultValue>,
  ): AtomEffect<T> =>
  ({setSelf}) => {
    setSelf(getAsyncValue());
  };

const keyTodos = 'recoil_todos';

export const getTodosAsync = createGetAsyncCustomEffect<TodoProps[]>(
  async () => {
    const value = await AsyncStorage.getItem(keyTodos);
    if (value != null)
      try {
        const arr = JSON.parse(value);
        if (Array.isArray(arr)) return arr;
      } catch {}

    return new DefaultValue();
  },
);

export const setTodosAsync: AtomEffect<TodoProps[]> = ({onSet}) => {
  onSet(newValue => {
    AsyncStorage.setItem(keyTodos, JSON.stringify(newValue));
  });
};
