import React, {useEffect, useState} from 'react';
import Categories from '../Categories';
import {TodoProps} from '../Todos/store';

type Props = {
  categories: TodoProps['categories'];
  onChange: (todo: Pick<TodoProps, 'categories'>) => void;
  onFocus?: () => void;
};
const TodoCategories = ({categories, onChange, onFocus}: Props) => {
  const [cats, setCats] = useState(categories);

  useEffect(() => {
    setCats(categories);
  }, [categories]);

  console.log('rerender', cats);
  return (
    <Categories
      categories={cats}
      onFocus={onFocus}
      onChange={(index, category) => {
        if (cats[index] == category) return;
        cats[index] = category;
        const newCategories = cats.filter(
          (c, i) => i == index || c != category,
        );
        onChange({categories: newCategories});
      }}
      onAdd={category => {
        setCats([...cats.filter(c => c && c != category), category]);
      }}
      onRemove={category =>
        onChange({
          categories: cats.filter(c => c && c != category),
        })
      }
    />
  );
};

export default TodoCategories;
