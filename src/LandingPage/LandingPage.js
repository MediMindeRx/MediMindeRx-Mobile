import React from 'react'
import {connect} from 'react-redux'
import {AppLoading} from 'expo'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
  } from 'react-native';
  import logo from '../../assets/logo.png'

  export default LandingPage = () => {
    
    
    return(
      <View>
        <Image source={logo} style={{width: 305, height: 159}} resizeMode='contain'/>
        <Text>Remember less, experience more</Text>
      </View>
    )



  }