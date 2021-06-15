import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';

export default function Coordinates() {
  const [location, setLocation] = useState({
    coords: {
      longitude: 0,
      latitude: 0,
    },
  });
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    const longitude = JSON.stringify(location.coords.longitude);
    const latitude = JSON.stringify(location.coords.latitude);
    text = `Latitude: ${latitude} Longitude: ${longitude}`;
  }

  const region = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.paragraph}>{text}</Text> */}
      <MapView style={styles.map} showsUserLocation region={region}></MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    color: '#4BA64F',
    // flex: 1,

    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  map: {
    height: 300,
    width: 300,
    borderRadius: 20,
  },
});
