import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Switch,
    ScrollView
  } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


//ui
import {LinearGradient} from 'expo-linear-gradient'
import Header from '../Header/Header';
import {lightBlue, white, red} from '../ui/colors';
import {useFonts, Montserrat_700Bold} from '@expo-google-fonts/montserrat';
import {OpenSansCondensed_300Light} from '@expo-google-fonts/open-sans-condensed'
import {AppLoading} from 'expo';

export default FrequencyPage = ({ navigation, route }) => {
  const {user} = route.params


  const [workweek, toggleWorkweek] = useState(false)
  const [everyday, toggleEveryday] = useState(false)
  const [custom, toggleCustom] = useState(false)
  const [sunday, toggleSunday] = useState(false)
  const [monday, toggleMonday] = useState(false)
  const [tuesday, toggleTuesday] = useState(false)
  const [wednesday, toggleWednesday] = useState(false)
  const [thursday, toggleThursday] = useState(false)
  const [friday, toggleFriday] = useState(false)
  const [saturday, toggleSaturday] = useState(false)
  const sevenDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  
  const daysList = () => {
    const daysJSX = sevenDays.map(day => {
      return (
        <View key={day} style={styles.frequencySwitch}>
          <Text style={styles.dateLabel}>{day}</Text>
          <Switch trackColor={{false: white, true: red}} value={day} onChange={() => toggleDay(!day)}/>
        </View>
      )
    })
    return daysJSX
  }

  
  const switchWorkWeek = (switchName) => {
    if (switchName === "workweek") {
      const workingDays = sevenDays.slice(0, 5)
      user.currentReminder.days.push(workingDays)
      toggleWorkweek(!workweek)
      toggleEveryday(false)
      toggleCustom(false)
    }
  }
  
  const switchEveryday = (switchName) => {
    if (switchName === "everyday") {
      user.currentReminder.days.push([...sevenDays])
      toggleEveryday(!everyday)
      toggleCustom(false)
      toggleWorkweek(false)
    }
  }
  
  const switchCustom = (switchName) => {
    if (switchName === "custom") {
      toggleCustom(!custom)
      toggleEveryday(false)
      toggleWorkweek(false)
    } 
  }

  const setUserDays = (switchName) => {
    user.currentReminder.days = []
    switchWorkWeek(switchName)
    switchEveryday(switchName)
    switchCustom(switchName)
    console.log(user.currentReminder.days)
  }

  //   if (custom) {
  //   const days = [monday, tuesday, wednesday, thursday, friday, saturday, sunday]
  //   const selectedDays = sevenDays.filter((day, index) => {
  //     return days[index]
  //     }
  //   )
  //   user.currentReminder.days.push([...selectedDays])
  // }


  // write method to connect global store to here?

  const [fontsLoaded] = useFonts({
    Montserrat_700Bold, 
    OpenSansCondensed_300Light
  })

  if (!fontsLoaded) {
    return <AppLoading/>
  } else {
    return (
      <View style={styles.container}>

        <LinearGradient colors={[white, white, "#E0EAFC"]} style={styles.linearGradient} >


        <Header />
          <Text style={styles.welcomeText}>When should I send your reminder?</Text>
          <View style={{height: "50%"}}>
        <ScrollView>
          <View style={styles.frequencyBox}>
            <Text style={styles.headerText}>Frequency</Text>
            <View style={styles.frequencySwitch}>
              <Text style={styles.dateLabel}>Monday through Friday 
              </Text>
                <Switch trackColor={{false: white, true: red}} value={workweek} onValueChange={() => setUserDays("workweek")}/>
            </View>
            <View style={styles.frequencySwitch}>
              <Text style={styles.dateLabel}>Everyday</Text>
                <Switch trackColor={{false: white, true: red}} value={everyday} onValueChange={() => setUserDays("everyday")}/>
            </View>
            <View style={styles.frequencySwitch}>
              <Text style={styles.dateLabel}>Custom </Text>
                <Switch trackColor={{false: white, true: red}} value={custom} onChange={() => setUserDays("custom")}/>
              </View>
              {custom ? <View>{daysList()}</View> : null}
                
          </View>

          <View style={styles.frequencyBox}>
            <Text style={styles.headerText}>Time</Text>
            <DateTimePicker value={Date.now()} mode="time"/>
          </View>

        </ScrollView>
        </View> 
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.buttonStyle}
              style={styles.buttonStyle}
              onPress={() => navigation.navigate('Profile')}
            >
              <Text style={styles.buttonText}>Save Reminder</Text>
            </TouchableOpacity>
          </View>

      </LinearGradient>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    flex: 1
  },

   linearGradient: {
    flex: 1,
    },

  buttonContainer: {
    alignItems: "center",
    justifyContent: "center"
  },

  welcomeText: {
    color: lightBlue,
    fontSize: 26,
    fontFamily: "Montserrat_700Bold",
    marginLeft: 30, 
    width: "80%"
  },

  headerText: {
    color: lightBlue,
    fontSize: 26,
    fontFamily: "Montserrat_700Bold",
  },

  buttonText: {
    color: white,
    fontFamily: "Montserrat_700Bold",
    fontSize: 20,
    textAlign: "center"
  },

  buttonStyle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    backgroundColor: red,
    padding: 13,
    borderRadius: 10,
    marginTop: 20,
    width: "60%",
  },

  frequencyBox: {
    marginTop: 20,
    marginLeft: 30,
    width: "85%"
  },

  dateLabel: {
    fontSize: 28,
    fontFamily: 'OpenSansCondensed_300Light',
    alignItems: 'center',
  },
  
  frequencySwitch: {
    marginTop: 10, 
    flexDirection: 'row', 
    justifyContent: 'space-between'
  }


})
