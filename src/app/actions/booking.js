"use server";
import supabase from "@/config/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function createBooking(roomId, formData) {
    const booking_date = formData.get("booking_date");
    const start_time = formData.get("start_time");
    const duration = parseInt(formData.get("duration"));

    const [reqStartH, reqStartM] = start_time.split(":").map(Number);
    
    const reqStartTotalMins = (reqStartH * 60) + reqStartM;
    const reqEndTotalMins = reqStartTotalMins + (duration * 60);

    const { data: existingBookings } = await supabase
        .from('bookings')
        .select('*')
        .eq('room_id', roomId)
        .eq('booking_date', booking_date);

    const hasOverlap = existingBookings.some((booking) => {
        const [existStartH, existStartM] = booking.start_time.split(":").map(Number);
        
        const existStartTotalMins = (existStartH * 60) + existStartM;
        const existEndTotalMins = existStartTotalMins + (booking.duration * 60);

        return (reqStartTotalMins < existEndTotalMins && reqEndTotalMins > existStartTotalMins);
    });

    if (hasOverlap) {
        redirect(`/rooms/${roomId}?error=overlap`);
    }

    const { error } = await supabase
        .from('bookings')
        .insert([
            {
                room_id: roomId,
                booking_date,
                start_time,
                duration,
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