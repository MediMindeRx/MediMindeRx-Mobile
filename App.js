// Imports
import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import {store} from './src/store'
// import {NavigationContainer} from '@react-navigation/native'
// import {createStackNavigator} from '@react-navigation/stack'
import { StyleSheet, Text, View } from 'react-native';


// App Imports
import User from './src/User/user'
import LandingPage from './src/LandingPage/LandingPage'
import FrequencyPage from './src/FrequencyPage/FrequencyPage'


export default function App() {
  return (
    <View style={styles.container}>
      <FrequencyPage />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
});
