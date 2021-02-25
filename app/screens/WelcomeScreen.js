//  import 'react-native-gesture-handler';

 import React from 'react'
 import { ImageBackground, StyleSheet, Text, View } from 'react-native'
// import { NavigationContainer } from '@react-navigation/native';
 
 function WelcomeScreen() {
     return (
        <ImageBackground source={require("../assets/welcomeBackground.jpeg")}
        style= {styles.background}
        ></ImageBackground>
     )
 }

 export default WelcomeScreen;
 
 const styles = StyleSheet.create({
    background: {
        flex:1
    }
 })
 