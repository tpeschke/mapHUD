import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import MapInput from './MapInput'


export default class MapComp extends Component {
  static navigationOptions = {
    header: null
}

  render() {
    var {long, lat} = this.props.navigation.state.params

    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <MapInput 
                lat={lat}
                long={long}/>
        </View>
        <View style={{ flex: 8, backgroundColor: 'grey' }}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: lat,
              longitude: long,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}>
            <Marker
              coordinate={{
                latitude: lat,
                longitude: long,
              }}></Marker>
          </MapView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    flex: 5,
    backgroundColor: 'lightblue'
  },
  input: {
    flex: 1,
    backgroundColor: 'whitesmoke'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    zIndex: 0
  },
});
