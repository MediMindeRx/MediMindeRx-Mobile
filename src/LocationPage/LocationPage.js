import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications'
import { Constants } from 'expo-constants'
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

export default LocationPage = ({navigation, route}) => {
  const [locationName, setLocationName] = useState('')
  const [addressName, setAddressName] = useState('')
  const [cityName, setCityName] = useState('')
  const [stateName, setStateName] = useState('')
  
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
        user.currentReminder.location.address = `${addressName} ${cityName} ${stateName}`
        const apiCoords = await getCoordsAPI(user.currentReminder.location.address)
        user.currentReminder.location.longitude = apiCoords.longitude
        user.currentReminder.location.latitude = apiCoords.latitude
        user.currentReminder.location.locationName = locationName
        const formatReminderType = {
          id: user.currentReminder.reminder.id, 
          longitude: user.currentReminder.location.longitude, 
          latitude: user.currentReminder.location.latitude, 
          location_name: user.currentReminder.location.locationName,
          address: user.currentReminder.location.address,
        }
        addReminderTypeAPI(formatReminderType)
        user.reminders = await getAllReminders(user.id)
        navigation.navigate('Profile', {user: user })
      }
    }


    if (!fontsLoaded) {
      return <AppLoading/>
    } else {
      return (
        <KeyboardAvoidingView
          style={[styles.container, { backgroundColor: "#E0EAFC" }]}
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.container}
          scrollEnabled={false}
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
        
            <View style={{height: "40%", marginBottom: "2%", marginTop: '5%'}}>
              <ScrollView style={{width: 275}}>
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
                  maxLength={10}
                  onChangeText={(text) => setCityName(text)}
                />
                <TextInput 
                  style={styles.inputText} 
                  placeholder='State'
                  maxLength={10}
                  onChangeText={(text) => setStateName(text)}
                />
              </ScrollView>
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
        </KeyboardAvoidingView>
    )
  }

}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
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
      // marginTop: "3%",
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