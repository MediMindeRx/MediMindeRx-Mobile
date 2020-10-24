// Imports
import React from 'react';
import { Provider } from 'react-redux';
import {store} from './src/store'
import 'react-native-gesture-handler'

import { NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// App Imports
import LandingPage from './src/LandingPage/LandingPage'
import ReminderSettingPage from './src/ReminderSettingPage/ReminderSettingPage'
import FrequencyPage from './src/FrequencyPage/FrequencyPage'
import ProfilePage from './src/Profile/ProfilePage'

const Stack = createStackNavigator();
console.disableYellowBox = true;



export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="LandingPage"
          screenOptions={{headerShown: false}}
        >
          <Stack.Screen name="Welcome" component={LandingPage} />
          <Stack.Screen name="Create Reminder" component={ReminderSettingPage} />
          <Stack.Screen name="Schedule Reminder" component={FrequencyPage} />
          <Stack.Screen name="Profile" component={ProfilePage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
