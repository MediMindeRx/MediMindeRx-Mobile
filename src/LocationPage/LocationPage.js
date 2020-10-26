import React from 'react'
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
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete'
// ui
import {lightBlue, white, red, grey} from '../ui/colors'
import {LinearGradient} from 'expo-linear-gradient'
import {useFonts, Montserrat_700Bold, Montserrat_600SemiBold, Montserrat_400Regular_Italic} from '@expo-google-fonts/montserrat'
import { TextInput } from 'react-native-gesture-handler';

export default LocationPage = ({navigation, route}) => {
    const {user} = route.params

    const [fontsLoaded] = useFonts({
      Montserrat_700Bold, 
      Montserrat_600SemiBold,
      Montserrat_400Regular_Italic
    })

    const handleChange = (text) => {
      user.currentReminder.location = text
    }


    if (!fontsLoaded) {
      return <AppLoading/>
    } else {
      return (
        <View style={styles.container}>
          <LinearGradient colors={[white, white, "#E0EAFC"]} style={styles.linearGradient} >

          <Header />

          <View style={styles.welcomeTexts}>
            <Text style={styles.headerText}>Add Location</Text> 
            <Text style={[styles.bodyText, {marginTop: "5%"}]}>Examples: </Text>
            <Text style={[styles.bodyText, {fontFamily: "Montserrat_400Regular_Italic"}]}>"You've left the house! Did you remember your insulin?"</Text>
            <Text style={[styles.bodyText, {fontFamily: "Montserrat_400Regular_Italic"}]}>"You've left work. Did you remember your inhaler?"</Text>
          </View>

        <ScrollView>
          <GooglePlacesAutocomplete
              placeholder='Enter Location'
              minLength={2}
              autoFocus={false}
              returnKeyType={'default'}
              fetchDetails={true}
              returnKeyType={'search'} 
              listViewDisplayed="true"   
              fetchDetails={true}
              listUnderlayColor={red}
              onPress={(data, details = null) => {
                console.log(data, details);
              }}

              enablePoweredByContainer={true}
              styles={{
                container: {
                  borderColor: red,
                  borderWidth: 2,
                  zIndex: 2
                }, 

                textInput: {
                  borderColor: red,
                  borderWidth: 2,
                  marginLeft: 0,
                  marginRight: 0,
                  color: '#5d5d5d',
                  fontSize: 16
                },
                predefinedPlacesDescription: {
                  color: '#1faadb'
                },
               
              }}
              renderDescription={row => row.description}
              currentLocation={false}
              query={{
                key: 'AIzaSyBQ_yHIwcbDOLeFt06d3rJ9vsm410UpBIw',
                language: 'en'
              }}
            />

        </ScrollView>
      
          <View style={{alignItems: "center"}}>
            <TextInput 
              style={styles.inputText} 
              placeholder='Nickname'
              maxLength={10}
              onChangeText={(text) => handleChange(text)}
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
              onPress={()=>{navigation.navigate('Profile', {user: user })}}
            >
              <Text style={styles.buttonText}>Save Reminder</Text>
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
      marginRight: "9%"
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
    },

    inputText: {
      color: grey,
      fontSize: 23,
      fontFamily: "Montserrat_700Bold",
      borderBottomWidth: 2,
      borderBottomColor: red,
      width: "60%",
      // marginTop: "20%",
      paddingBottom: 5,
    },


    buttonText: {
      color: white,
      fontFamily: "Montserrat_700Bold",
      fontSize: 20,
      textAlign: "center",
    },

    buttonContainer: {
      alignItems: "center",
      marginTop: "2%",
      flexDirection: "row"
    },

    buttonStyle: {
      backgroundColor: red,
      padding: 13,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 3,
      marginTop: "4%"
    }
})