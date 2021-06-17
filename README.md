# Ramblr 0.1.0
​
## A prototype mobile app by The GitStash(es)
​
Ramblr is designed to enable a user to keep a nominated person aware of their location under certain conditions. The common use case is that one person installs the app, activates it, and then goes out exploring. In the event that they do not 'complete' the journey in-app, before a selected time, their nominated person will be informed of their current location by SMS.
​
---
​
## To launch the application:
​
### Requirements:
​
- git
- VS Code
- PC or laptop
- mobile device
​
You _may_ be able to work around these requirements, but this is how _we_ do it.
​
### Installation:
​
1. Install Expo Go on your mobile device.
2. Clone the repo:  
   `git clone https://github.com/bavsac/ramblrReactNative`  
   2a. _Install expo-cli. (should we add this as a dev dependency?)_
3. Install dependencies:  
   `npm install`
4. Acquire the aws-exports.js file. Drop this into ./src.
5. Acquire a JWT for the SMS Works. Create a new file in the root folder called API_KEY.env.js:  
   `const API_KEY = "JWT 98qn35g8350090...etc"`  
   `export default API_KEY`
6. Start the Expo server:  
   `expo start`
7. The terminal will display a QR code. Open Expo on your mobile device and scan the QR.
​
You will now be invited to log in to Ramblr.
​
---
​
## Using Ramblr:
​
### Sign up process
​
1. A first time user will need to sign up using a username, password, email address and phone number.
2. A confirmation code is sent to the users email address from AWS Cognito.
3. After confirming the account, the user can log in and use the app.
​
### Starting a Rambl
​
- Choose the date and time you estimate you will return from your Rambl.
- Enter a contact name and number (entering the number twice ensures the message gets to the right place!).
- Enter an alert time - the time in minutes to alert you before your completion time is up.
- Choose an alert frequency - how often you will be alerted following the alert time.
- Submit the form, and head out.
​
You will now be able to see:
​
- Estimated completion time
- A map centred on your location, with a pin for your actual location
- A button to reschedule your completion time
- A button to complete your journey and cancel all alerts
​
### During your Rambl:
​
In the background, Ramblr will record your location, and check the time remaining on your Rambl.
​
- If time remaining is less than the alert time, you will be notified as frequently as you have requested.
- If time remaining is equal to zero, your nominated contact will be sent an SMS message with a Google Maps link to your current location.
​
If you return from your Rambl with time to spare, select 'Rambl Complete'.