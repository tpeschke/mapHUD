import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import MapInput from './MapInput'


export default class MapComp extends Component {
  constructor() {
    super()

    this.state = {
      lat: -34.397,
      long: 150.644,
      id: null
    }

    this.retrievePosition = this.retrievePosition.bind(this)
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(e => this.setState({ lat: e.coords.latitude, long: e.coords.longitude }),
      (error) => alert(JSON.stringify(error)),
      { enableHighAccuracy: true})
    this.setState({ id: setInterval(_ => this.retrievePosition(), 2000) })
  }

  componentWillUnmount() {
    clearInterval(this.state.id)
  }

  retrievePosition() {
    navigator.geolocation
      .watchPosition(e => this.setState({ lat: e.coords.latitude, long: e.coords.longitude }),
        (error) => alert(JSON.stringify(error)),
        { enableHighAccuracy: true, maximumAge: 1000, distanceFilter: 1 })
  }

  render() {
    const refreshTrigger = this.state.lat

    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <MapInput 
                lat={this.state.lat}
                long={this.state.long}/>
        </View>
        <View style={{ flex: 6, backgroundColor: 'grey' }}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: this.state.lat,
              longitude: this.state.long,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}>
            <Marker
              coordinate={{
                latitude: this.state.lat,
                longitude: this.state.long,
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
    flex: 4,
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
