import React, { useState } from 'react'
import { connect } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppLoading } from 'expo'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Dimensions
  } from 'react-native';

  //ui
  import {lightBlue, white, red} from '../ui/colors'
  import Header from '../Header/Header'
  import {useFonts, Montserrat_700Bold} from '@expo-google-fonts/montserrat'
  import {LinearGradient} from 'expo-linear-gradient'


  export default LandingPage = ({ navigation }) => {
    const [fontsLoaded] = useFonts({
      Montserrat_700Bold
    })

    if (!fontsLoaded) {
      return <AppLoading/>
    } else {
    return(
      <View style={styles.container}>
        <LinearGradient colors={[white, white, "#E0EAFC"]} style={styles.linearGradient} >

        <Header />

        <View style={styles.welcomeTexts}>
          <Text style={styles.welcomeText}>Hey there!</Text> 
          <Text style={styles.welcomeText}>What's your name?</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TextInput 
            style={styles.inputText} 
            placeholder='Name'
          />
          <TouchableOpacity 
            style={styles.buttonStyle}
            onPress={() => navigation.navigate('ReminderSettingPage')}
          >
            <Text style={styles.buttonText}>Next</Text>
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
      justifyContent: 'flex-start',
    },

     linearGradient: {
       flex: 1,
    },

    buttonContainer: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: "10%",
    },

    welcomeTexts: {
      marginLeft: "10%",
      marginTop: "20%"
    },
    
    welcomeText: {
      color: lightBlue,
      fontSize: 24,
      fontFamily: "Montserrat_700Bold",
    },

    inputText: {
      color: red,
      fontSize: 26,
      fontFamily: "Montserrat_700Bold",
      borderBottomWidth: 2,
      borderBottomColor: red,
      width: "70%",
      paddingBottom: 5,
      marginBottom: 30      
    },

    buttonText: {
      color: white,
      fontFamily: "Montserrat_700Bold",
      fontSize: 20,
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