// Imports
import React from 'react';
import 'react-native-gesture-handler'
import * as Notifications from 'expo-notifications'
import { NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// App Imports
import LandingPage from '../src/LandingPage/LandingPage'
import ReminderSettingPage from '../src/ReminderSettingPage/ReminderSettingPage'
import FrequencyPage from '../src/FrequencyPage/FrequencyPage'
import ProfilePage from '../src/Profile/ProfilePage'
import TriggerOptions from '../src/TriggerOptions/TriggerOptions'
import LocationPage from '../src/LocationPage/LocationPage'

const Stack = createStackNavigator();
console.disableYellowBox = true;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  }),
});

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="LandingPage"
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="Welcome" component={LandingPage} />
        <Stack.Screen name="Create Reminder" component={ReminderSettingPage} />
        <Stack.Screen name="Trigger Options" component={TriggerOptions}/>
        <Stack.Screen name="Schedule Reminder" component={FrequencyPage} />
        <Stack.Screen name="Location Reminder" component={LocationPage}/>
        <Stack.Screen name="Profile" component={ProfilePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
