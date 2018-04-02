import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps'

export default class App extends React.Component {
  constructor() {
    super()

    this.state = {
      curLat: 0,
      curLong: 0,
      lat: 0,
      long: 0,
      id: null
    }

    // this.retrievePosition = this.retrievePosition.bind(this)
  }

  componentDidMount() {
    navigator.geolocation
      .getCurrentPosition(e => this.setState({ curLat: e.coords.latitude, curLong: e.coords.longitude, lat: e.coords.latitude, long: e.coords.longitude }),
        (error) => alert(JSON.stringify(error)),
        { enableHighAccuracy: true, maximumAge: 1000 })
    // this.setState({ id: setInterval(_ => this.retrievePosition(), 2000) })
  }

  componentWillUnmount() {
    clearInterval(this.state.id)
  }

  // retrievePosition() {
  //   navigator.geolocation
  //     .watchPosition(e => this.setState({ lat: e.coords.latitude, long: e.coords.longitude }),
  //       (error) => alert(JSON.stringify(error)),
  //       { enableHighAccuracy: true, maximumAge: 1000, distanceFilter: 1 })
  // }

  render() {
    const { region } = this.props;

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
