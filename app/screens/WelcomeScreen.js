//  import 'react-native-gesture-handler';

 import React from 'react'
 import { ImageBackground, StyleSheet, Text, View ,Button } from 'react-native'
// import { NavigationContainer } from '@react-navigation/native';
 import Swiper from './Swiper';

export default function WelcomeScreen() {

 return (

    <Swiper>

          <ImageBackground style={styles.slide} source={require("../assets/1.jpg")}>
            <Text style={styles.header}>EASY</Text>
            <Text style={styles.text}>Good nutrition is an important part of leading a healthy lifestyle</Text>
          </ImageBackground>
          <ImageBackground style={styles.slide} source={require("../assets/2.jpg")}>
            <Text style={styles.header}>SAFE</Text>
            <Text style={styles.text}>Good nutrition is an important part of leading a healthy lifestyle</Text>
          </ImageBackground>
          <ImageBackground style={styles.slide} source={require("../assets/3.jpg")}>
            <Text style={styles.header}>FREE</Text>
            <Text style={styles.text}>Good nutrition is an important part of leading a healthy lifestyle</Text>
          </ImageBackground>

          
    </Swiper>
          
          
        );
      }
    

 
 
 const styles = StyleSheet.create({
    slide: {
        flex: 1,                    // Take up all screen
        justifyContent: 'center',   // Center vertically
        alignItems: 'center',       // Center horizontally
      },
      // Header styles
      header: {
        color: '#FFFFFF',
        fontFamily: 'Avenir',
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical: 15,
        position:'absolute',
        paddingEnd:'80%'        
      },
      // Text below header
      text: {
        color: '#FFFFFF',
        fontFamily: 'Avenir',
        fontSize: 18,
        marginHorizontal: 40,
        textAlign: 'center',
      },
      button: {
        borderRadius: 50,         // Rounded border
        borderWidth: 2,           // 2 point border widht
        borderColor: '#FFFFFF',   // White colored border
        paddingHorizontal: 50,    // Horizontal padding
        paddingVertical: 10,      // Vertical padding
      },
 })
 