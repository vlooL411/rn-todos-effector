import AsyncStorage from '@react-native-async-storage/async-storage';
import {createEffect} from 'effector';
import {TodoProps} from './index.d';

const keyAsyncTodos = 'todos';

export const fetchTodosFromAsyncStorageFx = createEffect({
  handler: async (): Promise<TodoProps[]> => {
    const item = await AsyncStorage.getItem(keyAsyncTodos);
    if (!item) return [];
    try {
      const todos = JSON.parse(item);
      if (Array.isArray(todos)) return todos;
    } catch (err) {
      console.error(err);
    }
    return [];
  },
});

export const updateTodosInAsyncStorageFx = createEffect({
  handler: async (todos: TodoProps[]) => {
    try {
      await AsyncStorage.setItem(keyAsyncTodos, JSON.stringify(todos), err => {
        if (err) console.error(err);
      });
    } catch (err) {
      console.error(err);
    }
  },
});
