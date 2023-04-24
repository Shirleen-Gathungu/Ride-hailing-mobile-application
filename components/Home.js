// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View, Text, Dimensions, TextInput,TouchableOpacity } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import axios from 'axios';
// import * as Location from 'expo-location';
// import Icon from 'react-native-vector-icons/MaterialIcons';



// const { width, height } = Dimensions.get('window');
// const ASPECT_RATIO = width / height;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// const Home = () => {
//   const [region, setRegion] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [destination, setDestination] = useState(null);
//   const [availableCars, setAvailableCars] = useState([]);
//   const [carsData, setCarsData] = useState([]);


//   useEffect(() => {
//     if (region) {
//       // Use an API to fetch the available cars based on the current region
//       axios.get(`https://gist.githubusercontent.com/Shirleen-Gathungu/486b41c24287b45bce801a56a29980e5/raw/8f8bc9f3b27c73beb130b25ab8edc03983fd2593/cars.json/latitude=${region.latitude}&longitude=${region.longitude}`)
//       .then(response => {
//         const cars = response.data.cars.map(car => ({ name: car.name, price: car.price }));
//         setAvailableCars(cars);
//         setCarsData(cars);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//     }
//   }, [region]);

//   const renderMarkers = () => {
//     return availableCars.map(car => (
//       <Marker
//         key={car.name}
//         coordinate={{ latitude: car.latitude, longitude: car.longitude }}
//         title={car.name}
//         description={`$${car.price}`}
//       />
//     ));
//   }

//   const CarList = ({ carsData }) => {
//     return (
//       <View>
//         {carsData.map(car => (
//           <View key={car.name} style={styles.carContainer}>
//             <Text style={styles.carName}>{car.name}</Text>
//             <Text style={styles.carPrice}>${car.price}</Text>
//           </View>
//         ))}
//       </View>
//     );
//   };

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setCurrentLocation({
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//       });
//       setRegion({
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//         latitudeDelta: LATITUDE_DELTA,
//         longitudeDelta: LONGITUDE_DELTA,
//       });
//     })();
//   }, []);

//   // useEffect(() => {
//   //   if (region) {
//   //     axios.get(`http://www.mapquestapi.com/geocoding/v1/reverse?key=X8LM13kjba4mYa6lTGFnmjY3SM53Pi0Q&location=${region.latitude},${region.longitude}`)
//   //       .then(response => {
//   //         console.log(response.data);
//   //       })
//   //       .catch(error => {
//   //         console.log(error);
//   //       });
//   //   }
//   // }, [region]);

//   const handleSearch = () => {
//     if (currentLocation && destination) {
//       axios.get(`http://www.mapquestapi.com/geocoding/v1/address?key=X8LM13kjba4mYa6lTGFnmjY3SM53Pi0Q &location=${destination}`)
//         .then(response => {
//           const { lat, lng } = response.data.results[0].locations[0].latLng;
//           setRegion({
//             latitude: lat,
//             longitude: lng,
//             latitudeDelta: LATITUDE_DELTA,
//             longitudeDelta: LONGITUDE_DELTA,
//           });
//         })
//         .catch(error => {
//           console.log(error);
//         });
//     }
//   }

//   if (errorMsg) {
//     return <Text>{errorMsg}</Text>;
//   } else if (region) {
//     return (
      
//       <View style={styles.container}>
//          <View style={styles.textInputsContainer}>
//           <View style = {styles.icons}>
//                 <Icon name="circle" size={10} color="#2596be" />
//                 <Icon style = {styles.littleIcons}name="circle" size={3} color="grey" />
//                 <Icon style = {styles.littleIcons} name="circle" size={3} color="grey" />
//                 <Icon style = {styles.littleIcons}name="circle" size={3} color="grey" />
//                 <Icon style = {styles.littleIcons}name="circle" size={3} color="grey" />
//                 <Icon style = {styles.littleIcons}name="circle" size={3} color="grey" />
//                 <Icon style = {styles.littleIcons}name="circle" size={3} color="grey" />
//                 <Icon style = {styles.littleIcons}name="circle" size={3} color="grey" />
//                 <Icon style = {styles.littleIcons}name="circle" size={3} color="grey" />
//                 <Icon style = {styles.littleIcons}name="circle" size={3} color="grey" />
//                 <Icon style = {styles.littleIcons}name="circle" size={3} color="grey" />
//                 <Icon style = {styles.littleIcons}name="circle" size={3} color="grey" />
//                 <Icon style = {styles.littleIcons}name="circle" size={3} color="grey" />
//                 <Icon style = {styles.littleIcons}name="circle" size={3} color="grey" />
//                 <Icon style = {styles.littleIcons}name="circle" size={3} color="grey" />
//                 <Icon style = {styles.littleIcons}name="circle" size={3} color="grey" />
//                 <Icon style = {styles.littleIcons}name="circle" size={3} color="grey" />
//                 <Icon style = {styles.littleIcons}name="circle" size={3} color="grey" />

//                 <Icon name="circle" size={10} color="#2596be" />
//           </View>
               
//         <TextInput
//             style={styles.textInput}
//             onChangeText={setCurrentLocation}
//             value={currentLocation}
//             placeholder="Enter current Location"
//           />
//            <TextInput
//             style={styles.textInput}
//             onChangeText={setDestination}
//             value={destination}
//             placeholder="Enter destination"
//           />
//            <TouchableOpacity style = {styles.button} onPress={handleSearch}>
//              <Text style = {styles.buttonText}>Search</Text>
//             </TouchableOpacity>

//                 </View>
//          <MapView
//           style={styles.map}
//           initialRegion={region}
//           onRegionChangeComplete={setRegion}
//         >
//       {renderMarkers()}
//           {/* <Marker coordinate={region} /> */}
//         </MapView>
//         <CarList carsData={carsData} />

       

//       </View>
//     );
//   } else {
//     return <View />;
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   map: {
//     flex:1,
//     width:'100%',
//     height: '50%',
    
//   },
//   textInputsContainer: {
//     position: 'absolute',
//     top: 30,
//     left: 52,
//     right: 42,
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     zIndex: 999,
//     borderWidth:1,
//     borderColor:'white',
//     borderRadius:18,
//     width:274,
//     backgroundColor:'white',
//   },
//   textInput: {
//     flex: 1,
//     left:5,
//     top:-61,
//     height: 45,
//     backgroundColor: '#F8F4F4',
//     borderRadius: 5,
//     marginRight: 10,
//     marginVertical:8,
//     width:193,
//     paddingLeft:23,
//     paddingTop:15,
//     borderWidth:1,
//     borderColor:'#F8F4F4',
//     alignItems:'center'
//   },
//   icons:{
//     marginLeft:-232,
//     top:38
//   },
//   littleIcons:{
//     left:3

//   },
//   button: {
//     alignItems:'center',
//     backgroundColor:'#2596be',
//     paddingVertical: 8,
//     paddingHorizontal: 28,
//     marginLeft:85,
//     marginRight:85,
//     marginTop:-48,
//     marginBottom:15,
//     borderRadius:92,
//     // background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//   },
//   carContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     width: width,
//   },
//   carName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginRight: 10,
//   },
//   carPrice: {
//     fontSize: 18,
//     color: '#2596be',
//   },
// });
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import MapView from 'react-native-maps';

const mockData = [
  { id: 1, latitude: 37.78835, longitude: -122.4325, name: 'Car A', price: 10 },
  { id: 2, latitude: 37.7885, longitude: -122.4327, name: 'Car B', price: 12 },
  { id: 3, latitude: 37.7882, longitude: -122.4323, name: 'Car C', price: 8 },
];

const Home = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // filter available cars based on current location and destination
    const filteredCars = mockData.filter(car => {
      // assuming 0.1 degree is approximately 11km
      const distanceFromCurrent = Math.sqrt(
        Math.pow(car.latitude - currentLocation.latitude, 2) +
        Math.pow(car.longitude - currentLocation.longitude, 2)
      ) * 11;
      const distanceToDestination = Math.sqrt(
        Math.pow(car.latitude - destination.latitude, 2) +
        Math.pow(car.longitude - destination.longitude, 2)
      ) * 11;

      return distanceFromCurrent <= 10 && distanceToDestination <= 10;
    });

    setCars(filteredCars);
  }, [currentLocation, destination]);

  const handleMapReady = () => {
    // set current location to initial region
    setCurrentLocation(mapRef.current.getCamera().center);
  };

  const mapRef = React.useRef(null);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter current location"
        onChangeText={text => setCurrentLocation({ 
          latitude: parseFloat(text.split(',')[0]),
          longitude: parseFloat(text.split(',')[1])
        })}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter destination"
        onChangeText={text => setDestination({ 
          latitude: parseFloat(text.split(',')[0]),
          longitude: parseFloat(text.split(',')[1])
        })}
      />
      <MapView
        ref={mapRef}
        style={styles.map}
        provider="bing"
        mapType="road"
        zoomEnabled
        showsUserLocation
        onMapReady={handleMapReady}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {cars.map((car) => (
          <Marker
            key={car.id}
            coordinate={{
              latitude: car.latitude,
              longitude: car.longitude,
            }}
            title={car.name}
            description={`$${car.price}/hour`}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  map: {
    width: '100%',
    height: '80%',
  },
});



export default Home;