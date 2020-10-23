import React from 'react'
// import {connect} from 'react-redux'
import {AppLoading} from 'expo'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
  } from 'react-native';
  import {lightBlue, white, red, black} from '../ui/colors'
  import Header from '../Header/Header'
  import {useFonts, Montserrat_700Bold} from '@expo-google-fonts/montserrat'
  import {OpenSansCondensed_300Light, OpenSansCondensed_700Bold} from '@expo-google-fonts/open-sans-condensed'


  export default ProfilePage = () => {
    const [fontsLoaded] = useFonts({
      Montserrat_700Bold, 
      OpenSansCondensed_300Light,
      OpenSansCondensed_700Bold
    })

    if (!fontsLoaded) {
      return <AppLoading/>
    } else {
    return(
      <View style={styles.container}>
        <Header />
        <Text style={styles.welcomeText}>Joe's Reminders</Text> 

        <ScrollView>
          <Text style={styles.subHeaderText}>Tennis Practice</Text> 
          <Text style={styles.bodyTextDetails}>5pm | TTH</Text> 
          <Text style={styles.bodyTextDetails}>Elbow wrap, Inhaler, Water Bottle</Text> 
          <View style={{borderBottomColor: 'black', borderBottomWidth: 1, marginTop: 5}}/>

          <Text style={styles.subHeaderText}>Work</Text> 
          <Text style={styles.bodyTextDetails}>8am | Everyday</Text> 
          <Text style={styles.bodyTextDetails}>Inhaler, Water Bottle, Claritin</Text> 
          <View style={{borderBottomColor: 'black', borderBottomWidth: 1, marginTop: 5}}/>

          <Text style={styles.subHeaderText}>Visit Parents</Text> 
          <Text style={styles.bodyTextDetails}>6pm | Sunday</Text> 
          <Text style={styles.bodyTextDetails}>Inhaler, Claritin</Text>
          <View style={{borderBottomColor: 'black', borderBottomWidth: 1, marginTop: 5}}/> 
        </ScrollView>
        
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
    },

    welcomeText: {
      color: lightBlue,
      fontSize: 35,
      fontFamily: "Montserrat_700Bold",
      textAlign: "center",
    },

    headerText: {
      color: lightBlue,
      fontSize: 25,
      fontFamily: "Montserrat_700Bold",
      marginTop: 15,
      marginLeft: 5,
      
    },

    subHeaderText: {
      color: lightBlue,
      fontSize: 25,
      fontFamily: "OpenSansCondensed_700Bold",
      marginTop: 10,
      marginLeft: 15,
    },

    bodyTextDetails: {
      color: black,
      fontSize: 25,
      fontFamily: "OpenSansCondensed_300Light",
      marginLeft: 25
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