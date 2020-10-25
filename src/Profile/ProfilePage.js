import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {AppLoading} from 'expo'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import Header from '../Header/Header'

// ui
import {lightBlue, white, red, grey} from '../ui/colors'
import {LinearGradient} from 'expo-linear-gradient'
import {useFonts, Montserrat_700Bold, Montserrat_600SemiBold} from '@expo-google-fonts/montserrat'


  export default ProfilePage = ({navigation, route}) => {
    const {user} = route.params


    const [fontsLoaded] = useFonts({
      Montserrat_700Bold, 
      Montserrat_600SemiBold,
    })


    const greeting = () => {
        return user.reminders.length > 0 ? 
          `Here are your reminders, ${user.name}:`: 
            "Let's schedule some reminders."
    }


    const dayRender = (days) => {
      if (days[0].includes(',')) {
        return days[0]
      } else {
        return "Repeat" +  days.map(day => {
          if (day === "Tuesday" || day === "Thursday" || day === "Sunday" || day === "Saturday") {
            return " " + day.charAt(0) + day.charAt(1)
          } else {
            return " " + day.charAt(0)
          }
        })
      }
    }


    const alertDelete = () =>
      Alert.alert(
        "Delete Confirmation",
        "Are you sure you want to delete this reminder?",
        [
          {
            text: "Nope, take me back",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Yep!", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      )


    const deleteReminder = (id) => {
      alertDelete()
    }

    const remindersJSX = () => {
        if (user.reminders.length > 0) {
            return user.reminders.map(reminder => {
             return (<View style={{width: "100%"}}>
                <Text style={styles.subHeaderText}>{reminder.title}</Text> 
                <Text>
                  <Text style={styles.bodyTextDetails}>{reminder.time} |</Text> 
                  <Text style={styles.bodyTextDetails}> {dayRender(reminder.days)}</Text> 
                </Text>
                <Text style={styles.bodyTextDetails}>{reminder.supplies}</Text> 
                <TouchableOpacity style={styles.deleteButtonStyle}>
                  <Text style={styles.deleteButtonText} onPress={deleteReminder}>Delete</Text>
                </TouchableOpacity>
                <View style={{borderBottomColor: red, borderBottomWidth: 1, marginTop: "3%"}}/>
              </View>)
            })
        } else {
          return null
        }
      }


      const addNewReminder = () => {
        user.currentReminder.title = ''
        user.currentReminder.supplies = ''
        user.currentReminder.time = ''
        user.currentReminder.days = []
        navigation.navigate('Create Reminder', {user: user})
      }


    if (!fontsLoaded) {
      return <AppLoading/>
    } else {
       return(
      <View style={styles.container}>
        <LinearGradient colors={[white, white, "#E0EAFC"]} style={styles.linearGradient} >
        <Header />

        <Text style={styles.welcomeText}>{greeting()}</Text> 

        <View style={styles.scrollContainer}>
          <ScrollView >
            {remindersJSX()}
          </ScrollView>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.buttonStyle}
            onPress={addNewReminder}
            >
            <Text style={styles.buttonText}>Add New Reminder</Text>
          </TouchableOpacity>
        </View>
        </LinearGradient>

      </View>
    )
  }
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },

    linearGradient: {
      flex: 1,
    },

    buttonContainer: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: "5%"
    },

    scrollContainer: {
      height: "55%", 
      marginTop: "2%", 
      marginLeft: "6%", 
      marginRight: "6%"
    },

    welcomeText: {
      color: lightBlue,
      fontSize: 22,
      fontFamily: "Montserrat_700Bold",
      marginLeft: "6%",
      marginRight: "6%"
    },

    subHeaderText: {
      color: lightBlue,
      fontSize: 22,
      fontFamily: "Montserrat_600SemiBold",
      marginTop: "5%",
    },

    bodyTextDetails: {
      color: grey,
      fontSize: 18,
      fontFamily: "Montserrat_600SemiBold",
      marginRight: "6%"
    },

    buttonText: {
      color: white,
      fontFamily: "Montserrat_700Bold",
      fontSize: 18,
      textAlign: "center",
    },

    buttonStyle: {
      backgroundColor: red,
      padding: 13,
      borderRadius: 10,
      width: "60%",
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 3,
    },

    deleteButtonText: {
      color: white,
      fontFamily: "Montserrat_700Bold",
      fontSize: 16,
      textAlign: "center",
    },

    deleteButtonStyle : {
      backgroundColor: red,
      padding: 10,
      borderRadius: 10,
      width: "25%",
      shadowColor: '#000',
      marginTop: "2%",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 3,
    }

})