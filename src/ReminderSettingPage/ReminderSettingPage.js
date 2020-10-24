import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {AppLoading} from 'expo'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native';

// ui
import {lightBlue, white, red} from '../ui/colors'
import Header from '../Header/Header'
import {useFonts, Montserrat_700Bold} from '@expo-google-fonts/montserrat'
import {LinearGradient} from 'expo-linear-gradient'


export default ReminderSettingPage = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Montserrat_700Bold
  })

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <KeyboardAvoidingView 
        style={styles.container}
        behavior="padding"
      >

        <LinearGradient colors={[white, white, "#E0EAFC"]} style={styles.linearGradient} >
        <Header />

        <View style={{ alignItems:'center' }}>
          <Text style={styles.sectionHeaderText}>Let's set up your first reminder.</Text>

          <View style={styles.inputField}>
            <Text style={styles.subheaderText}>What should it be called?</Text>
            <TextInput style={styles.inputText} placeholder='Enter its name here'></TextInput>
          </View>

          <View style={styles.inputField2}>
            <Text style={styles.subheaderText}>What medication or supplies will you need?</Text>
            <TextInput style={styles.inputText} placeholder='List them here'></TextInput>
          </View>

        </View>

          <View style={{alignItems: 'center'}}>
            <TouchableOpacity 
              style={styles.buttonStyle}
              onPress={() => navigation.navigate('FrequencyPage')}
            >
              <Text style={styles.buttonText}>Schedule Reminder</Text>
            </TouchableOpacity>
          </View>

        </LinearGradient>
      </KeyboardAvoidingView>
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
  },

  sectionHeaderText: {
    color: lightBlue,
    fontSize: 28,
    fontFamily: "Montserrat_700Bold",
    marginBottom: "10%",
    marginTop: "2%"
  },

  subheaderText: {
    color: lightBlue,
    fontSize: 20,
    fontFamily: "Montserrat_700Bold",
  },

  inputText: {
    fontSize: 20,
    fontFamily: "Montserrat_700Bold",
    marginTop: "10%",
    textAlign: "left",
    paddingBottom: 5
  },

  inputField: {
    borderBottomColor: red,
    borderBottomWidth: 2,
    width: "80%",
  },

  inputField2: {
    borderBottomColor: red,
    borderBottomWidth: 2,
    width: "80%",
    marginTop: "10%",
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
    width: "60%",
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    marginTop: "10%"
  }
})