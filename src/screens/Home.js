import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { Auth } from 'aws-amplify';
import AppButton from '../components/AppButton';
import Coordinates from '../components/Coordinates';
import Friends from '../components/Friends'

export default function Home({ updateAuthState }) {
  async function signOut() {
    try {
      await Auth.signOut();
      updateAuthState('loggedOut');
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.logocontainer}></View>
      <Image
        style={styles.logo}
        source={require('../images/ramblr-logo.png')}
      />
      <AppButton onPress={signOut} title="Sign Out " />
      <Coordinates />
      <Friends props/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#63a55d',
    alignItems: 'center',
  },
  logo: {
    marginTop: -50,
    marginBottom: 20,
    width: 300,
    height: 40,
    resizeMode: 'contain',
  },
  logocontainer: {
    height: 100,
    width: 380,
    backgroundColor: '#63a55d',
    resizeMode: 'cover',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
});
