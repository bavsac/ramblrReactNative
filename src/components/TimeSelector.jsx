import React, {useState, useEffect} from 'react';
import {View, Button, Platform, Text,TextInput, StyleSheet, Keyboard} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {durationInSeconds} from '../utils/time-utils'
import CounterApp from './CounterApp'
import SendText from './SendText';

export const TimeSelector = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [duration, setDuration] = useState(0);
  const [timerEnd, setTimerEnd] = useState(false);
  const [contactNumber, setContactNumber] = useState('');
  const [confirmContactNumber, setConfirmContactNumber] = useState('');
  const [confirmedContactNumber, setConfirmedContactNumber] = useState('');

  useEffect(()=>{
    setTimerEnd(true)
  },[duration])


  const onChange = (event, selectedDate) => {
    
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    const output = durationInSeconds(event.nativeEvent.timestamp)
    setDuration(output)
    console.log(output, '<< output')
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
    <View style={styles.container}>

        <Button onPress={showDatepicker} title="Show date picker!" />
        <Button onPress={showTimepicker} title="Show time picker!" />
   

        <TextInput
        style={styles.input}
        value={contactNumber}
        placeholder="enter number"
        onChangeText={setContactNumber}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={confirmContactNumber}
        placeholder="Re-enter number"
        onChangeText={setConfirmContactNumber}
        keyboardType="numeric"
      />
        

      {(contactNumber===confirmContactNumber && confirmContactNumber!=='')?<Button onPress={() => {
        Keyboard.dismiss
          setTimerEnd(false); 
          console.log("TimeSelector >>>>>> button pressed");
          console.log("TimeSelector >>>>>>> new duration!:",duration)
        }} title="Start timer!" />:null}

        {/* <Button onPress={() => {
          setTimerEnd(false); 
          console.log("button pressed");
          console.log("new duration!:",duration)
        }} title="Start timer!" /> */}

        <Button onPress={()=> {setDuration(0)}} title="Reset"/>

      <Text>duration in state: {duration}</Text>
      {/* {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )} */}
      	<CounterApp 
        timerEnd={timerEnd}
        setTimerEnd={setTimerEnd}
        duration={duration}/>
        <SendText timerEnd={timerEnd}/>
    </View>
  );
};
const styles = StyleSheet.create({
  container:{
    paddingTop: 50,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});