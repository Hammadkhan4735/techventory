/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainHome from './src/screens/MainHome';
import Inventory from './src/screens/Inventory';
import Search from './src/screens/Search';
import Settings from './src/screens/Settings';
import PlaceOrder from './src/screens/PlaceOrder';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="MainHome">
      <Stack.Screen name="MainHome" component={MainHome} />
      <Stack.Screen name="Inventory" component={Inventory} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="PlaceOrder" component={PlaceOrder} />
    </Stack.Navigator>
  </NavigationContainer>
  );
};



export default App;
