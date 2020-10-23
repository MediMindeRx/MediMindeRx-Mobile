import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Switch
  } from 'react-native';
import Header from '../Header/Header';
import {lightBlue, white, red} from '../ui/colors';
import {useFonts, Montserrat_700Bold} from '@expo-google-fonts/montserrat';
import {AppLoading} from 'expo';
import DateTimePicker from '@react-native-community/datetimepicker';

export default FrequencyPage = () => {
  const [fontsLoaded] = useFonts({
    Montserrat_700Bold
  })

  if (!fontsLoaded) {
    return <AppLoading/>
  } else {
    return (
      <View style={styles.container}>
        <Header />
        <Text style={styles.welcomeText}>When should I send your reminder?</Text>
        <View style={styles.frequencyBox}>
          <Text style={styles.welcomeText}>Frequency</Text>
          <View style={styles.spaceBetween}><Text style={styles.dateLabel}>Monday through Friday <Switch style={styles.switchStyle}></Switch></Text></View>
          <View style={styles.spaceBetween}><Text style={styles.dateLabel}>Every Day <Switch style={styles.switchStyle}></Switch></Text></View>
          <Text style={styles.dateLabel}>Custom <Switch style={styles.switchStyle}></Switch></Text>
        </View>
        <View style={styles.frequencyBox}>
          <Text style={styles.welcomeText}>Time</Text>
          <DateTimePicker value={Date.now()} mode="time"/>
        </View>
        <TouchableOpacity style={styles.buttonStyle}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
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
  welcomeText: {
    color: lightBlue,
    fontSize: 26,
    fontFamily: "Montserrat_700Bold",
  },
  inputText: {
    color: red,
    fontSize: 38,
    fontFamily: "Montserrat_700Bold",
    marginTop: 40,
    textAlign: "center",
    // borderBottom: red
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
    marginTop: 20
  },
  dateLabel: {
    fontSize: 26,
    marginTop: 10,
    justifyContent: "space-between"
  },
  spaceBetween: {
    display: "flex",
    justifyContent: "space-between"
  }
  // switchStyle: {
  //   textAlign: "right",
  //   alignContent: "flex-end",
  //   justifyContent: "flex-end"
  // }

})
