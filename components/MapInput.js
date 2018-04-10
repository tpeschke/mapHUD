import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native';
import config from '../config'
import Button from 'apsl-react-native-button'
import axios from 'axios'

export default class MapInput extends Component {
    constructor() {
        super()

        this.state = {
            destination: '',
            predictions: [],
            height: 0
        }
    }

    captureInput = (e) => {
        this.setState({ destination: e.text })
        axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${e.text}&key=${config.getAPIKEY()}&location=${this.props.lat},${this.props.long}`)
            .then(res => {
                this.setState({ predictions: res.data.predictions })
            })
    }

    render() {
            var predics = this.state.predictions.map(val => {
                return (
                    <View key={val.id}>
                        <Text>{val.description}</Text>
                    </View>
                )
            })

        return (
            <View style={styles.inputContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={{ height: 40, width: 290, paddingLeft: 10 }}
                        placeholder={'Where would you like to go?'}
                        onChangeText={(text) => this.captureInput({ text })}
                        value={this.state.destination} />
                    <Button
                        style={{ height: 35, width: 35, backgroundColor: '#4169e1' }}
                        textStyle={{ fontSize: 17, color: 'whitesmoke' }}
                    >Q</Button>
                </View>
                <View style={styles.predics}>
                    {predics}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        ...StyleSheet.absoluteFillObject,
        height: 640,
        width: 350,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10
    },
    predics: {
        ...StyleSheet.absoluteFillObject,
        height: 100,
        width: 350,
        backgroundColor: '#fff'
    }
});