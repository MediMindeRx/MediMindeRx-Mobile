import React from 'react'
// import {connect} from 'react-redux'
import {AppLoading} from 'expo'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
  } from 'react-native';
  import {lightBlue, white, red, inputText} from '../ui/colors'
  import Header from '../Header/Header'
  import {useFonts, Montserrat_700Bold} from '@expo-google-fonts/montserrat'


  export default Profile= () => {
    const [fontsLoaded] = useFonts({
      Montserrat_700Bold
    })

    if (!fontsLoaded) {
      return <AppLoading/>
    } else {
    return(
      <View style={styles.container}>
        <Header />
        <Text style={styles.welcomeText}>Hey there, Joe!</Text> 
        <Text style={styles.welcomeText}>Existing Reminders</Text> 
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Add Reminder</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

  const styles = StyleSheet.create({
    container: {
      backgroundColor: white,
      justifyContent: 'flex-start',
    },

    buttonContainer: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
    },

    welcomeText: {
      color: lightBlue,
      fontSize: 30,
      fontFamily: "Montserrat_700Bold",
    },

    inputText: {
      color: red,
      fontSize: 38,
      fontFamily: "Montserrat_700Bold",
      borderBottomWidth: 1,
      borderBottomColor: red,
      width: "70%"      
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
      marginTop: 25,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 3,
    }

})