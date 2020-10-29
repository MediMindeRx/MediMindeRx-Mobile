import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications'
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
import {AppLoading} from 'expo';
import {getAllRemindersAPI, addReminderTypeAPI} from '../apiCalls/apiCalls'

//ui
import {LinearGradient} from 'expo-linear-gradient'
import Header from '../Header/Header';
import {lightBlue, white, red, grey} from '../ui/colors';
import {useFonts, Montserrat_700Bold, Montserrat_600SemiBold} from '@expo-google-fonts/montserrat';
import {OpenSansCondensed_300Light} from '@expo-google-fonts/open-sans-condensed'

export default FrequencyPage = ({ navigation, route }) => {
  const {user} = route.params
  
  const [singleDateSwitch, toggleSingleDateSwitch] = useState(false)
  const [singleDate, setSingleDate] = useState(new Date())
  const [time, setSingleTime] = useState(new Date())
  const [workweek, toggleWorkweek] = useState(false)
  const [everyday, toggleEveryday] = useState(false)
  const [weekend, toggleWeekend] = useState(false)
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
    user.currentReminder.scheduled.days.includes(day) ?
          user.currentReminder.scheduled.days.splice(user.currentReminder.scheduled.days.indexOf(day), 1)
          : user.currentReminder.scheduled.days.push(day)
    user.currentReminder.scheduled.days.sort((a, b) => {
        return moment(a, 'ddd dddd') > moment(b, 'ddd dddd');
          })
      };
  

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

  const toggleAllOff = () => {
    toggleCustom(false)
    toggleWorkweek(false)
    toggleEveryday(false)
    toggleWeekend(false)  
  }

  const setUserDays = (switchName) => {
    user.currentReminder.scheduled.days = []
    toggleAllOff()
    switch(switchName) {
      case "everyday":
        toggleEveryday(!everyday)
        everyday ? user.currentReminder.scheduled.days = [] : user.currentReminder.scheduled.days.push(...sevenDays)
        break
      case "workweek":
        toggleWorkweek(!workweek)
        const workingDays = sevenDays.slice(0, 5)
        workweek ? user.currentReminder.scheduled.days = [] : user.currentReminder.scheduled.days.push(...workingDays)
        break
      case "weekend":
        toggleWeekend(!weekend)
        const weekendDays = sevenDays.slice(-2)
        weekend ? user.currentReminder.scheduled.days = [] : user.currentReminder.scheduled.days.push(...weekendDays)
        break
      case "custom":
      toggleCustom(!custom)
        break
    }
  }

  const timeChange = (event, date) => {
    formatTime(date)
  }
  
  const formatTime = (date) => {
    const isAfterNoon = moment(date).local().hour() > 12
    const hour = isAfterNoon ? moment(date).local().hour() - 12 : moment(date).local().hour()
    const formatHour = hour === 0 ? 12 : hour
    const minute = moment(date).minute() < 10 ? `0${moment(date).minute()}` : moment(date).minute()
    const timeFormat = formatHour + ":" + minute + " " + `${isAfterNoon ? "PM" : "AM"}`
    user.currentReminder.scheduled.time = timeFormat
    user.currentReminder.scheduled.unixDate = date.getTime()
  }

  const singleDateChange = (event, date) => {
    const singleDateFormat = moment(date).format('LL')
    user.currentReminder.scheduled.days.push(singleDateFormat)
  }

  const inputCheck = () => {
    if (!user.currentReminder.scheduled.time) {
      formatTime(time)
    } 
    if (user.currentReminder.scheduled.days.length === 0) {
      let singleDateFormat = moment(singleDate).format('LL')
      user.currentReminder.scheduled.days.push(singleDateFormat)
    } 
    if (user.currentReminder.scheduled.days.length > 1) {
      user.currentReminder.scheduled.repeating = true
    }
    saveData()
  }
  
  const saveData = async () => {
    const serverFormatDays = user.currentReminder.scheduled.days.join(' ')
    const formatReminderType = {
      "schedule_name": user.currentReminder.title,
      "reminder_id": `${user.currentReminder.id}`,
      "times": user.currentReminder.scheduled.time,
      "days": serverFormatDays,
      "unix_time": user.currentReminder.scheduled.unixDate.toString(),
      "repeating": `${user.currentReminder.scheduled.repeating}`     
    } 
    
    try {
      await addReminderTypeAPI(formatReminderType)
      const updatedReminders = await getAllRemindersAPI(user.id)

      user.reminders = updatedReminders.data
      user.currentReminder = {
        title: '', 
        supplies: '', 
        showSupplies: false, 
        id: '', 
        scheduled: {
          days: [], 
          time: '', 
          fullDate: null
        },
        location: {
          locationName: '',
          long: '',
          lat: '',
          address:""
        }
      }
      navigation.navigate('Profile', {user: user})
    } catch (error) {
      console.log(error)
    }
  }
  
  const goBack = () => {
    user.currentReminder.scheduled.time = ''
    user.currentReminder.scheduled.days = []
    user.currentReminder.scheduled.repeating = false
    user.currentReminder.scheduled.unixDate = ''
    navigation.navigate('Trigger Options', {user: user})
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
              <View >
                <Text style={styles.headerText}>Date</Text>
                <DateTimePicker value={new Date()} onChange={singleDateChange} minimumDate={new Date()}/>
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
                  <Text style={styles.dateLabel}>Weekend</Text>
                  <Switch trackColor={{false: white, true: red}} value={weekend} onValueChange={() => setUserDays("weekend")}/>
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
              onPress={goBack}
            >
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={inputCheck}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },

  welcomeText: {
    color: lightBlue,
    fontSize: 26,
    fontFamily: "Montserrat_700Bold",
    marginLeft: 30,
    width: "80%",
    marginBottom: "2%"
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
    marginTop: "3%",
    marginLeft: "3%"
  },

  frequencyBox: {
    marginLeft: "8%",
    width: "85%"
  },

  dateLabel: {
    fontSize: 20,
    fontFamily: 'Montserrat_600SemiBold',
    alignItems: 'center',
    color: grey
  },

  frequencySwitch: {
    marginTop: "1%",
    flexDirection: 'row',
    justifyContent: 'space-between'
  }


})
