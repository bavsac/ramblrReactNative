import axios from 'axios';

const baseURL = 'https://www.google.com/maps/@';
let myLat = '53.3734972';
let myLong = '-2.5842247,14z';
const contactName = 'Parsley';
const userName = 'Cal';

export const createMessage = (userName, contactName, latitude, longitude) => {
	const locationURL = `${baseURL}${latitude},${longitude}z/`;
	const message = `Hello ${contactName}, your friend ${userName} has not reported in on time.  Their last known location is ${locationURL}.`;
	return message;
};

export const sendMessage = () => {axios({
    method: 'post',
    url: 'https://api.thesmsworks.co.uk/v1/message/send',
    data: {
      sender: 'ramblr',
      destination: '07429818181',
      content: 'hiyeeeeeee',
    },
  }).then(
    (response) => {
      console.log("SMS UTILS SendText >>>>>>> ",response);
    },
    (error) => {
      console.log("SMS UTILS SendText >>>>>>> ",error);
    })
}

export const scheduleMessage = (contactNumber, date) => {axios({
    method: 'post',
    url: 'https://api.thesmsworks.co.uk/v1/message/schedule',
    data: {
      sender: 'ramblr',
      destination: contactNumber,
      content: "This is the message",
      schedule: date,
    },
  }).then(
    (response) => {
      console.log("SMS UTILS SendText >>>>>>> ",response);
    },
    (error) => {
      console.log("SMS UTILS SendText >>>>>>> ",error);
    })
}
export const getBalance = () => {   //  axios({
    //   method: 'get',
    //   url: 'https://api.thesmsworks.co.uk/v1/credits/balance',
    //   data: {
    //   },
    // }).then(
    //   (response) => {
    //     console.log(response);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
}

export default { createMessage }