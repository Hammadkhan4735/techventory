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
  StatusBar,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainHome from './src/screens/MainHome';
import Inventory from './src/screens/Inventory';
import Search from './src/screens/Search';
import Settings from './src/screens/Settings';
import PlaceOrder from './src/screens/PlaceOrder';
import Images from './src/assets/Images';
import {colors, typography} from './src/styles';
import SvgUri from 'react-native-svg-uri';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={colors.PRIMARY}
        barStyle="light-content"
      />
      <Stack.Navigator
        initialRouteName="MainHome"
        screenOptions={{headerTitleAlign: 'center'}}>
        <Stack.Screen
          name="MainHome"
          component={MainHome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Inventory"
          component={Inventory}
          options={{
            headerBackImage: () => <NavBarLeftButton />,
            headerStyle: mstyles.headerBackground,
            headerTitleStyle: mstyles.headerText,
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerBackImage: () => <NavBarLeftButton />,
            headerStyle: mstyles.headerBackground,
            headerTitleStyle: mstyles.headerText,
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerBackImage: () => <NavBarLeftButton />,
            headerStyle: mstyles.headerBackground,
            headerTitleStyle: mstyles.headerText,
          }}
        />
        <Stack.Screen
          name="PlaceOrder"
          component={PlaceOrder}
          options={{
            headerBackImage: () => <NavBarLeftButton />,
            headerRight: () => <NavBarRightButton />,
            headerStyle: mstyles.headerBackground,
            headerTitleStyle: mstyles.headerText,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const NavBarLeftButton = () => {
  return <SvgUri width="32" height="20" source={Images.ic_back} />;
};
const NavBarRightButton = () => {
  return <TouchableOpacity style={mstyles.buttonBlue}>
  <Text style={[mstyles.textStyle,{paddingTop:5,paddingBottom:5,paddingLeft:10,paddingRight:10}]}>
      Export
  </Text>
</TouchableOpacity>;
};

const mstyles = StyleSheet.create({
  headerText: {
    fontFamily: typography.FONT_FAMILY_BOLD,
    fontWeight: typography.FONT_WEIGHT_REGULAR,
    fontSize: typography.FONT_SIZE_18,
    color: colors.WHITE,
  },
  headerBackground: {
    backgroundColor: colors.PRIMARY,
  },
  buttonBlue: {
   
    borderRadius:4,
    marginRight:10,
    backgroundColor: colors.BLUEDARK,
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  textStyle: {
    fontFamily: typography.FONT_FAMILY_BOLD,
    fontWeight: typography.FONT_WEIGHT_REGULAR,
    fontSize: typography.FONT_SIZE_14,
    color: colors.WHITE,
  },
});

export default App;
