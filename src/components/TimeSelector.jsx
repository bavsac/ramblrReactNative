import React, { useState } from 'react';
import {
  View,
  Button,
  Platform,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import durationInSeconds from '../utils/time-utils';
import AppButton from '../components/AppButton';
import Coordinates from './Coordinates';

const moment = require('moment');

export const TimeSelector = ({ loggedInUser, endTime, setEndTime }) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  // const [endTime, setEndTime] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    const unformattedTimestamp = event.nativeEvent.timestamp;
    const duration = durationInSeconds(unformattedTimestamp);

    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setEndTime(duration);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.mainContainer}>
        <Text style={styles.headerText}>Start your Rambl!</Text>
        <View style={styles.container}>
          {/* <AppButton title="Select return date" onPress={showDatepicker} />
          <AppButton title="Select return time" onPress={showTimepicker} /> */}
          <Button onPress={showDatepicker} title='Select return date' />
          <Button onPress={showTimepicker} title='Select return time' />

          {show && (
            <DateTimePicker
              testID='dateTimePicker'
              value={date}
              mode={mode}
              is24Hour={true}
              display='default'
              onChange={onChange}
              style={styles.timepicker}
            />
          )}

          <Coordinates loggedInUser={loggedInUser} endTime={endTime} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 5
  },
  input: {
    width: 200
  },
  headerText: {
    marginTop: 50,
    marginBottom: 30,
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 300,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 15
  },
  timerButtons: {
    alignItems: 'center'
  },
  timepicker: {
    width: 100,
    backgroundColor: 'white'
  }
});
