'use client'
// NavBar.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";


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
        <Navbar>
      <NavbarBrand>
        
        <Link href='/' className="font-bold text-inherit text-lg">BookWise</Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
        {loggedIn ? (
                    <div>
                    < Button color="primary" variant="flat" onClick={async () => {
                        await supabase.auth.signOut();
                        setLoggedIn(false);
                        setUsername(undefined);
                        }}>Log Out</Button>
                                            </div>
                ) : (
                        <Button color="primary" variant="flat"><a href="/login">Log In</a></Button>
                )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
    );
};

export default NavBar;
