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
export default function SignUp({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  async function signUp() {
    try {
      await Auth.signUp({
        username,
        password,
        email,
        attributes: { email },
      });
      console.log('✅ Sign-up Confirmed');
      navigation.navigate('ConfirmSignUp');
    } catch (error) {
      console.log('❌ Error signing up...', error);
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
            <Text style={styles.title}>Create a new account</Text>
            <AppTextInput
              value={username}
              onChangeText={(text) => setUsername(text)}
              leftIcon="account"
              placeholder="Enter username"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="username"
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
            <AppTextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              leftIcon="email"
              placeholder="Enter email"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
            />

            <AppTextInput
              value={phone}
              onChangeText={(text) => setPhone(text)}
              leftIcon="phone"
              placeholder="Enter number here"
              textContentType="telephoneNumber"
              keyboardType="numeric"
            />

            <AppButton title="Sign Up" onPress={signUp} />
            <View style={styles.footerButtonContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Text style={styles.forgotPasswordButtonText}>
                  Already have an account? Sign In
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
