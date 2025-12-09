"use server";
import supabase from "@/config/supabase";

async function getAllRooms() {
    const { data: rooms, error } = await supabase
        .from('rooms')
        .select('*');

    if (error) {
        console.error("Error fetching rooms:", error);
        return [];
    }

    return rooms.map(room => ({ ...room, $id: room.id }));
}

export default getAllRooms;