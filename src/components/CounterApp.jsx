import React, { useRef, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import CountDownTimer from 'react-native-countdown-timer-hooks';

function CounterApp({ endTime }) {
  const refTimer = useRef();
  const [timerEnd, setTimerEnd] = useState(true);
  const timerCallbackFunc = (timerFlag) => {
    setTimerEnd(timerFlag);
  };

  return (
    <View>
      <View style={{ display: timerEnd ? 'none' : 'flex' }}>
        <CountDownTimer
          ref={refTimer}
          timestamp={endTime}
          timerCallback={timerCallbackFunc}
          containerStyle={{
            height: 56,
            width: 120,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 35,
            backgroundColor: '#2196f3'
          }}
          textStyle={{
            fontSize: 25,
            color: '#FFFFFF',
            fontWeight: '500',
            letterSpacing: 0.25
          }}
        />
      </View>
      <TouchableOpacity
        style={{
          display: timerEnd ? 'flex' : 'none',
          height: 56,
          width: 120,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 35,
          backgroundColor: '#512da8'
        }}
        onPress={() => {
          setTimerEnd(false);
          refTimer.current.resetTimer();
        }}
      >
        <Text style={{ fontSize: 18, color: '#FFFFFF', fontWeight: 'bold' }}>
          See Rambl Time Left
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default CounterApp;
