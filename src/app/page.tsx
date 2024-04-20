"use client";

// import Image from "next/image";
import { supabase } from "../utils/supabaseClient";
import { useEffect, useState } from "react";
import SearchBooks from "@/components/SearchBooks";
import Signup from "./signup";
import Profile from "./userSession";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Book,
  BookOpen,
  CalendarCheck,
  Home,
  NotebookPen,
  Settings,
  Telescope,
} from "lucide-react";
import BookList from "@/components/BookList";
import {
  Card,
  CardBody,
  CardHeader,
  NextUIProvider,
  Image,
  Spinner,
  Divider,
  User,
} from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Calendar } from "@nextui-org/calendar";
import { parseDate } from "@internationalized/date";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];

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
          <div className="hidden overflow-visible relative lg:flex lg:flex-col lg:gap-3 lg:col-span-2 pr-4 mt-10">
            <Link className="flex" href="/">
              <Home
                className="self-center mr-1"
                size={16}
                color="#fff"
                strokeWidth={1}
                absoluteStrokeWidth
              />
              <div className="">Home</div>
            </Link>
            <Divider className="my-4" />
            <Link className="flex" href="/">
              <BookOpen
                className="self-center mr-1"
                size={16}
                color="#fff"
                strokeWidth={1}
                absoluteStrokeWidth
              />
              <div className="">Reading List</div>
            </Link>
            <Link className="flex" href="/">
              <CalendarCheck
                className="self-center mr-1"
                size={16}
                color="#fff"
                strokeWidth={1}
                absoluteStrokeWidth
              />
              <div className="">Reading Sessions</div>
            </Link>
            <Link className="flex" href="/">
              <NotebookPen
                className="self-center mr-1"
                size={16}
                color="#fff"
                strokeWidth={1}
                absoluteStrokeWidth
              />
              <div className="">Notes</div>
            </Link>
            <Link className="flex" href="/">
              <Telescope
                className="self-center mr-1"
                size={16}
                color="#fff"
                strokeWidth={1}
                absoluteStrokeWidth
              />
              <div className="">Discover</div>
            </Link>
            <Divider className="my-4" />
            <Link className="flex" href="/">
              <Settings
                className="self-center mr-1"
                size={16}
                color="#fff"
                strokeWidth={1}
                absoluteStrokeWidth
              />
              <div className="">Settings</div>
            </Link>
            <User
              className="mt-16"
              name={users[0].email}
              description={
                <Link
                  href="https://twitter.com/jrgarciadev"
                >
                  @jrgarciadev
                </Link>
              }
              avatarProps={{
                src: "https://avatars.githubusercontent.com/u/30373422?v=4",
              }}
            />
          </div>
          <div className="col-span-10 lg:col-span-8 xl:col-span-6 lg:px-16 mt-10">
            <SearchBooks />
            <BookList />
          </div>
          <div className="hidden lg:block lg:col-span-4 mt-10">
            <Calendar
              aria-label="Date (No Selection)"
              defaultValue={parseDate(formattedDate)}
            />
          </div>
        </div>
        <div className="fixed hidden dark:md:block dark:opacity-70 -top-[80%] -right-[60%] 2xl:-top-[60%] 2xl:-right-[45%] z-0 rotate-12">
          <img
            src="https://nextui.org/gradients/docs-right.png"
            alt=""
            className=""
          />
        </div>
        <div className="fixed hidden dark:md:block dark:opacity-70 -bottom-[80%] -left-[60%] 2xl:-bottom-[60%] 2xl:-right-[45%] z-0 rotate-12">
          <img
            src="https://nextui.org/gradients/docs-right.png"
            alt=""
            className=""
          />
        </div>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
