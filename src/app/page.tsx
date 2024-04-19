"use client";

// import Image from "next/image";
import { supabase } from "../utils/supabaseClient";
import { useEffect, useState } from "react";
import SearchBooks from "@/components/SearchBooks";
import Signup from "./signup";
import Profile from "./userSession";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Book } from "lucide-react";
import BookList from "@/components/BookList";
import {
  Card,
  CardBody,
  CardHeader,
  NextUIProvider,
  Image,
} from "@nextui-org/react";

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
          .from("User") // Your table name here
          .select("*");

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
    <NextUIProvider>
      <div className="flex flex-row justify-center items-center">
      <div>
          <div>hello</div>
          <div>world</div>
          <div>hahha</div>
        </div>
        <div className="flex flex-col justify-center items-center">
        <BookList />
        <Button asChild>
          <Link href="/addbook">Add Book</Link>
        </Button>
        </div>

      </div>
    </NextUIProvider>
  );
}
