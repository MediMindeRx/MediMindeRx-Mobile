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
          <Image source={logo} style={{width: "100%", height: 75}} resizeMode='contain'/>
          <Text>
            <Text style={styles.blueText}>Worry less,</Text>  
            <Text style={styles.redText}> experience more.</Text>
          </Text>
        </View>
      )
    }
}

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      marginTop: "7%",
      marginBottom: "5%"
    }, 
    blueText: {
      color: lightBlue,
      fontSize: 20,
      fontFamily: 'Montserrat_400Regular_Italic'
    },
    redText: {
      color: red, 
      fontSize: 20, 
      fontFamily: 'Montserrat_700Bold'
    }
  })