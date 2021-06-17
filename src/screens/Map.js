import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ImageBackground,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { Auth } from 'aws-amplify';
import AppButton from '../components/AppButton';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import CounterApp from '../components/CounterApp';

export default function Map({ updateAuthState, navigation, endTime }) {
  const [isLoading, setIsLoading] = useState(true);
  let latitude = 'not done yet';
  let longitude = 'not done yet';
  const [location, setLocation] = useState({
    coords: {
      longitude: 0,
      latitude: 0
    }
  });
  const [errorMsg, setErrorMsg] = useState(null);

  async function signOut() {
    try {
      await Auth.signOut();
      updateAuthState('loggedOut');
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  }

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

  if (location) {
    longitude = JSON.stringify(location.coords.longitude);
    latitude = JSON.stringify(location.coords.latitude);
  }
  const region = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  if (isLoading) {
    return (
      <ImageBackground
        source={require('../images/ramblr-background-3.jpg')}
        style={styles.image}
      >
        <View style={styles.container}>
          <View style={styles.logocontainer}></View>
          <Image
            style={styles.logo}
            source={require('../images/ramblr-logo.png')}
          />
          <ActivityIndicator
            style={styles.isloading}
            size='large'
            color='white'
          />
        </View>
      </ImageBackground>
    );
  } else {
    return (
      <ImageBackground
        source={require('../images/ramblr-background-3.jpg')}
        style={styles.image}
      >
        <View style={styles.container}>
          <View style={styles.logocontainer}></View>
          <Image
            style={styles.logo}
            source={require('../images/ramblr-logo.png')}
          />

          <Text style={styles.headerText}>Enjoy your Rambl!</Text>
          <MapView
            style={styles.map}
            showsUserLocation
            region={region}
          ></MapView>
          <CounterApp endTime={endTime} />
          <AppButton title='Complete Rambl' />
          <AppButton
            title='Go to main screen'
            onPress={() => navigation.navigate('Home')}
          />
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center'
  },
  logo: {
    marginTop: -53,
    marginBottom: 20,
    width: 300,
    height: 40,
    resizeMode: 'contain'
  },
  logocontainer: {
    height: 100,
    width: 380,
    backgroundColor: '#527968',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 15,
    opacity: 0.8
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '120%'
  },
  map: {
    height: 300,
    width: 300,
    borderRadius: 20
  },
  isloading: {
    flex: 1,
    justifyContent: 'center'
  },
  headerText: {
    marginTop: 50,
    marginBottom: 30,
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 300,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 15
  }
});
