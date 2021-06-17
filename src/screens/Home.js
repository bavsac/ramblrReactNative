import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ImageBackground,
  ScrollView
} from 'react-native';
import { Auth } from 'aws-amplify';
import AppButton from '../components/AppButton';
import { TimeSelector } from '../components/TimeSelector';

export default function Home({
  updateAuthState,
  loggedInUser,
  navigation,
  endTime,
  setEndTime
}) {
  async function signOut() {
    try {
      await Auth.signOut();
      updateAuthState('loggedOut');
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  }
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
        <ScrollView>
          <TimeSelector
            endTime={endTime}
            setEndTime={setEndTime}
            loggedInUser={loggedInUser}
          />
        </ScrollView>
        <AppButton
          title='Go to Map'
          onPress={() => navigation.navigate('Map')}
        />
        <AppButton onPress={signOut} title='Sign Out ' />
      </View>
    </ImageBackground>
  );
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
  }
});
