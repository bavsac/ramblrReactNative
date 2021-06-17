import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { createMessage } from '../utils/sms-utils';
import ScheduleText from '../components/ScheduleText';

export default function Coordinates({ endTime, loggedInUser }) {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  let latitude = 'not done yet';
  let longitude = 'not done yet';
  const [location, setLocation] = useState({
    coords: {
      longitude: 0,
      latitude: 0
    }
  });

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
  }
  if (location) {
    longitude = JSON.stringify(location.coords.longitude);
    latitude = JSON.stringify(location.coords.latitude);
    text = `Latitude: ${latitude} Longitude: ${longitude}`;
    createMessage();
  }

  const region = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  if (isLoading) {
    return (
      <ActivityIndicator style={styles.isloading} size='large' color='white' />
    );
  } else {
    return (
      <View style={styles.container}>
        <ScheduleText
          loggedInUser={loggedInUser}
          latitude={latitude}
          longitude={longitude}
          endTime={endTime}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    height: 300,
    width: 300,
    borderRadius: 20
  },
  isloading: {
    flex: 1,
    justifyContent: 'center'
  }
});
