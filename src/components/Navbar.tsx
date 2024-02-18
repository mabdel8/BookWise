'use client'
// NavBar.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import Link from 'next/link';

const NavBar = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [username, setUsername] = useState<string | undefined>(undefined);

    useEffect(() => {
        // Check if user is logged in
        const checkUserSession = async () => {
            const { data } = await supabase.auth.getSession();
            if (data.session) {
                setLoggedIn(true);
                setUsername(data.session.user?.email);
            } else {
                setLoggedIn(false);
                setUsername(undefined);
            }
        }
        checkUserSession();

    }, []);

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setLoggedIn(!!session);
            if (session)
            setUsername(session.user?.email);
        });

        return () => {
            authListener.subscription?.unsubscribe();
        };
    }, []);

    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'lightgray' }}>
            <div>
                <Link href='/'>Logo</Link>
            </div>
            <div>
                {loggedIn ? (
                    <span>Welcome, {username}! <button onClick={async () => {
                        await supabase.auth.signOut();
                        setLoggedIn(false);
                        setUsername(undefined);
                    }}>Log Out</button></span>
                ) : (
                    <a href="/login">Log In</a>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
