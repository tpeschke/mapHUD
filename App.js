import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './components/Home'

export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Home />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
});