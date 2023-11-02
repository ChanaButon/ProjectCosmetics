import React, { useState } from 'react';
import axios from 'axios';
import './Calnedar.css';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import {FcGoogle} from 'react-icons/fc'
 function H() {

  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  const session = useSession();
  const supabase = useSupabaseClient();
  const { isLoading } = useSessionContext();

  if (isLoading) {
    return <></>
  }

  // if (session) {

  // }

  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar'
      }
    });
  
    if (error) {
      alert("Error occurred while signing in");
      console.log(error);
    } else {
      // Subscribe to authentication state changes
      const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          alert(`Hey ${session.user.email}`);
  
          // Unsubscribe from the listener after showing the alert
          listener.unsubscribe();
        }
      });
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
    console.log(event)

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
    <div className="main-container">
      <div className="gsi-material-button">
      {session ? (
        <button onClick={signOut} className='googlebutton'>
          <FcGoogle onClick={signOut} title='Google Sign Out' />
          <span>oogle Sign Out</span></button>
        ) : (
          <>
          <button onClick={googleSignIn} className='googlebutton'>
            <FcGoogle  title='Google Sign In' />
            <span>oogle Sign In</span></button>
          </>
        )}
      </div>
    </div>
  );
}


export default H;
//export { googleSignIn };