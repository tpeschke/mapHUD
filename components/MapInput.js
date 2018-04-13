import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';
import config from '../config'
import Button from 'apsl-react-native-button'
import axios from 'axios'
import MapDrop from './MapDrop'

export default class MapInput extends Component {
    constructor() {
        super()

        this.state = {
            destination: null,
            predictions: [{ id: 1, description: '' }, { id: 2, description: '' }, { id: 3, description: '' }, { id: 4, description: '' }, { id: 5, description: '' }],
            modalVisible: false,
            destObj: {}
        }
    }

    captureInput = (e) => {
        this.setState({ destination: e })

        axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${e}&key=${config.getAPIKEY()}&location=${this.props.lat},${this.props.long}`)
        .then(res => {
            if (e === '') {
                this.setState({ predictions: [{ id: 1, description: '' }, { id: 2, description: '' }, { id: 3, description: '' }, { id: 4, description: '' }, { id: 5, description: '' }]})
            } else {
                this.setState({ predictions: res.data.predictions })
            }
            })
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    setDestination = (obj) => {
        this.setState({destObj: obj, destination: obj.description, modalVisible: false})
    }

    render() {
        const {destination} = this.state;

        const destinationDisplay = function () {
            if (destination.length >= 45) {
                return destination.substring(0,42) + '...'
            }
            return destination
        }

        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TouchableHighlight
                        onPress={() => {
                            this.setModalVisible(true);
                        }}
                        style={styles.destination}>
                        <Text>{!destination || destination === '' ? 'Where Would You Like to Go?' : destinationDisplay()}</Text>
                    </TouchableHighlight>
                    <Button
                        style={{ height: 30, width: 30, backgroundColor: '#4169e1' }}
                        textStyle={{ fontSize: 17, color: 'whitesmoke' }}
                    >Q</Button>
                </View>
                <MapDrop
                    modalVisible={this.state.modalVisible}
                    setModalVisible={this.setModalVisible}
                    destination={destination}
                    captureInput={this.captureInput}
                    predictions={this.state.predictions}
                    setDestination={this.setDestination}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 22
    },
    inputContainer: {
        ...StyleSheet.absoluteFillObject,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-around',
        marginTop: 15,
    },
    destination: {
        width: 325,
        height: 30,
        backgroundColor: 'whitesmoke',
        paddingHorizontal: 10,
        paddingVertical: 5
    }
});