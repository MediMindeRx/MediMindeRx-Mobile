import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
  } from 'react-native';
  import logo from '../../assets/logo.png'
  import {red, lightBlue, white} from '../ui/colors'

  export default Header = () => {
    
    return(
      <View style={styles.container}>
        <Image source={logo} style={{width: 305, height: 159}} resizeMode='contain'/>
        <Text>
          <Text style={{color: lightBlue, fontSize: 22, fontStyle: 'italic', margin: 0}}>Remember less,</Text>  
          <Text style={{color: "red", fontSize: 22, fontWeight: "800"}}> experience more.</Text>
        </Text>
      </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      justifyContent: "flex-start",
      alignItems: "center"
    }
  })