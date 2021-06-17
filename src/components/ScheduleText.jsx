import React, { useState } from 'react';
import { sendMessage, cancelMessage, createMessage } from '../utils/sms-utils';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import API_KEY from '../../API_KEY.env.js';
import AppTextInput from '../components/AppTextInput';
import CounterApp from '../components/CounterApp';

const ScheduleText = ({ endTime, latitude, longitude, loggedInUser }) => {
  const [contactNumber, setContactNumber] = useState('');
  const [time, setTime] = useState(0);
  const [messageId, setMessageId] = useState(69420);
  const [confirmContactNumber, setConfirmContactNumber] = useState('');
  const [confirmedContactNumber, setConfirmedContactNumber] = useState('');

  axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = API_KEY;
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  const beginRamble = () => {
    setTimeout(() => {
      const message = createMessage(loggedInUser, latitude, longitude);
      sendMessage(confirmContactNumber, message);
    }, endTime * 1000);
  };

  return (
    <View>
      <AppTextInput
        leftIcon='phone'
        placeholder='Enter trusted contact number here'
        textContentType='telephoneNumber'
        style={styles.input}
        value={contactNumber}
        onChangeText={setContactNumber}
        keyboardType='numeric'
      />
      <AppTextInput
        leftIcon='phone'
        style={styles.input}
        value={confirmContactNumber}
        placeholder='Re-enter number'
        onChangeText={setConfirmContactNumber}
        keyboardType='numeric'
      />

      {contactNumber === confirmContactNumber && confirmContactNumber !== '' ? (
        <Button
          onPress={() => {
            setConfirmedContactNumber(confirmContactNumber);
            beginRamble();
          }}
          title='Start timer!'
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 150
  }
});

export default ScheduleText;
