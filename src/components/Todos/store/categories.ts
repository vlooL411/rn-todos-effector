import {createEvent, createStore} from 'effector';

export const todosCategoryChange = createEvent<{
  index: number;
  category: string;
}>('todos category change');
export const todosCategoryAdd = createEvent<string>('todos category add');
export const todosCategoryRemove = createEvent<string>('todos category remove');

export const $todosCategories = createStore<string[]>([])
  .on(todosCategoryChange, (state, {index, category}) => {
    if (state[index] == category) return state;
    state[index] = category;
    return state.filter((c, i) => index == i || c != category);
  })
  .on(todosCategoryAdd, (state, category) => {
    return [...state.filter(c => c && c != category), category];
  })
  .on(todosCategoryRemove, (state, category) => {
    return state.filter(c => c && c != category);
  });
