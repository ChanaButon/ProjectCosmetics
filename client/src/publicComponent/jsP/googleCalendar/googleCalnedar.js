import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import axios from 'axios';
// import './h.css';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';


 function H() {

  const [start, setStart] = useState(new Date);
  const [end, setEnd] = useState(new Date);
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  const session = useSession();
  const supabase = useSupabaseClient();
  const { isLoading } = useSessionContext();

  if (isLoading) {
    return <></>
  }

   async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar'
      }
    });

    if (error) {
      alert("error");
      console.log(error);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  
  async function createCalendarEvent() {
    const event = {
      "summary": eventName,
      "description": eventDescription,
      "start": {
        "dateTime": start.toISOString(),
        "timeZone": Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      "end": {
        "dateTime": end.toISOString(),
        "timeZone": Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    }

    try {
      await axios.post("https://www.googleapis.com/calendar/v3/calendars/primary/events", event, {
        headers: {
          'Authorization': `Bearer ${session.provider_token}`,
          'Content-Type': 'application/json'
        }
      });
      // console.log(data);
      alert("Event created! Check your Google Calendar.");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div style={{ width: "800px", margin: "100px auto" }}>
        {session ? (
          <>
            <h2>Hey {session.user.email}</h2>
            <p>Start of your event</p>
            <DateTimePicker onChange={setStart} value={start} />
{/*             
            <DateTimePicker
              onChange={setStart}
              value={start}
              className="custom-datetime-picker"
              hourClassName="custom-hour"
            /> */}

            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <p>End of your event</p>
            <DateTimePicker onChange={setEnd} value={end} size={200}/>
            <p>Event Name</p>
            <input type="text" onChange={(e) => setEventName(e.target.value) } />
            <p>Event Description</p>
            <input type="text" onChange={(e) => setEventDescription(e.target.value)} />
            <hr />
            <button onClick={createCalendarEvent}>Create Calendar Event</button>
            <button onClick={signOut}>Sign Out</button>
          </>
        ) : (
          <button onClick={googleSignIn}>Sign In</button>
        )}
      </div>
    </div>
  );
}


export default H;
//export { googleSignIn };