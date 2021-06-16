const moment = require('moment');

//  returns UTC timestamp of NOW
const startTimeStamp = () => {
	const timeStampUTC = new Date().getTime();
	return timeStampUTC;
};

const datePreformatter = (timestamp) => {
	const dateString = moment(timestamp).format('D MMM YYYY h:mm:ss a');
	console.log(dateString, '<<datestring');
	return dateString;
};

const plannedCompletionTimeStamp = (dateString) => {
	const timeStampUTC = Date.parse(dateString);
	console.log(dateString, '<<Datestring');
	console.log(timeStampUTC, '<<timestamputc');
	return timeStampUTC / 1000;
};

const calcPlannedDuration = (startTimestamp, endTimestamp) => {
	return endTimestamp - startTimestamp / 1000;
};

const durationInSeconds = (endTime) => {
	const startTime = startTimeStamp();

	const setTime = datePreformatter(endTime);

	const endTimeUTC = plannedCompletionTimeStamp(setTime);

	const duration = calcPlannedDuration(startTime, endTimeUTC);

	return Math.floor(duration);
};

module.exports = {
	startTimeStamp,
	plannedCompletionTimeStamp,
	calcPlannedDuration,
	datePreformatter,
	durationInSeconds,
};
