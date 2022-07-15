import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Image, ImageSourcePropType} from 'react-native';
import {RecoilIcon} from '../assets';
import TodosEffector from './components/Todos/TodosEffector';
import {TodosRecoil} from './components/TodosRecoil';

export type TodosParamList = {
  Effector: undefined;
  Recoil: undefined;
};

const TodosTab = createBottomTabNavigator<TodosParamList>();

const TabIcon = ({
  source,
  size,
}: {
  source: ImageSourcePropType;
  size: number;
}) => {
  const width = '100%';
  return (
    <Image source={source} style={{height: size, width}} resizeMode="contain" />
  );
};

const TodosNavigation = () => {
  return (
    <TodosTab.Navigator screenOptions={{header: () => null}}>
      <TodosTab.Screen
        name="Effector"
        component={TodosEffector}
        options={{
          tabBarIcon: ({size}) => (
            <TabIcon
              source={{uri: 'https://effector.dev/img/comet.png'}}
              size={size}
            />
          ),
        }}
      />
      <TodosTab.Screen
        name="Recoil"
        component={TodosRecoil}
        options={{
          tabBarIcon: ({size}) => <TabIcon source={RecoilIcon} size={size} />,
        }}
      />
    </TodosTab.Navigator>
  );
};

export default TodosNavigation;
