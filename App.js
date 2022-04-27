import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Counter } from './screens/Counter';
import { Graph } from './screens/Graph';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#F4D03F',
        tabBarInactiveTintColor: 'gray',
      })}
      >
        <Tab.Screen name="Counter" component={Counter} 
          options={{tabBarLabel: 'Counter',
          tabBarIcon: ({ color, size }) => (
          <Ionicons name="add-outline" color={color} size={size} />),}}
        />
        <Tab.Screen name="Graph" component={Graph}
          options={{tabBarLabel: 'Graph',
          tabBarIcon: ({ color, size }) => (
          <Ionicons name="analytics-outline" color={color} size={size} />),}}
         />
      </Tab.Navigator>
    </NavigationContainer>
  );
}