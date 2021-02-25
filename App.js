// import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View ,Image, TouchableHighlight, Button } from 'react-native';
import WelcomeScreen from './app/screens/WelcomeScreen';
import Map from './app/screens/Map';
// import { NavigationContainer } from '@react-navigation/native';
 


export default function App() {
  return ( <Map /> )
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
