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
  Spinner,
} from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

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

  if (loading) return <Spinner />;

  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <div className="grid grid-cols-12 gap-4 mx-auto relative w-max max-w-7xl z-10">
          <div className="hidden overflow-visible relative lg:block lg:col-span-2 pr-4">
            <div>hello</div>
            <div>world</div>
            <div>hahha</div>
          </div>
          <div className="col-span-8 lg:col-span-6 xl:col-span-4 lg:px-16 mt-10">
            <BookList />
            <Button asChild>
              <Link href="/addbook">Add Book</Link>
            </Button>
          </div>
        </div>
        <div className="fixed hidden dark:md:block dark:opacity-70 -top-[80%] -right-[60%] 2xl:-top-[60%] 2xl:-right-[45%] z-0 rotate-12">
          <img src="https://nextui.org/gradients/docs-right.png" alt="" className=""/>
        </div>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
