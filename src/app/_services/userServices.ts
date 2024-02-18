import { supabase } from "@/utils/supabaseClient";

export const userServices = {
    async addUser(userData: {email: string}) {
        const { data, error } = await supabase
            .from('User')
            .insert([userData]);
        if (error) throw error;
        return data;
    }
}