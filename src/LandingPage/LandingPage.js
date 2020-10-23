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
  import {lightBlue, white, red} from '../ui/colors'
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
        <TextInput style={styles.inputText} placeholder='Tap & Type'></TextInput>
        <TouchableOpacity style={styles.buttonStyle}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
  const styles = StyleSheet.create({
    container: {
      backgroundColor: white,
      // alignItems: 'center',
      justifyContent: 'flex-start',
    },
    welcomeText: {
      color: lightBlue,
      fontSize: 26,
      fontFamily: "Montserrat_700Bold",
    },
    inputText: {
      color: red,
      fontSize: 38,
      fontFamily: "Montserrat_700Bold",
      marginTop: 40,
      textAlign: "center"      
    },
    buttonText: {
      color: white,
      fontFamily: "Montserrat_700Bold",
      fontSize: 20,
      textAlign: "center"
    },
    buttonStyle: {
      backgroundColor: red,
      padding: 10,
      borderRadius: 10,
      marginTop: 20,
      width: "75%"
    }

})