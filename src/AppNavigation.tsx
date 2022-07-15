import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import TodosNavigation from './TodosNavigation';

const AppNavigation = () => {
  return (
    <NavigationContainer
      theme={{
        colors: {
          background: '#fff',
          border: '#fff',
          card: '#fff',
          notification: '#fff',
          primary: '#000',
          text: '#000',
        },
        dark: false,
      }}>
      <TodosNavigation />
    </NavigationContainer>
  );
};

export default AppNavigation;
