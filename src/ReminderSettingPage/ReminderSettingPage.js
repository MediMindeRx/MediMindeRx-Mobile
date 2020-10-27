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
    Alert,
    Switch
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


// ui
import {lightBlue, white, red, grey} from '../ui/colors'
import Header from '../Header/Header'
import {useFonts, Montserrat_700Bold} from '@expo-google-fonts/montserrat'
import {LinearGradient} from 'expo-linear-gradient'
import { ScrollView } from 'react-native-gesture-handler';


export default ReminderSettingPage = ({ navigation, route }) => {
  const [title, setTitle] = useState('')
  const [supply, setSupply] = useState('')
  const [supplies, setSupplies] = useState([])
  const [showSupplies, setShowSupplies] = useState(false)

  const {user} = route.params

  const handleTitleChange = (text) => {
    setTitle(text)
    user.currentReminder.title = text
  }

  const addSupply = () => {
    supplies.push(supply)
    setSupplies(supplies)
    setSupply('')
  }

  const deleteSupply = (deletedSupply) => {
    const updatedSupplies = supplies.filter(supply => supply !== deletedSupply)
    setSupplies(updatedSupplies)
  }

  const toggleSupplies = () => {
    user.currentReminder.showSupplies = !showSupplies
    setShowSupplies(!showSupplies)
  }

  const suppliesJSX = () => {
    if (supplies.length > 0) {
      return supplies.map(supply => {
        return(<View style={styles.supplyItem}>
                <Text style={[styles.showSuppliesText, {fontSize: 16}]}>{supply}</Text>
                <TouchableOpacity 
                    style={styles.deleteSupplyButton}
                    onPress={() => deleteSupply(supply)}
                  >
                    <Text style={[styles.buttonText, {fontSize: 14}]}>X</Text>
                  </TouchableOpacity>  
              </View>)
      })
    } 
  }


  const alertMissingSupplies = () =>
    Alert.alert(
      "Don't Forget What's Important",
      "Please add medical supplies to your reminder.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );

  const alertMissingTitle = () =>
    Alert.alert(
      "No Title Given",
      "Stay organized! Please add a title to your reminder.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );

  const alertMissingTitleSupplies = () =>
      Alert.alert(
        "What's This Reminder About?",
        "Add a title and supplies to your reminder.",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );


 const checkAlerts = () => {
   if (!user.currentReminder.supplies && !user.currentReminder.title) {
      alertMissingTitleSupplies()
    } else if (user.currentReminder.supplies.length === 0) {
      alertMissingSupplies()
    } else if (!user.currentReminder.title) {
      alertMissingTitle()
    } else {
      return "Reminder is ready"
    }
 }


  const goToOptionsPage = () => {
    user.currentReminder.supplies = supplies.join(' ')
    if (checkAlerts() === "Reminder is ready") {
      setTitle('')
      setSupply('')
      setSupplies('')
      setShowSupplies(false)
      // const apiReminder = {user.id, current.reminder.title, currentReminder.supplies, currentReminder.showSupplies}
      // createReminderAPI(apiReminder)
      navigation.navigate('Trigger Options', {user:user})
    }
  }

  const [fontsLoaded] = useFonts({
    Montserrat_700Bold
  })

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <KeyboardAwareScrollView 
        style={[styles.container, { backgroundColor: "#E0EAFC" }]}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={false}
      >

    
        <LinearGradient colors={[white, white, "#E0EAFC"]} style={styles.linearGradient} >
        <Header />
        <View style={{ alignItems:'center'}}>
          <Text style={styles.sectionHeaderText}>Let's set up a reminder, {user.name}.</Text>

        <View style={{height: "60%", width: "85%", marginBottom: "2%"}}>
          <ScrollView>
  
          <View style={styles.inputField}>
            <Text style={styles.subheaderText}>What should it be called?</Text>
            <TextInput 
                style={styles.inputText} 
                value={title} 
                onChangeText={(text) => handleTitleChange(text)} 
                maxLength={25} 
                placeholder='Enter its name here'/>
          </View>

          <View style={[styles.inputField, {marginTop: "5%"}]}>
            <Text style={styles.subheaderText}>What medication or supplies will you need?</Text>
          
            <View style={{flexDirection: "row", justifyContent:"space-evenly", alignItems: "center"}}>
              <TextInput 
                  style={[styles.inputText, {width: "80%"}]} 
                  value={supply} 
                  onChangeText={(text) => setSupply(text)} 
                  maxLength={15} 
                  placeholder='Add item here'/>
                  <TouchableOpacity 
                    style={styles.addButtonStyle}
                    onPress={addSupply}
                  >
                    <Text style={[styles.buttonText, {fontSize: 16}]}>Add</Text>
                  </TouchableOpacity>             
            </View>
          </View>
            {supplies.length !== 0 ? 
              (<View style={styles.supplyBox}>
                {suppliesJSX()}
              </View>) : null}


          </ScrollView>

          <View style={styles.supplyToggle}>
            <Text style={styles.showSuppliesText}>Show supplies on notification?</Text>
            <Switch trackColor={{false: white, true: red}} value={showSupplies} onValueChange={toggleSupplies}/>
          </View>
        </View>

          <View style={{alignItems: 'center'}}>
            <TouchableOpacity 
              style={styles.buttonStyle}
              onPress={goToOptionsPage}
            >
              <Text style={styles.buttonText}>Schedule Reminder</Text>
            </TouchableOpacity>
          </View>
        </View>
        </LinearGradient>
      </KeyboardAwareScrollView>
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
    marginLeft: "5%"
  },

  subheaderText: {
    color: lightBlue,
    fontSize: 20,
    fontFamily: "Montserrat_700Bold",
  },

  inputText: {
    fontSize: 21,
    fontFamily: "Montserrat_700Bold",
    marginTop: "5%",
    textAlign: "left",
    paddingBottom: 5,
    color: grey
  },
  
  inputField: {
    borderBottomColor: red,
    borderBottomWidth: 2,
    marginTop: "3%"
  },

  showSuppliesText: {
    color: grey,
    fontSize: 15,
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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },

  addButtonStyle: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    backgroundColor: red,
    padding: 8,
    borderRadius: 10,
  },

  supplyItem: {
    flexDirection: "row", 
    justifyContent:"space-between", 
    alignItems: "center", 
    width: "45%", 
    marginTop: "1.5%",
    marginRight: "5%"
  },

  supplyBox: {
    marginTop: "2%", 
    height: "25%", 
    flexWrap: 'wrap', 
    width: "100%", 
    alignItems: "center",
  },

  deleteSupplyButton: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    backgroundColor: red,
    borderRadius: 2,
    padding: 2
  },

  supplyToggle: {
    flexDirection: 'row', 
    justifyContent:"space-evenly", 
    alignItems:'center', 
  }

})