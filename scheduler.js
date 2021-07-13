const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const TOKEN_PATH = 'token.json';
const content = fs.readFileSync('credentials.json');
const credentials = JSON.parse(content);
const { client_secret, client_id, redirect_uris } = credentials.installed;
const auth = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
const token = fs.readFileSync('token.json');
auth.setCredentials(JSON.parse(token));
let calendar = google.calendar({ version: 'v3', auth });

module.exports = {};

function createCalendarEvent(date, time, symptoms, attendees, isOnline) {
    const doctor = attendees[0];
    const patient = attendees[1];
    const eventDesc =   patient.firstName + " " + patient.lastName + "'s appointment with Dr. " + 
                        doctor.firstName + " " + doctor.lastName + " for the following symptoms: \n" + symptoms;
    const yyyy = parseInt(date.slice(0,4));
    const mm = parseInt(date.slice(5,7));
    const dd = parseInt(date.slice(8,10));
    const h = parseInt(time.slice(0,2));
    const m = parseInt(time.slice(3,5));
    const start = new Date(yyyy, mm, dd, h, m, 0);
    const startDateTime = start.toISOString();
    const end = new Date(start.getTime() + 30*60000);
    const endDateTime = end.toISOString()
    


    const endTime 
    var event = {
        	'summary': 'Medicare Plus Appointment',
        	'description': eventDesc,
        	'start': {
        	  'dateTime': startDateTime,
        	  'timeZone': 'Asia/Kolkata',
        	},
        	'end': {
        	  'dateTime': '2021-07-21T17:00:00',
        	  'timeZone': 'Asia/Kolkata',
        	},
        	'recurrence': [
        	  'RRULE:FREQ=DAILY;COUNT=2'
        	],
        	'attendees': [
        	  {'email': 'shubhra99sachdev@protonmail.ch'},
        	  {'email': 'shubhra99sachdev@gmail.com'},
        	],
        	'reminders': {
        	  'useDefault': false,
        	  'overrides': [
        		{'method': 'email', 'minutes': 24 * 60},
        		{'method': 'popup', 'minutes': 10},
        	  ],
        	},
          };
    calendar.events.insert({ 
        auth: auth,
        calendarId: 'r7qk1asoouq5v4gorfqinhs65g@group.calendar.google.com',
        resource: event,
        }, function(err, event) {
            if (err) {
        		console.log('There was an error contacting the Calendar service: ' + err);
        		return;
        	}
        console.log('Event created: %s', event.htmlLink);
    });

}