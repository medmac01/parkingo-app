import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View ,Image, TouchableHighlight, Button } from 'react-native';

export default function App() {
  const handlePress = () => console.log('Text Pressed!');
  return (
    <View style={styles.container}>
      <TouchableHighlight>
      <Text onPress={handlePress}>Open up App.js to start working on your app!</Text>
      </TouchableHighlight>
      <Button title="Click me!" color="#32aa12" onPress={() => console.log('Button pressed!')} />
      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
