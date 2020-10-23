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
  const [switch1, changeSwitch1] = useState(false)
  const [switch2, changeSwitch2] = useState(false)
  const [switch3, changeSwitch3] = useState(false)


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
        <ScrollView>
          <View style={styles.frequencyBox}>
            <Text style={styles.headerText}>Frequency</Text>
            <View style={styles.frequencySwitch}>
              <Text style={styles.dateLabel}>Monday through Friday 
              </Text>
                <Switch trackColor={{false: white, true: red}} value={switch1} onValueChange={() => changeSwitch1(!switch1)}/>
            </View>
            <View style={styles.frequencySwitch}>
              <Text style={styles.dateLabel}>Everyday</Text>
                <Switch trackColor={{false: white, true: red}} value={switch2} onValueChange={() => changeSwitch2(!switch2)}/>
            </View>
            <View style={styles.frequencySwitch}>
              <Text style={styles.dateLabel}>Custom </Text>
                <Switch trackColor={{false: white, true: red}} value={switch3} onValueChange={() => changeSwitch3(!switch3)}/>
            </View>
          </View>
          
          <View style={styles.frequencyBox}>
            <Text style={styles.headerText}>Time</Text>
            <DateTimePicker value={Date.now()} mode="time"/>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonStyle}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
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
    justifyContent: "center"
  },

  welcomeText: {
    color: lightBlue,
    fontSize: 26,
    fontFamily: "Montserrat_700Bold",
    marginLeft: 10, 
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
    marginLeft: 10
  },

  dateLabel: {
    fontSize: 28,
    fontFamily: 'OpenSansCondensed_300Light',
    alignItems: 'center',
  },
  
  frequencySwitch : {
    marginTop: 10, 
    flexDirection: 'row', 
    justifyContent: 'space-between'
  }


})
