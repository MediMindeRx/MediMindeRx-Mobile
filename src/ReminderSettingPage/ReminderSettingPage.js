import React, {useState} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {AppLoading} from 'expo'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Alert,
    Switch
} from 'react-native';

// ui
import {lightBlue, white, red, grey} from '../ui/colors'
import Header from '../Header/Header'
import {useFonts, Montserrat_700Bold} from '@expo-google-fonts/montserrat'
import {LinearGradient} from 'expo-linear-gradient'


export default ReminderSettingPage = ({ navigation, route }) => {
  const [title, setTitle] = useState('')
  const [supplies, setSupplies] = useState('')
  const [showSupplies, setShowSupplies] = useState(false)


  const {user} = route.params

  const handleTitleChange = (text) => {
    setTitle(text)
    user.currentReminder.title = text
  }

  const handleSuppliesChange = (text) => {
    setSupplies(text)
    user.currentReminder.supplies = text
  }

  const toggleSupplies = () => {
    user.currentReminder.showSupplies = !showSupplies
    setShowSupplies(!showSupplies)
  }

  const goToSchedPage = () => {
    if (!user.currentReminder.supplies && !user.currentReminder.title) {
      alertMissingTitleSupplies()
    } else if (!user.currentReminder.supplies) {
      alertMissingSupplies()
    } else if (!user.currentReminder.title) {
      alertMissingTitle()
    } else {
      setTitle('')
      setSupplies('')
      setShowSupplies(false)
      navigation.navigate('Schedule Reminder', {user:user})
    }
  }

  const [fontsLoaded] = useFonts({
    Montserrat_700Bold
  })

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <View 
        style={styles.container}
        behavior="padding"
      >

        <LinearGradient colors={[white, white, "#E0EAFC"]} style={styles.linearGradient} >
        <Header />

        <View style={{ alignItems:'center', justifyContent: 'center' }}>
          <Text style={styles.sectionHeaderText}>Let's set up a reminder, {user.name}.</Text>

          <View style={styles.inputField}>
            <Text style={styles.subheaderText}>What should it be called?</Text>
            <TextInput style={styles.inputText} value={title} onChangeText={(text) => handleTitleChange(text)} maxLength={25} placeholder='Enter its name here'/>
          </View>

          <KeyboardAvoidingView style={styles.inputField2}>
            <Text style={styles.subheaderText}>What medication or supplies will you need?</Text>
            <TextInput style={styles.inputText} value={supplies} onChangeText={(text) => handleSuppliesChange(text)} maxLength={100} placeholder='List them here'/>             
          </KeyboardAvoidingView>

          <View style={{flexDirection: 'row', alignItems:'center', marginTop: "2%"}}>
            <Text style={styles.showSuppliesText}>Show supplies on notification?</Text>
            <Switch trackColor={{false: white, true: red}} value={showSupplies} onValueChange={toggleSupplies}/>
          </View>

        </View>

          <View style={{alignItems: 'center'}}>
            <TouchableOpacity 
              style={styles.buttonStyle}
              onPress={goToSchedPage}
            >
              <Text style={styles.buttonText}>Schedule Reminder</Text>
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
    marginBottom: '2%',
    width: "90%",
    marginLeft: "10%"
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
    paddingBottom: 5,
    color: grey
  },

  inputField: {
    borderBottomColor: red,
    borderBottomWidth: 2,
    width: "80%",
    marginTop: "5%"
  },

  inputField2: {
    borderBottomColor: red,
    borderBottomWidth: 2,
    width: "80%",
    marginTop: "10%",
  },

  showSuppliesText: {
    color: grey,
    fontSize: 16,
    fontFamily: "Montserrat_700Bold",
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