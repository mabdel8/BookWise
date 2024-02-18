import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Session } from '@supabase/supabase-js';
import Signup from './signup';
import Link from 'next/link';
import SignIn from './signin';
import { revalidatePath } from 'next/cache';

const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error signing out:', error.message);
    // Optionally, redirect the user after signing out
    // This could be to the home page or a login page
    // For Next.js, you might use Router from 'next/router'
    // Router.push('/path-to-redirect');
  };



const Profile = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [signing, setSigning] = useState(true)

    const WhichSign = () => {
        
        if (signing) {
            return <>
                <Signup />
                <button onClick={handleClick}>Sign In instead</button>
            </>
        } else {
            return <>
                <SignIn />
                <button onClick={handleClick}>Sign Up instead</button>
            </>
            
        }
    }

    const handleClick = async () => {
        setSigning(!signing)
    };

    useEffect(() => {
      const fetchSession = async () => {
        const { data: { session }, error } = await supabase.auth.getSession();
  
        if (error) {
          console.error('Error fetching session:', error.message);
          return;
        }
  
        setSession(session);
      };
  
      fetchSession();
    }, []);



    if (!session) {
        return <WhichSign />
        
  }

  return (
    <div>
          <h2>Welcome, {session.user.email}</h2>
          <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Profile;
