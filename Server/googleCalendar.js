const {google} = require('googleapis');
const CLIENT_ID = 'your-client-id';
const CLIENT_SECRET = 'your-client-secret';
const REDIRECT_URI = 'http://localhost:3000/callback';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);







async function createEvent(event) {
    const calendar = google.calendar({version: 'v3', auth: oAuth2Client});
    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: {
        summary: event.summary,
        start: {
          dateTime: event.startDateTime,
          timeZone: event.timeZone,
        },
        end: {
          dateTime: event.endDateTime,
          timeZone: event.timeZone,
        },
      },
    });
    return response.data;
  }




  app.post('/create-event', async (req, res) => {
    try {
      const event = req.body;
      const result = await createEvent(event);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating event');
    }
  });



  