import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import MapInput from './MapInput'


export default class Home extends Component {
  constructor() {
    super()

    this.state = {
      curLat: 0,
      curLong: 0,
      lat: 0,
      long: 0,
      id: null
    }

    this.retrievePosition = this.retrievePosition.bind(this)
  }

  componentDidMount() {
    navigator.geolocation
      .getCurrentPosition(e => this.setState({ curLat: e.coords.latitude, curLong: e.coords.longitude, lat: e.coords.latitude, long: e.coords.longitude }),
        (error) => alert(JSON.stringify(error)),
        { enableHighAccuracy: true, maximumAge: 1000 })
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
    const { region } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.input}>
          {/* <MapInput 
                lat={this.state.lat}
                long={this.state.long}/> */}
        </View>
        <View style={{ flex: 6, backgroundColor: 'lightblue' }}>
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
                latitude: this.state.curLat,
                longitude: this.state.curLong,
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
