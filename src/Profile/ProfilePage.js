import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications'
import { Constants } from 'expo-constants'

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
import {getAllRemindersAPI, deleteReminderAPI } from '../apiCalls/apiCalls'

// ui
import {lightBlue, white, red, grey} from '../ui/colors'
import {LinearGradient} from 'expo-linear-gradient'
import {useFonts, Montserrat_700Bold, Montserrat_600SemiBold, Montserrat_400Regular_Italic} from '@expo-google-fonts/montserrat'

  export default ProfilePage = ({navigation, route}) => {
    const {user} = route.params
    const [userReminders, setUserReminders] = useState(user.reminders)

    const [fontsLoaded] = useFonts({
      Montserrat_700Bold, 
      Montserrat_600SemiBold,
      Montserrat_400Regular_Italic
    })

    const greeting = () => {
        return userReminders.length > 0 ? 
          `Here are your reminders, ${user.name}:`: 
            "Let's schedule some reminders."
    }

    const dayRender = (days) => {
      if (days[0].includes(',')) {
        return days[0]
      } 
      if (days.length === 7) {
        return "Repeat daily"
      } 
      if (days.length === 2 && days.includes("Saturday") && days.includes("Sunday")) {
        return "Repeat weekends"
      }
      if (days.length === 5 && !days.includes("Saturday") && !days.includes("Sunday")) {
        return "Repeat weekdays"
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

    const alertDelete = (id) =>
      Alert.alert(
        "Delete Confirmation",
        "Are you sure you want to delete this reminder?",
        [
          {
            text: "Nope, take me back",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Yep!", onPress: () => deleteReminder(id) }
        ],
        { cancelable: false }
      )

    const deleteReminder = async (id) => {
      // deleteReminderAPI(id) 
      // const apiData = await getAllRemindersAPI()
      // setUserReminders(apiData)
      // user.reminders = userReminders
    } 

    const startNotificationCountdown = async reminder => {
      // verify that we have permissions
      const permissions = await Notifications.getPermissionsAsync()
      
      // make sure the reminder fires right when the minute changes
      const triggerDate = new Date(reminder.fullDate)
      triggerDate.setSeconds(0)

      if (permissions.granted) {
        console.log('Notification permissions granted.')

        Notifications.scheduleNotificationAsync({
          content: {
            title: reminder.title,
            body: reminder.supplies
          },
          trigger: triggerDate
        })
      }
    }

    const remindersJSX = () => {
        if (userReminders.length > 0) {
          // cancel all previously set notifications to remove duplicates
          Notifications.cancelAllScheduledNotificationsAsync()
          return userReminders.map(reminder => {

            startNotificationCountdown(reminder)

            return (<View style={{width: "100%"}} key={reminder.id}>
              <Text style={styles.subHeaderText}>{reminder.title}</Text> 
              <Text>
                <Text style={styles.bodyTextDetails}>{reminder.time} |</Text> 
                <Text style={styles.bodyTextDetails}> {dayRender(reminder.days)}</Text> 
              </Text>
              <Text style={styles.bodyTextDetails}>{reminder.supplies}</Text>
              <Text style={[styles.bodyTextDetails, {fontSize: 14, fontFamily: "Montserrat_400Regular_Italic"}]}>
                {reminder.showSupplies ? "Supplies shown in notification" : "Supplies not shown in notification"}
                </Text> 
              <TouchableOpacity style={[styles.buttonStyle, {width: "25%", padding: 5, marginTop: "2%"}]}>
                <Text style={[styles.buttonText, {fontSize: 14}]} onPress={() => alertDelete(reminder.id)}>Delete</Text>
              </TouchableOpacity>
              <View style={{borderBottomColor: red, borderBottomWidth: 1, marginTop: "3%"}}/>
            </View>)

          })
        } else {
          return null
        }
      }

    if (!fontsLoaded) {
      return <AppLoading/>
    } else {
      return (
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
            onPress={() => navigation.navigate('Create Reminder', {user: user})}
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

})