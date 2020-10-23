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


  export default LandingPage = () => {
    const [fontsLoaded] = useFonts({
      Montserrat_700Bold
    })

    if (!fontsLoaded) {
      return <AppLoading/>
    } else {
    return(
      <View style={styles.container}>
        <Header />
        <Text style={styles.welcomeText}>Hey there!</Text> 
        <Text style={styles.welcomeText}>What's your name?</Text>
        <View style={styles.buttonContainer}>
         <TextInput style={styles.inputText} placeholder='Name'></TextInput>
          <TouchableOpacity style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Next</Text>
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
      marginTop: 20,
    },

    welcomeText: {
      color: lightBlue,
      fontSize: 30,
      fontFamily: "Montserrat_700Bold",
      marginLeft: 10,
      marginTop: 5 
    },

    inputText: {
      color: red,
      fontSize: 38,
      fontFamily: "Montserrat_700Bold",
      borderBottomWidth: 2,
      borderBottomColor: red,
      width: "70%",
      marginBottom: 30      
    },

    buttonText: {
      color: white,
      fontFamily: "Montserrat_700Bold",
      fontSize: 25,
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