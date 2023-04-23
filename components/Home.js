import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, TextInput, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function MapScreen() {
  const [region, setRegion] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
    })();
  }, []);

  useEffect(() => {
    if (region) {
      axios.get(`http://www.mapquestapi.com/geocoding/v1/reverse?key=X8LM13kjba4mYa6lTGFnmjY3SM53Pi0Q&location=${region.latitude},${region.longitude}`)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [region]);

  const handleSearch = () => {
    if (currentLocation && destination) {
      axios.get(`http://www.mapquestapi.com/geocoding/v1/address?key=X8LM13kjba4mYa6lTGFnmjY3SM53Pi0Q &location=${destination}`)
        .then(response => {
          const { lat, lng } = response.data.results[0].locations[0].latLng;
          setRegion({
            latitude: lat,
            longitude: lng,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  } else if (region) {
    return (
      
      <View style={styles.container}>
         <MapView
          style={styles.map}
          initialRegion={region}
          onRegionChangeComplete={setRegion}
        >
          <Marker coordinate={region} />
        </MapView>
        <View style={styles.textInputsContainer}>
        <TextInput
            style={styles.textInput}
            onChangeText={setCurrentLocation}
            value={currentLocation}
            placeholder="Enter current Location"
          />
           <TextInput
            style={styles.textInput}
            onChangeText={setDestination}
            value={destination}
            placeholder="Enter destination"
          />
          {/* <Button
            title="Search"
            onPress={handleSearch}
          /> */}
                </View>

      </View>
    );
  } else {
    return <View />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex:1,
    width:'100%',
    height: '60%',
  },
  textInputsContainer: {
    position: 'absolute',
    top: 30,
    left: 52,
    right: 42,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 999,
    borderWidth:1,
    borderColor:'white',
    borderRadius:18,
    width:274,
    backgroundColor:'white',
  },
  textInput: {
    flex: 1,
    left:5,
    top:3,
    height: 45,
    backgroundColor: '#F8F4F4',
    borderRadius: 5,
    marginRight: 10,
    marginVertical:11,
    width:193,
    paddingLeft:23,
    paddingTop:15,
    borderWidth:1,
    borderColor:'#F8F4F4',
    alignItems:'center'
  },
});
