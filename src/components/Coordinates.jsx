import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';

export default function Coordinates() {
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(true);
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setIsLoading(false);
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

  if (isLoading) {
    return (
      <ActivityIndicator style={styles.isloading} size="large" color="white" />
    );
  } else {
    return (
      <View style={styles.container}>
        {/* <Text style={styles.paragraph}>{text}</Text> */}
        <MapView style={styles.map} showsUserLocation region={region}></MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    height: 300,
    width: 300,
    borderRadius: 20,
  },
  isloading: {
    flex: 1,
    justifyContent: 'center',
  },
});
