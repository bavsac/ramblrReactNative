import axios from 'axios';

const baseURL = `https://www.google.com/maps/search/?api=1&query=`;
let myLat = '53.3734972';
let myLong = '-2.5842247,14z';
const contactName = 'Parsley';
const userName = 'Cal';

export const createMessage = (userName, contactName, latitude, longitude) => {
	const locationURL = `${baseURL}${latitude},${longitude}`;
	const message = `Hello ${contactName}, the time of your friend, ${userName}'s Rambl has finished.  Their last known location is ${locationURL}.`;
	return message;
};

export const sendMessage = (number, message) => {
  axios({
    method: 'post',
    url: 'https://api.thesmsworks.co.uk/v1/message/send',
    data: {
      sender: 'ramblr',
			destination: number,
			content: message,
    },
  }).then(
    (response) => {
      console.log("SMS UTILS SendText >>>>>>> ",response);
    },
    (error) => {
      console.log("SMS UTILS SendText >>>>>>> ",error);
    })
}

export const scheduleMessage = (contactNumber, date) => {
  console.log('schedulemessage called with:', contactNumber, date);
	if (!date) {
		console.log('no date selected');
		return null;
	}
  axios({
    method: 'post',
    url: 'https://api.thesmsworks.co.uk/v1/message/schedule',
    data: {
      sender: 'ramblr',
			destination: contactNumber,
			content: 'updated message for maximum test value',
			schedule: date,
    },
	}).then(
		(response) => {
			console.log('RESPONSE.DATA:', response.data);
		},
		(error) => {
			console.log('SMS UTILS SendText >>>>>>> ', error);
		}
	);
};

export const cancelMessage = (messageId) => {
	axios({
		method: 'delete',
		url: `https://api.thesmsworks.co.uk/v1/messages/schedule/${messageId}`,
	}).then(
		(response) => {
			console.log('SMS UTILS cancelmessage >>>>>>> ', response.data);
		},
		(error) => {
			console.log('NOT DELETED TRY AGAIN', error.status);
		}
	);
};

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