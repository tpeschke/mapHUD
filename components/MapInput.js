import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default class MapInput extends Component {
    constructor() {
        super()

        this.state = {
            destination: ''
        }
    }


    render() {
        return (
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={"Where do you want to go?"} />
                <Button
                    style={{width: 50, height: 50}} 
                    title="Q"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        ...StyleSheet.absoluteFillObject,
        height: 50,
        width: 350,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: 'white',
        flex: 1,
    },
    input: {
        flex: 1,
        backgroundColor: 'white',
        textAlign: 'center'
    }
});