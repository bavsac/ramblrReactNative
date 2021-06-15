import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const List = () => {
  const [timesPressed, setTimesPressed] = useState(0);
  const friends = ['Ben', 'Cal', 'Christian', 'Bavana', 'Eli']

  let textLog = '';
  if (timesPressed >= 1) {
    textLog = `Selected ${friends[0]}`;
  } else {
    textLog = 'Select Emergency Contact';
  }

  return (
    <View style={styles.container}>
      <View style={styles.logBox}>
        <Text testID="pressable_press_console">{textLog}</Text>
      </View>
      <>
      <Pressable
        onPress={() => {
          setTimesPressed((current) => current + 1);
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? 'rgb(210, 230, 255)'
              : 'white'
          },
          styles.wrapperCustom
        ]}>
        {({ pressed }) => (
          <Text style={styles.text}>
            {pressed ? '' : `${friends[0]}`}
          </Text>
        )}
      </Pressable>
      </>
      <>
      <Pressable
        onPress={() => {
          setTimesPressed((current) => current + 1);
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? 'rgb(210, 230, 255)'
              : 'white'
          },
          styles.wrapperCustom
        ]}>
        {({ pressed }) => (
          <Text style={styles.text}>
            {pressed ? '' : `${friends[1]}`}
          </Text>
        )}
      </Pressable>
      </>
      <Pressable
        onPress={() => {
          setTimesPressed((current) => current + 1);
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? 'rgb(210, 230, 255)'
              : 'white'
          },
          styles.wrapperCustom
        ]}>
        {({ pressed }) => (
          <Text style={styles.text}>
            {pressed ? '' : `${friends[2]}`}
          </Text>
        )}
      </Pressable>
      <>
      <Pressable
        onPress={() => {
          setTimesPressed((current) => current + 1);
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? 'rgb(210, 230, 255)'
              : 'white'
          },
          styles.wrapperCustom
        ]}>
        {({ pressed }) => (
          <Text style={styles.text}>
            {pressed ? '' : `${friends[3]}`}
          </Text>
        )}
      </Pressable>
      </>
      <Pressable
        onPress={() => {
          setTimesPressed((current) => current + 1);
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? 'rgb(210, 230, 255)'
              : 'white'
          },
          styles.wrapperCustom
        ]}>
        {({ pressed }) => (
          <Text style={styles.text}>
            {pressed ? '' : `${friends[4]}`}
          </Text>
        )}
      </Pressable>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    justifyContent: 'center',
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6
  },
  logBox: {
    padding: 20,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9'
  },
  pressable: {
    padding: 20,
    margin: 10,
    maxWidth: 15
  }
});



export default List;