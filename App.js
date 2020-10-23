// Imports
import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import {store} from './src/store'
import 'react-native-gesture-handler'

import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet, Text, View } from 'react-native';

// App Imports
import LandingPage from './src/LandingPage/LandingPage'
import ReminderSettingPage from './src/ReminderSettingPage/ReminderSettingPage'
import FrequencyPage from './src/FrequencyPage/FrequencyPage'
import ProfilePage from './src/Profile/ProfilePage'

const Stack = createStackNavigator();



export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="LandingPage"
        >
          <Stack.Screen name="LandingPage" component={LandingPage} />
          <Stack.Screen name="ReminderSettingPage" component={ReminderSettingPage} />
          <Stack.Screen name="FrequencyPage" component={FrequencyPage} />
          <Stack.Screen name="ProfilePage" component={ProfilePage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
