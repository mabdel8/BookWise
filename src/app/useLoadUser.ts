import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../utils/supabaseClient"; // Adjust the path to where you initialize Supabase

const useLoadUser = async () => {
  const router = useRouter();

  useEffect(() => {
    checkAndLoadUser();
  }, []); // Empty dependency array means this runs once on component mount

  const checkAndLoadUser = async () => {
    const { data } = await supabase.auth.getSession();
    const user = data.session?.user;

    if (!user) {
      router.push("/login");
      return;
    }
    console.log(user.email);

    const { data: userData, error } = await supabase
      .from("User")
      .select("*")
      .eq("email", user?.email)
      .single();

    console.log(userData);
    if (userData) {
      return userData;
    }

    console.log("below is user");
    // User not found in your database, create a new one
    const { data: newUser, error: newUserError } = await supabase
      .from("User")
      .insert([
        {
          id: user?.id,
          email: user?.email,
        },
      ])
      .single();

    if (error) {
      console.error(
        "Supabase error:",
        newUserError?.message,
        "Details:",
        newUserError?.details,
        "Hint:",
        newUserError?.hint
      );
    }

    return newUser;
  };
};

export default useLoadUser;
