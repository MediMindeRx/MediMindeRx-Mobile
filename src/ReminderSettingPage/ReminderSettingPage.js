import React from 'react'
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

export default ReminderSettingPage = () => {
  const [fontsLoaded] = useFonts({
    Montserrat_700Bold
  })

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <View style={styles.container}>
        <Header />
        <View>
          <Text style={styles.sectionHeaderText}>How would you like to be reminded?</Text>
          
        </View>
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
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  sectionHeaderText: {
    color: lightBlue,
    fontSize: 20,
    fontFamily: "Montserrat_700Bold",
    marginLeft: 38
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
    padding: 13,
    borderRadius: 10,
    marginTop: 20,
    width: "60%",
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3
  }
})