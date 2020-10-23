import React from 'react'
// import {connect} from 'react-redux'
import {AppLoading} from 'expo'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
  } from 'react-native';
  import {lightBlue, white} from '../ui/colors'
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
    }

})