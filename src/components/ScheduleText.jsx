import React, {useState} from 'react';
import {scheduleMessage, sendMessage} from '../utils/sms-utils';
import {View, Text, Button} from 'react-native';
import axios from 'axios';
import API_KEY from "../../API_KEY.env.js"



const ScheduleText = () => {
    const [contact, setContact] = useState('07429818181')
    const [time, setTime] = useState("June 17, 2021 13:46:23 ")

    axios.interceptors.request.use(
        (config) => {
          config.headers.authorization = API_KEY;
          console.log("SendText >>>>>>> ","config changed");
          return config;
        },
        (err) => {
          return Promise.reject(err);
        }
      );

    return (
        <View>
            <Text> This is a button</Text>
            <Button title={'schedule'}onPress={()=>{scheduleMessage(contact, time)}} />
            <Button title={'send'}onPress={()=>{sendMessage(contact)}} />
            
        </View>
    );
};

export default ScheduleText;