import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
export default function ConfirmSignUp({ navigation }) {
  const [username, setUsername] = useState('');
  const [authCode, setAuthCode] = useState('');
  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(username, authCode);
      console.log('✅ Code confirmed');
      navigation.navigate('SignIn');
    } catch (error) {
      console.log(
        '❌ Verification code does not match. Please enter a valid verification code.',
        error.code
      );
    }
  }
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ImageBackground
        source={require('../images/ramblr-background-1.jpg')}
        style={styles.image}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <Image
              style={styles.logo}
              source={require('../images/ramblr-logo.png')}
            />
            <Text style={styles.title}>Confirm Sign Up</Text>
            <AppTextInput
              value={username}
              onChangeText={(text) => setUsername(text)}
              leftIcon="account"
              placeholder="Enter username"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
            />
            <AppTextInput
              value={authCode}
              onChangeText={(text) => setAuthCode(text)}
              leftIcon="numeric"
              placeholder="Enter verification code"
              keyboardType="numeric"
            />
            <AppButton title="Confirm Sign Up" onPress={confirmSignUp} />
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    paddingTop: -45,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
    marginVertical: 15,
  },
  forgotPasswordButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  logo: {
    marginTop: 130,
    width: 300,
    height: 40,
    resizeMode: 'contain',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '120%',
  },
});
