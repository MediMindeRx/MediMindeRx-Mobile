import React from 'react'
import {AppLoading} from 'expo'
import {useFonts, Montserrat_400Regular_Italic, Montserrat_700Bold} from '@expo-google-fonts/montserrat'
import {
    StyleSheet,
    Text,
    View,
    Image,
  } from 'react-native';
  import logo from '../../assets/logo.png'
  import {red, lightBlue} from '../ui/colors'

  export default Header = () => {

    const [fontsLoaded] = useFonts({
      Montserrat_400Regular_Italic,
      Montserrat_700Bold
    })

    if (!fontsLoaded) {
      return <AppLoading/>
    } else {
      return(
        <View style={styles.container}>
          <Image source={logo} style={{width: 305, height: 159}} resizeMode='contain'/>
          <Text style={{margin: 0}}>
            <Text style={styles.blueText}>Remember less,</Text>  
            <Text style={styles.redText}> experience more.</Text>
          </Text>
        </View>
      )
    }
}

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
    }, 
    blueText: {
      color: lightBlue,
      fontSize: 20,
      fontStyle: 'italic', 
      fontFamily: 'Montserrat_400Regular_Italic'
    },
    redText: {
      color: red, 
      fontSize: 20, 
      fontFamily: 'Montserrat_700Bold'
    }
  })