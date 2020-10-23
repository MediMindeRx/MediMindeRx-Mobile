// Imports
import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import {store} from './src/store'

// import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from 'react-navigation-stack'
import { StyleSheet, Text, View } from 'react-native';


// App Imports
import LandingPage from './src/LandingPage/LandingPage'
import ReminderSettingPage from './src/ReminderSettingPage/ReminderSettingPage'
import FrequencyPage from './src/FrequencyPage/FrequencyPage'
import ProfilePage from './src/Profile/ProfilePage'

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator style={styles.container}>
      <LandingPage />
      <StatusBar style="auto" />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
