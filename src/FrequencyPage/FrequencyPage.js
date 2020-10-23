import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Switch,
    ScrollView
  } from 'react-native';
import Header from '../Header/Header';
import {lightBlue, white, red} from '../ui/colors';
import {useFonts, Montserrat_700Bold} from '@expo-google-fonts/montserrat';
import {OpenSansCondensed_300Light} from '@expo-google-fonts/open-sans-condensed'
import {AppLoading} from 'expo';
import DateTimePicker from '@react-native-community/datetimepicker';

export default FrequencyPage = () => {
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

  const days = () => {
    const sevenDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const daysJSX = sevenDays.map(day => {
      return (
              <View style={styles.frequencySwitch}>
                <Text style={styles.dateLabel}>{day.charAt(0).toUpperCase() + day.slice(1)}</Text>
                <Switch trackColor={{false: white, true: red}} value={day.charAt(0).toLowerCase() + day.slice(1)} onChange={() => toggleDay(!day)}/>
              </View>)
    })
    return daysJSX
  }

  const [fontsLoaded] = useFonts({
    Montserrat_700Bold, 
    OpenSansCondensed_300Light
  })

  if (!fontsLoaded) {
    return <AppLoading/>
  } else {
    return (
      <View style={styles.container}>
        <Header />
          <Text style={styles.welcomeText}>When should I send your reminder?</Text>
         <View style={{height: 375}}>
        <ScrollView>
          <View style={styles.frequencyBox}>
            <Text style={styles.headerText}>Frequency</Text>
            <View style={styles.frequencySwitch}>
              <Text style={styles.dateLabel}>Monday through Friday 
              </Text>
                <Switch trackColor={{false: white, true: red}} value={workweek} onValueChange={() => toggleWorkweek(!workweek)}/>
            </View>
            <View style={styles.frequencySwitch}>
              <Text style={styles.dateLabel}>Everyday</Text>
                <Switch trackColor={{false: white, true: red}} value={everyday} onValueChange={() => toggleEveryday(!everyday)}/>
            </View>
            <View style={styles.frequencySwitch}>
              <Text style={styles.dateLabel}>Custom </Text>
                <Switch trackColor={{false: white, true: red}} value={custom} onChange={() => toggleCustom(!custom)}/>
              </View>
              {custom ? <View>{days()}</View> : null}
                
          </View>

          <View style={styles.frequencyBox}>
            <Text style={styles.headerText}>Time</Text>
            <DateTimePicker value={Date.now()} mode="time"/>
          </View>

        </ScrollView>
        </View> 
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonStyle}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    flex: 1
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
