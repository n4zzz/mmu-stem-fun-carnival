"use server";
import supabase from "@/config/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function createBooking(roomId, formData) {
    const booking_date = formData.get("booking_date");
    const start_time = formData.get("start_time");
    const duration = formData.get("duration");

    const { data, error } = await supabase
        .from('bookings')
        .insert([
            {
                room_id: roomId,
                booking_date,
                start_time,
                duration: parseInt(duration),
            }
        ]);

    if (error) {
        console.error("Booking Error:", error);
        return;
    }

    revalidatePath("/dashboard");
    redirect("/dashboard");
}

export default createBooking;