import React from 'react';
import Categories from '../Categories';
import {TodoProps} from '../Todos/store';

type Props = {
  categories: TodoProps['categories'];
  onChange: (todo: Pick<TodoProps, 'categories'>) => void;
};
const TodoCategories = ({categories, onChange}: Props) => {
  return (
    <Categories
      categories={categories}
      onChange={(index, category) => {
        if (categories[index] == category) return;
        categories[index] = category;
        const newCategories = categories.filter(
          (c, i) => i == index || c != category,
        );
        onChange({categories: newCategories});
      }}
      onAdd={category =>
        onChange({
          categories: [...categories.filter(c => c && c != category), category],
        })
      }
      onRemove={category =>
        onChange({
          categories: categories.filter(c => c && c != category),
        })
      }
    />
  );
};

export default TodoCategories;
