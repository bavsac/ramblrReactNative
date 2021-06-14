import React, { Component } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../images/ramblr-logo.png')}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  logo: {
    width: 300,
    height: 40,
    resizeMode: 'contain',
  },
});

export default Header;
