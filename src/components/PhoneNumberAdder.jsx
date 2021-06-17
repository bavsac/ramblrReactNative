import React, { useState, useEffect } from 'react';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

import { getDatafromUserTable } from '../utils/api';

export const PhoneNumberAdder = () => {
  const [contactNumber, setContactNumber] = useState('');
  const [confirmContactNumber, setConfirmContactNumber] = useState('');
  const [confirmedContactNumber, setConfirmedContactNumber] = useState('');

  useEffect(() => {
    getDatafromUserTable().then((response) => {
      console.log(response);
    });
  }, [confirmedContactNumber]);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          <TextInput
            style={styles.input}
            value={contactNumber}
            placeholder='Enter Phone Number'
            onChangeText={setContactNumber}
            keyboardType='numeric'
          />
          <TextInput
            style={styles.input}
            value={confirmContactNumber}
            placeholder='Re-enter Phone Number'
            onChangeText={setConfirmContactNumber}
            keyboardType='numeric'
          />
        </View>
      </TouchableWithoutFeedback>
      <Button
        onPress={() => {
          if (
            contactNumber === confirmContactNumber &&
            confirmContactNumber !== ''
          ) {
            setConfirmedContactNumber(confirmContactNumber);
          } else {
            console.warn('Error: Passwords do not match');
          }
        }}
        title='Confirm'
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 50
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: 'black'
  }
});
