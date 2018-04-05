import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import config from '../config'

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
                <GooglePlacesAutocomplete
                    placeholder='Where would you like to go?'
                    minLength={2} // minimum length of text to search
                    autoFocus={false}
                    returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                    listViewDisplayed='auto'    // true/false/undefined
                    fetchDetails={true}
                    renderDescription={row => row.description} // custom description render
                    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                        console.log(data, details);
                    }}

                    getDefaultValue={() => ''}

                    query={{
                        // available options: https://developers.google.com/places/web-service/autocomplete
                        key: config.getAPIKEY(),
                        language: 'en', // language of the results
                        types: '(cities)' // default: 'geocode'
                    }}

                    styles={{
                        textInputContainer: {
                            backgroundColor: 'rgba(0,0,0,0)',
                            borderTopWidth: 0,
                            borderBottomWidth:0
                          },
                          textInput: {
                            marginLeft: 0,
                            marginRight: 0,
                            height: 38,
                            color: '#5d5d5d',
                            fontSize: 16
                          },
                          predefinedPlacesDescription: {
                            color: '#1faadb'
                          },
                    }}

                    currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                    currentLocationLabel="Current location"
                    nearbyPlacesAPI='GoogleReverseGeocoding' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                    GoogleReverseGeocodingQuery={{
                        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                    }}
                    GooglePlacesSearchQuery={{
                        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                        rankby: 'distance'
                    }}

                    filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                    //   predefinedPlaces={[homePlace, workPlace]}

                    debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                    //   renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
                    // renderRightButton={() => <Text>Q</Text>}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        ...StyleSheet.absoluteFillObject,
        height: 40,
        width: 350,
        // paddingLeft: 15,
        // paddingRight: 10,
        // paddingTop: 8,
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10
    },
});