import React, { useState, useEffect } from 'react';
import {
  View,
  Button,
  Platform,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { durationInSeconds } from '../utils/time-utils';

// import CounterApp from './CounterApp';
// import SendText from './SendText';

import AppButton from '../components/AppButton';
import Coordinates from './Coordinates';

// import ScheduleText from './ScheduleText'
const moment = require('moment');

export const TimeSelector = ({loggedInUser}) => {
  console.log(loggedInUser, '<<<<logged in user in timeselector')
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [endTime, setEndTime] = useState('');
  // const [duration, setDuration] = useState(0);
  // const [timerEnd, setTimerEnd] = useState(false);
  // const [contactNumber, setContactNumber] = useState('');
  // const [confirmContactNumber, setConfirmContactNumber] = useState('');
  // const [confirmedContactNumber, setConfirmedContactNumber] = useState('');

  // useEffect(() => {
  //   setTimerEnd(true);
  // }, [duration]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    const unformattedTimestamp = event.nativeEvent.timestamp;

    const duration = durationInSeconds(unformattedTimestamp);
    setEndTime(duration);
    console.log('the time from timeSelector:', endTime);

    // const output = durationInSeconds(event.nativeEvent.timestamp);
    // setDuration(output);
    // console.log(output, '<< output');
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
          <Button onPress={showDatepicker} title="Select return date" />
          <Button onPress={showTimepicker} title="Select return time" />

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
              style={styles.timepicker}
            />
          )}

          <Coordinates loggedInUser={loggedInUser} endTime={endTime} />

          {/* <View style={styles.timerButtons}>
          {contactNumber === confirmContactNumber &&
          confirmContactNumber !== '' ? (
            <AppButton
              onPress={() => {
                Keyboard.dismiss;
                // setTimerEnd(false);
              }}
              title="Start timer!"
            />
          ) : null} */}

          {/* <Button onPress={() => {
          setTimerEnd(false); 
          console.log("button pressed");
          console.log("new duration!:",duration)
        }} title="Start timer!" /> */}

          {/* <AppButton
            onPress={() => {
              setDuration(0);
            }}
            title="Reset Timer"
          /> */}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    alignItems: 'center',
    // backgroundColor: 'white',
    borderRadius: 5,
  },
  input: {
    width: 200,
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
    elevation: 15,
  },
  timerButtons: {
    alignItems: 'center',
  },
  timepicker: {
    width: 100,
    backgroundColor: 'white',
  },
});
