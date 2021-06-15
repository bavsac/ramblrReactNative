import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Amplify from 'aws-amplify'
import awsmobile from './src/aws-exports'
import { withAuthenticator } from 'aws-amplify-react-native'
import Coordinates from './src/components/Coordinates';

Amplify.configure(awsmobile);

function App(props) {
  
  console.log(props.authData, "<<< Trying to find username" );
  return (
    <View style={styles.container}>
      <Text>Ramblr</Text>
      <StatusBar style="auto" />
      <Coordinates />
    </View>
  );
}

export default withAuthenticator(App, { includeGreetings: true, usernameAttributes: 'username' });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
