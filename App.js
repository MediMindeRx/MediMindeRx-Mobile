// Imports
import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import {store} from './src/store'
import {Provider} from 'react-redux'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'


// App Imports
import User from './src/User/user'
import LandingPage from './src/LandingPage/LandingPage'

const Stack = createStackNavigator()

class App extends Component {

  render() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen
            name='Home'
            component={LandingPage}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
  }
}

export default App