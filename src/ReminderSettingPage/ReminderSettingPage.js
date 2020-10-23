import React from 'react'
import {AppLoading} from 'expo'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView
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
      <KeyboardAvoidingView 
        style={styles.container}
        behavior="padding"
      >
        <Header />
        <View>
          <Text style={styles.sectionHeaderText}>Let's set up your first reminder.</Text>
          <View style={styles.inputField}>
            <Text style={styles.subheaderText}>What should it be called?</Text>
            <TextInput style={styles.inputText} placeholder='Enter its name here'></TextInput>
          </View>
          <View style={styles.inputField2}>
            <Text style={styles.subheaderText}>What medication or supplies will you need?</Text>
            <TextInput style={styles.inputText} placeholder='List them here'></TextInput>
          </View>
          <View>
            <TouchableOpacity style={styles.buttonStyle}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end'
  },

  buttonContainer: {
    alignItems: "center",
    justifyContent: "center"
  },

  sectionHeaderText: {
    color: lightBlue,
    fontSize: 28,
    fontFamily: "Montserrat_700Bold",
    width: 300,
    marginLeft: 20,
    marginBottom: 40,
    marginTop: 10
  },

  subheaderText: {
    color: lightBlue,
    fontSize: 20,
    fontFamily: "Montserrat_700Bold",
    width: 300
  },

  inputText: {
    // color: red,
    fontSize: 20,
    fontFamily: "Montserrat_700Bold",
    marginTop: 40,
    textAlign: "left",
    paddingBottom: 5
  },

  inputField: {
    borderBottomColor: red,
    borderBottomWidth: 2,
    width: 300,
    marginLeft: 20
  },

  inputField2: {
    borderBottomColor: red,
    borderBottomWidth: 2,
    width: 300,
    marginTop: 30,
    marginLeft: 20
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
    marginLeft: 70,
    marginTop: 40
  }
})