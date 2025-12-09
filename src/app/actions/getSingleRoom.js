"use server";
import supabase from "@/config/supabase";
import { redirect } from "next/navigation";

async function getSingleRoom(id) {
    const { data: room, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !room) {
        redirect("/error");
    }

    return { ...room, $id: room.id };
}

export default getSingleRoom;