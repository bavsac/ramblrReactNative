import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { Auth } from 'aws-amplify';
import AppButton from '../components/AppButton';
import Coordinates from '../components/Coordinates';
import List from '../components/List'

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
      <Image
        style={styles.logo}
        source={require('../images/ramblr-logo.png')}
      />
      <AppButton onPress={signOut} title="Sign Out " />
      <Coordinates />
      <List/>
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
    width: 300,
    height: 40,
    resizeMode: 'contain',
  },
});
