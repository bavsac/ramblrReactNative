import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
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
export default function SignIn({ navigation, updateAuthState }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  async function signIn() {
    try {
      await Auth.signIn(username, password);
      console.log('✅ Success');
      updateAuthState('loggedIn');
    } catch (error) {
      console.log('❌ Error signing in...', error);
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
            <Text style={styles.title}>Sign in to your account</Text>
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
              value={password}
              onChangeText={(text) => setPassword(text)}
              leftIcon="lock"
              placeholder="Enter password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              textContentType="password"
            />
            <AppButton title="Login" onPress={signIn} />
            <View style={styles.footerButtonContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.forgotPasswordButtonText}>
                  Don't have an account? Sign Up
                </Text>
              </TouchableOpacity>
            </View>
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
  footerButtonContainer: {
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
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
