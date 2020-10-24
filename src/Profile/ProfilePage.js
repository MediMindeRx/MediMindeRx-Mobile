import React from 'react'
// import {connect} from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {AppLoading} from 'expo'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Header from '../Header/Header'

// ui
import {lightBlue, white, red, black} from '../ui/colors'
import {LinearGradient} from 'expo-linear-gradient'
import {useFonts, Montserrat_700Bold} from '@expo-google-fonts/montserrat'
import {OpenSansCondensed_300Light, OpenSansCondensed_700Bold} from '@expo-google-fonts/open-sans-condensed'


  export default ProfilePage = ({navigation}) => {
    const [fontsLoaded] = useFonts({
      Montserrat_700Bold, 
      OpenSansCondensed_300Light,
      OpenSansCondensed_700Bold
    })

    // if 0 reminders, prompt user to add new reminder in welcomeText (conditional)
    // const greeting = () => {
        // return user.reminders.length > 0 ? 
          //"Here are your reminders, Joe:": "Looks like we'll need to add some reminders."
    // }

    // const remindersJSX = () => {
        // if (user.reminders.length > 0) {
            // return user.reminders.map(reminder => {
              //  <Text style={styles.subHeaderText}>{reminder.title}</Text> 
                // <Text><Text style={styles.bodyTextDetails}>{reminder.time} |</Text> <Text>{[...reminder.days]}</Text> </Text>
                // <Text style={styles.bodyTextDetails}>{reminder.supplies}</Text> 
              // <View style={{borderBottomColor: red, borderBottomWidth: 1, marginTop: 10}}/>
            // })
        // }
      // })






    if (!fontsLoaded) {
      return <AppLoading/>
    } else {
    return(
      <View style={styles.container}>
        <LinearGradient colors={[white, white, "#E0EAFC"]} style={styles.linearGradient} >
        <Header />

        <Text style={styles.welcomeText}>Here are your reminders, Joe:</Text> 

        <View style={{height: "55%", alignItems: 'center'}}>
          <ScrollView >
            <Text style={styles.subHeaderText}>Tennis Practice</Text> 
            <Text style={styles.bodyTextDetails}>5pm | TTH</Text> 
            <Text style={styles.bodyTextDetails}>Elbow wrap, Inhaler, Water Bottle</Text> 
            <View style={{borderBottomColor: red, borderBottomWidth: 1, marginTop: 10}}/>

            <Text style={styles.subHeaderText}>Work</Text> 
            <Text style={styles.bodyTextDetails}>8am | Everyday</Text> 
            <Text style={styles.bodyTextDetails}>Inhaler, Water Bottle, Claritin</Text> 
            <View style={{borderBottomColor: red, borderBottomWidth: 1, marginTop: 10}}/>

            <Text style={styles.subHeaderText}>Visit Parents</Text> 
            <Text style={styles.bodyTextDetails}>6pm | Sunday</Text> 
            <Text style={styles.bodyTextDetails}>Inhaler, Claritin</Text>
            <View style={{borderBottomColor: red, borderBottomWidth: 1, marginTop: 10}}/> 

            <Text style={styles.subHeaderText}>Visit Parents</Text> 
            <Text style={styles.bodyTextDetails}>6pm | Sunday</Text> 
            <Text style={styles.bodyTextDetails}>Inhaler, Claritin</Text>
            <View style={{borderBottomColor: red, borderBottomWidth: 1, marginTop: 10}}/>
          </ScrollView>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.buttonStyle}
            onPress={() => navigation.navigate('Create Reminder')}
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

    welcomeText: {
      color: lightBlue,
      fontSize: 24,
      fontFamily: "Montserrat_700Bold",
      marginLeft: "9%",
    },

    subHeaderText: {
      color: lightBlue,
      fontSize: 25,
      fontFamily: "OpenSansCondensed_700Bold",
      marginTop: "5%",
    },

    bodyTextDetails: {
      color: black,
      fontSize: 23,
      fontFamily: "OpenSansCondensed_300Light",
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
    }

})