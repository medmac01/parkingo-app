// import 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View ,Image, TouchableHighlight, Button } from 'react-native';
import WelcomeScreen from './app/screens/WelcomeScreen';
import Map from './app/screens/Map';
import Admin from './app/screens/Admin';
// import { NavigationContainer } from '@react-navigation/native';
 


export default class App extends React.Component{
  // state = {
  //   appIsReady: false,
  // };

  // async componentDidMount () {
  //   // Prevent native splash screen from autohiding
  //   try {
  //     await SplashScreen.preventAutoHideAsync();
  //   } catch (e) {
  //     console.warn(e);
  //   }
  //   this.prepareResources();
  // }

  // prepareResources = async () => {
  //   try {
  //     await performAPICalls();
  //     await downloadAssets();
  //   } catch (e) {
  //     console.warn(e);
  //   } finally {
  //     this.setState({ appIsReady: true }, async () => {
  //       await SplashScreen.hideAsync();
  //     });
  //   }
  // };

  render() {
    return ( <Map/> );
  }




  
   
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
