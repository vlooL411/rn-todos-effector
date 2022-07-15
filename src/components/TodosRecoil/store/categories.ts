import {atom, DefaultValue, selector} from 'recoil';
import {CategoriesProps} from '../../Categories';

export const todosCategoriesState = atom<CategoriesProps['categories']>({
  key: 'todos_categories',
  default: [],
});

export const todosCategoryAdd = selector<string>({
  key: 'todos_categories_add',
  get: () => '',
  set: ({get, set}, category) => {
    if (category instanceof DefaultValue) return;
    const categories = get(todosCategoriesState);
    set(todosCategoriesState, [
      ...categories.filter(c => c && c != category),
      category,
    ]);
  },
});

export const todosCategoryChange = selector<{
  index: number;
  category: string;
}>({
  key: 'todos_categories_change',
  get: () => ({index: 0, category: ''}),
  set: ({get, set}, changeCategory) => {
    if (changeCategory instanceof DefaultValue) return;
    const {index, category} = changeCategory;
    const categories = get(todosCategoriesState);
    if (categories[index] == category) return;
    const newCategories = [...categories];
    newCategories[index] = category;
    set(
      todosCategoriesState,
      newCategories.filter((c, i) => index == i || c != category),
    );
  },
});

export const todosCategoryRemove = selector<string>({
  key: 'todos_categories_remove',
  get: () => '',
  set: ({get, set}, category) => {
    if (category instanceof DefaultValue) return;
    const categories = get(todosCategoriesState);
    set(
      todosCategoriesState,
      categories.filter(c => c && c != category),
    );
  },
});
