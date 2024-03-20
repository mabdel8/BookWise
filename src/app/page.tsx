"use client"

import Image from "next/image";
import { supabase } from '../utils/supabaseClient'
import { useEffect, useState } from "react";
import SearchBooks from "@/components/SearchBooks";
import Signup from "./signup";
import Profile from "./userSession";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('User') // Your table name here
          .select('*');
        
        if (error) throw error;
        if (data) setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  if (loading) return <div>Loading...</div>;

  
  return (
    <div className="flex flex-col justify-center h-screen items-center">
      <div className="">
        <h1>Currently reading</h1>

      </div>
      <Button asChild>
        <Link href="/addbook">Add Book</Link>
      </Button>
    </div>
  );
}

