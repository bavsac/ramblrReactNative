import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ScheduleText from './src/components/ScheduleText';
import Amplify, { Auth } from 'aws-amplify';
import awsmobile from './src/aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';
import AppButton from './src/components/AppButton';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import ConfirmSignUp from './src/screens/ConfirmSignUp';
import Home from './src/screens/Home';
import Map from './src/screens/Map';

Amplify.configure(awsmobile);
const AuthenticationStack = createStackNavigator();
const AppStack = createStackNavigator();
const AuthenticationNavigator = (props) => {
  const { setLoggedInUser } = props;
  return (
    <AuthenticationStack.Navigator headerMode='none'>
      <AuthenticationStack.Screen name='SignIn'>
        {(screenProps) => (
          <SignIn
            setLoggedInUser={setLoggedInUser}
            {...screenProps}
            updateAuthState={props.updateAuthState}
          />
        )}
      </AuthenticationStack.Screen>
      <AuthenticationStack.Screen name='SignUp' component={SignUp} />
      <AuthenticationStack.Screen
        name='ConfirmSignUp'
        component={ConfirmSignUp}
      />
    </AuthenticationStack.Navigator>
  );
};
const AppNavigator = (props) => {
  const { loggedInUser, endTime, setEndTime } = props;
  return (
    <AppStack.Navigator headerMode='none'>
      <AppStack.Screen name='Home'>
        {(screenProps) => (
          <Home
            endTime={endTime}
            setEndTime={setEndTime}
            loggedInUser={loggedInUser}
            {...screenProps}
            updateAuthState={props.updateAuthState}
          />
        )}
      </AppStack.Screen>
      <AppStack.Screen name='Map'>
        {(screenProps) => (
          <Map
            endTime={endTime}
            loggedInUser={loggedInUser}
            {...screenProps}
            updateAuthState={props.updateAuthState}
          />
        )}
      </AppStack.Screen>
    </AppStack.Navigator>
  );
};

const Initializing = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size='large' color='tomato' />
    </View>
  );
};

const Stack = createStackNavigator();

function App() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [isUserLoggedIn, setUserLoggedIn] = useState('initializing');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    checkAuthState();
  }, []);

  async function checkAuthState() {
    try {
      await Auth.currentAuthenticatedUser();
      setUserLoggedIn('loggedIn');
    } catch (err) {
      setUserLoggedIn('loggedOut');
    }
  }
  function updateAuthState(isUserLoggedIn) {
    setUserLoggedIn(isUserLoggedIn);
  }

  return (
    <NavigationContainer>
      {isUserLoggedIn === 'initializing' && <Initializing />}
      {isUserLoggedIn === 'loggedIn' && (
        <AppNavigator
          endTime={endTime}
          setEndTime={setEndTime}
          loggedInUser={loggedInUser}
          updateAuthState={updateAuthState}
        />
      )}
      {isUserLoggedIn === 'loggedOut' && (
        <AuthenticationNavigator
          setLoggedInUser={setLoggedInUser}
          updateAuthState={updateAuthState}
        />
      )}
    </NavigationContainer>
  );
}

export default App;
