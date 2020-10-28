import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppLoading } from 'expo'
import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
  } from 'react-native';
  import {addUserAPI} from '../apiCalls/apiCalls'

  //ui
  import {lightBlue, white, red, grey} from '../ui/colors'
  import Header from '../Header/Header'
  import {useFonts, Montserrat_700Bold} from '@expo-google-fonts/montserrat'
  import {LinearGradient} from 'expo-linear-gradient'

  export default LandingPage = ({ navigation }) => {
    const [notificationsPermission, askForNPermission] = Permissions.usePermissions(Permissions.NOTIFICATIONS, { ask: true })
    const [locationPermission, askForLPermission] = Permissions.usePermissions(Permissions.LOCATION, { ask: true })

    let user = {
      name: '', 
      id: '',
      reminders: [], 
      currentReminder: {
        title: '', 
        supplies: [], 
        id: '',
        showSupplies: false, 
        scheduled: {
          days: [], 
          time: '', 
          unixDate: '',
          repeating: false,
        }, 
        location: { 
          lat: '',
          long: '',
          locationName: '',
          address: '',
        }
      }
    }

    const handleChange = (text) => {
      user.name = text.trim()
    }

    const alertUserName = () =>
      Alert.alert(
        "No Name Added",
        "Please tell us what name to call you.",
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


    const goToCreateReminder = async () => {
      if (user.name) {
        const userName = {"name": user.name}
        try {
          const apiData = await addUserAPI(userName)
          user.id = apiData.id
          navigation.navigate('Create Reminder', {user: user }) 
        } catch (error) {
          console.log(apiData.message)
        }
      } else {
        alertUserName()
      }
    }

    const [fontsLoaded] = useFonts({
      Montserrat_700Bold
    })

    if (!fontsLoaded) {
      return <AppLoading/>
    } else {
      return (
        <View style={styles.container}>
          <LinearGradient colors={[white, white, "#E0EAFC"]} style={styles.linearGradient} >

          <Header />

          <View style={styles.welcomeTexts}>
            <Text style={styles.welcomeText} testID="greeting-top">Hey there!</Text> 
            <Text style={styles.welcomeText}>What's your name?</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TextInput 
              style={styles.inputText} 
              placeholder='Name'
              maxLength={15}
              onChangeText={(text) => handleChange(text)}
            />
            <TouchableOpacity 
              style={styles.buttonStyle}
              onPress={goToCreateReminder}
            >
              <Text style={styles.buttonText}>Create Reminder</Text>
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

    welcomeTexts: {
      marginLeft: "10%",
      marginTop: "20%"
    },
    
    welcomeText: {
      color: lightBlue,
      fontSize: 26,
      fontFamily: "Montserrat_700Bold",
    },

    inputText: {
      color: grey,
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

    buttonContainer: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: "10%",
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