import React from 'react'
// import {connect} from 'react-redux'
// import {AppLoading} from 'expo'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
  } from 'react-native';
  import {red, lightBlue, white} from '../ui/colors'
  import Header from '../Header/Header'

  export default LandingPage = () => {
    
    
    return(
      <View style={styles.container}>
        <Header />
      </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: white,
      alignItems: 'center',
      justifyContent: 'flex-start',
  }
})