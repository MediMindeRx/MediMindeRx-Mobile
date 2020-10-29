import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications'
import * as TaskManager from 'expo-task-manager'
import * as Location from 'expo-location'
import { Constants } from 'expo-constants'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {addReminderTypeAPI, getCoordsAPI} from '../apiCalls/apiCalls'

import {AppLoading} from 'expo'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import Header from '../Header/Header'
// ui
import {lightBlue, white, red, grey} from '../ui/colors'
import {LinearGradient} from 'expo-linear-gradient'
import {useFonts, Montserrat_700Bold, Montserrat_600SemiBold, Montserrat_400Regular_Italic} from '@expo-google-fonts/montserrat'
import { TextInput } from 'react-native-gesture-handler';

// following documentation syntax, not sure if declaring it like this is necessary
const TRACK_LOCATION = 'background-location-task'

// define the function for taking in location data in background
TaskManager.defineTask(TRACK_LOCATION, ({ data, err }) => {
  if (err) {
    console.log(error)
    return
  }
  if (data) {
    const { locations } = data
    console.log(locations)
  }
})

export default LocationPage = ({navigation, route}) => {
  const [locationName, setLocationName] = useState('')
  const [addressName, setAddressName] = useState('')
  const [cityName, setCityName] = useState('')
  const [stateName, setStateName] = useState('')

  // set up callback for actually starting above defined task
    const startTracking = async () => {
      const permissions = await Notifications.getPermissionsAsync()

      if (permissions.granted) {
        await Location.startLocationUpdatesAsync(TRACK_LOCATION, {
          // again, just following documentation here for the time being
          accuracy: Location.Accuracy.Balanced
        })
      }
    }
  
    const {user} = route.params

    const [fontsLoaded] = useFonts({
      Montserrat_700Bold, 
      Montserrat_600SemiBold,
      Montserrat_400Regular_Italic,
    })

    const setLocation = (data, details) => {
      // do something with data and details
      const locLongitude = data.longitude
      const locLatitude = data.latitude
      setLongitude(locLongitude)
      setLatitude(locLatitude)
    }

    const alertMissingLocation = () =>
      Alert.alert(
        "Where should the reminder fire?",
        "Select a location to fire when leaving a designated area.",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );

    const inputCheck = async () => {
      if (!addressName || !cityName || !stateName) {
        alertMissingLocation()
      } else {
        const reminderLocation = user.currentReminder.location
        // format the user address and make call to radar.io with it
        const addressList = await getCoordsAPI(`${addressName} ${cityName} ${stateName}`)
        const currentAddress = addressList.addresses[0]
        
        // take the response and assign it currentReminder info
        reminderLocation.address = currentAddress.addressLabel
        reminderLocation.long = currentAddress.longitude
        reminderLocation.lat = currentAddress.latitude
        reminderLocation.locationName = locationName

        startTracking()

        const formatReminderType = {
          // comment the id back in when the APIs taking POSTs for reminders
          reminder_id: `${user.currentReminder.reminder.id}`, 
          longitude: user.currentReminder.location.long, 
          latitude: user.currentReminder.location.lat, 
          location_name: user.currentReminder.location.locationName,
          address: user.currentReminder.location.address,
        }

        try {
          await addReminderTypeAPI(formatReminderType)
          user.reminders = await getAllReminders(user.id).data
          navigation.navigate('Profile', {user: user })
        } catch (error) {
          console.error(error)
        }
      }
    }

    if (!fontsLoaded) {
      return <AppLoading/>
    } else {
      return (
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.container}
          scrollEnabled={false}
          behavior='height'
          enabled
        >
          <LinearGradient colors={[white, white, "#E0EAFC"]} style={styles.linearGradient} >

          <Header />

          <View style={{alignItems: "center"}}>
            
            <View style={styles.welcomeTexts}>
              <Text style={styles.headerText}>Add Location</Text> 
              <Text style={[styles.bodyText, {marginTop: "5%"}]}>Examples: </Text>
              <Text style={[styles.bodyText, {fontFamily: "Montserrat_400Regular_Italic"}]}>"You've left the house! Did you remember your insulin?"</Text>
              <Text style={[styles.bodyText, {fontFamily: "Montserrat_400Regular_Italic"}]}>"You've left the trailhead parking lot. Did you grab your inhaler?"</Text>
            </View>
        
            <View style={styles.inputContainer}>
                <TextInput 
                  style={styles.inputText} 
                  placeholder='Nickname ("Home")'
                  maxLength={10}
                  onChangeText={(text) => setLocationName(text)}
                />
                <TextInput 
                  style={styles.inputText} 
                  placeholder='Address'
                  maxLength={50}
                  onChangeText={(text) => setAddressName(text)}
                />
                <TextInput 
                  style={styles.inputText} 
                  placeholder='City'
                  maxLength={15}
                  onChangeText={(text) => setCityName(text)}
                />
                <TextInput 
                  style={styles.inputText} 
                  placeholder='State'
                  maxLength={15}
                  onChangeText={(text) => setStateName(text)}
                />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.buttonStyle}
                onPress={()=>{navigation.navigate('Trigger Options', {user: user })}}
              >
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.buttonStyle}
                onPress={inputCheck}
              >
                <Text style={styles.buttonText}>Save Reminder</Text>
              </TouchableOpacity>
            </View>
            </View>
          </LinearGradient>
        </KeyboardAwareScrollView>
    )
  }
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center"
    },

    linearGradient: {
      flex: 1,
    },

    welcomeTexts: {
      marginLeft: "13%",
      marginRight: "13%",
      marginBottom: "3%"
    },
    
    headerText: {
      color: lightBlue,
      fontSize: 26,
      fontFamily: "Montserrat_700Bold",
      marginTop: "2%"
    },

    bodyText: {
      color: lightBlue,
      fontSize: 18,
      fontFamily: "Montserrat_700Bold",
      marginTop: 10
    },

    inputContainer: {
      height: "40%", 
      width: "100%", 
      marginBottom: "2%", 
      justifyContent: 'center', 
      alignItems: 'center'
    },

    inputText: {
      color: grey,
      fontSize: 20,
      fontFamily: "Montserrat_700Bold",
      borderBottomWidth: 2,
      borderBottomColor: red,
      width: "100%",
      paddingBottom: 5,
      marginTop: "3%"
    },

    buttonText: {
      color: white,
      fontFamily: "Montserrat_700Bold",
      fontSize: 20,
      textAlign: "center",
    },

    buttonContainer: {
      alignItems: "center",
      marginTop: "3%",
      flexDirection: "row",
      justifyContent: "center",
    },

    buttonStyle: {
      backgroundColor: red,
      padding: 10,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 3,
      marginTop: "4%",
      marginLeft: "3%"
    }
})