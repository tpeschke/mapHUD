import React, {Component} from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native';


export default class Home extends Component {
    constructor() {
        super()

        this.state = {
            lat: null,
            long: null
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(e => this.setState({ lat: e.coords.latitude, long: e.coords.longitude }),
          (error) => alert(JSON.stringify(error)),
          { enableHighAccuracy: true})
      }

    render(){
        return (
            <View>
                <Text>Home</Text>
            </View>
        )
    }
}