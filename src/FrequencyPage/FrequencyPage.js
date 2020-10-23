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

export default FrequencyPage = () => {
  const [fontsLoaded] = useFonts({
    Montserrat_700Bold
  })

  if (!fontsLoaded) {
    return <AppLoading/>
  } else {
    return (
      <View>
        <Header />
        <Text>When should I send your MediMinders?</Text>
        <Text>Frequency</Text>
        <View>
        <Switch><Text>Monday through Friday</Text></Switch>
        <Switch><Text>Every Day</Text></Switch>
        <Switch><Text>Custom</Text></Switch>
        </View>
        <Text>Time</Text>
        <TextInput placeholder="datepicker"></TextInput>
      </View>
    )
  }
}
