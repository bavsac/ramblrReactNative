import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Amplify from 'aws-amplify'
import awsmobile from './src/aws-exports'
import { withAuthenticator } from 'aws-amplify-react-native'
import Coordinates from './src/components/Coordinates';
// import Friends from './src/components/Friends'

Amplify.configure(awsmobile);

function App(props) {
  
  return (
    
    <View style={styles.container}>
      {console.log(props.authData.attributes, "<<< Trying to find username" )}
      <Text>Ramblr</Text>
      <StatusBar style="auto" />
      <Coordinates />
      {/* <Friends info={props}/> */}
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
