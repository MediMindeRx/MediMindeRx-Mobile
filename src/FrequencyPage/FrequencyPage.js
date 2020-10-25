import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Switch,
    ScrollView,
    Alert
  } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'


//ui
import {LinearGradient} from 'expo-linear-gradient'
import Header from '../Header/Header';
import {lightBlue, white, red, grey} from '../ui/colors';
import {useFonts, Montserrat_700Bold, Montserrat_600SemiBold} from '@expo-google-fonts/montserrat';
import {OpenSansCondensed_300Light} from '@expo-google-fonts/open-sans-condensed'
import {AppLoading} from 'expo';

export default FrequencyPage = ({ navigation, route }) => {
  const {user} = route.params

  const [singleDateSwitch, toggleSingleDateSwitch] = useState(false)
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

  const toggleCustomDays = (day) => {
    user.currentReminder.days.includes(day) ?
          user.currentReminder.days.splice(user.currentReminder.days.indexOf(day), 1)
          : user.currentReminder.days.push(day)
  }

  const toggleDay = (day) => {
    toggleCustomDays(day)
    switch(day) {
      case "Monday":
        toggleMonday(!monday)
        break
      case "Tuesday":
        toggleTuesday(!tuesday)
        break
      case "Wednesday":
      toggleWednesday(!wednesday)
        break
      case "Thursday":
      toggleThursday(!thursday)
        break
      case "Friday":
        toggleFriday(!friday)
        break
      case "Saturday":
        toggleSaturday(!saturday)
        break
      case "Sunday":
      toggleSunday(!sunday)
        break
    }
  }


  const daysList = () => {
    const daysJSX = [monday, tuesday, wednesday, thursday, friday, saturday, sunday].map((day, i) => {
      return (
        <View key={sevenDays[i]} style={styles.frequencySwitch}>
          <Text style={styles.dateLabel}>{sevenDays[i]}</Text>
          <Switch
            trackColor={{false: white, true: red}}
            value={day}
            onChange={() => toggleDay(sevenDays[i])}/>
        </View>
      )
    })
    return daysJSX
  }


  const switchWorkweek = (switchName) => {
    if (switchName === "workweek") {
      const workingDays = sevenDays.slice(0, 5)
      user.currentReminder.days.push(...workingDays)
      toggleWorkweek(!workweek)
      toggleEveryday(false)
      toggleCustom(false)
      if (workweek) {
        user.currentReminder.days = []
      }
    }
  }

  const switchEveryday = (switchName) => {
    if (switchName === "everyday") {
      user.currentReminder.days.push(...sevenDays)
      toggleEveryday(!everyday)
      toggleCustom(false)
      toggleWorkweek(false)
      if (everyday) {
        user.currentReminder.days = []
      }
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
    switchWorkweek(switchName)
    switchEveryday(switchName)
    switchCustom(switchName)
  }

  const timeChange = (event, date) => {
    const isAfterNoon = moment(date).local().hour() > 12
    const hour = isAfterNoon ? moment(date).local().hour() - 12 : moment(date).local().hour()
    const minute = moment(date).minute() < 10 ? `0${moment(date).minute()}` : moment(date).minute()
    user.currentReminder.time = `${hour}:${minute} ${isAfterNoon ? "PM" : "AM"}`
  }

  const singleDateChange = (event, date) => {
    const singleDate = moment(date).format('LL')
    user.currentReminder.days.push(singleDate)
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


   const alertMissingDays = () =>
    Alert.alert(
      "No Days Selected",
      "What days would you like to be reminded?",
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

   const alertMissingTime = () =>
      Alert.alert(
        "No Time Selected",
        "What time should we remind you?",
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

    const alertMissingTimeDays = () =>
      Alert.alert(
        "Add Date & Time",
        "We can't schedule without your input! Select days and time to send reminder.",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      )


  const saveData = () => {
    // if (user.currentReminder.days.length === 0 && alert.currentReminder.time === '' ) {
    //   alertMissingTimeDays()
    // } else if (user.currentReminder.time === '' ) {
    //   alertMissingTime()
    // } else if (user.currentReminder.days.length === 0) {
    //   alertMissingDays()
    // } else {
      user.reminders.push(user.currentReminder)
      navigation.navigate('Profile', {user: user})
      // send to server
    // }
  }

  const [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    OpenSansCondensed_300Light,
    Montserrat_600SemiBold
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
                <Text style={styles.dateLabel}>Repeat</Text>
                <Switch trackColor={{false: white, true: red}} value={singleDateSwitch} onValueChange={() => toggleSingleDateSwitch(!singleDateSwitch)}/>
              </View>

            {singleDateSwitch === false && 
              <View style={styles.frequencyBox}>
                <Text style={styles.headerText}>Date</Text>
                <DateTimePicker value={new Date()} onChange={singleDateChange}/>
               </View>
            }

            {singleDateSwitch &&
              <View>
                <View style={styles.frequencySwitch}>
                  <Text style={styles.dateLabel}>Monday through Friday </Text>
                  <Switch trackColor={{false: white, true: red}} value={workweek} onValueChange={() => setUserDays("workweek")}/>
                </View>

                <View style={styles.frequencySwitch}>
                  <Text style={styles.dateLabel}>Everyday</Text>
                  <Switch trackColor={{false: white, true: red}} value={everyday} onValueChange={() => setUserDays("everyday")}/>
                </View>
                <View style={styles.frequencySwitch}>
                  <Text style={styles.dateLabel}>Custom </Text>
                  <Switch trackColor={{false: white, true: red}} value={custom} onValueChange={() => setUserDays("custom")}/>
                </View>
                {custom ? <View>{daysList()}</View> : null}
              </View>
            }

            </View>


          <View style={styles.frequencyBox}>
            <Text style={styles.headerText}>Time</Text>
            <DateTimePicker value={new Date()} mode="time" onChange={timeChange}/>
          </View>

        </ScrollView>
        </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={saveData}
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
    fontSize: 20,
    fontFamily: 'Montserrat_600SemiBold',
    alignItems: 'center',
    color: grey
  },

  frequencySwitch: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }


})
