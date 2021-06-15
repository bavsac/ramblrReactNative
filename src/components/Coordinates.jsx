import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';

export default function Coordinates() {
  const [location, setLocation] = useState({
    coords: {
      longitude: 0,
      latitude: 0
    }
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
    console.log(typeof latitude, '<<this is the type of latitude');
    console.log(typeof +latitude, '<<this is the type of latitude with a +');
    text = `Latitude: ${latitude} Longitude: ${longitude}`;
  }

  const region = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
      <MapView
        style={{ width: 600, height: 300 }}
        showsUserLocation
        region={region}
      ></MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    color: '#4BA64F',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
