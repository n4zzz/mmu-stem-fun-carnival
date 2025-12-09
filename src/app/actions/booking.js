"use server";
import supabase from "@/config/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function convertToMinutes(timeStr) {
    if (timeStr.toLowerCase().includes('am') || timeStr.toLowerCase().includes('pm')) {
        const [time, modifier] = timeStr.split(' ');
        let [hours, minutes] = time.split(':');
        if (hours === '12') {
            hours = '00';
        }
        if (modifier.toLowerCase() === 'pm') {
            hours = parseInt(hours, 10) + 12;
        }
        return (parseInt(hours, 10) * 60) + (parseInt(minutes || '0', 10));
    }
    
    const [hours, minutes] = timeStr.split(':').map(Number);
    return (hours * 60) + minutes;
}

async function createBooking(roomId, formData) {
    const booking_date = formData.get("booking_date");
    const start_time = formData.get("start_time");
    const duration = parseInt(formData.get("duration"));

    const reqStartMins = convertToMinutes(start_time);
    const reqEndMins = reqStartMins + (duration * 60);

    const { data: room } = await supabase
        .from('rooms')
        .select('availability')
        .eq('id', roomId)
        .single();

    if (!room) {
        redirect(`/rooms/${roomId}?error=not_found`);
    }

    const [openStr, closeStr] = room.availability.split('-').map(s => s.trim());
    const openMins = convertToMinutes(openStr);
    const closeMins = convertToMinutes(closeStr);

    if (reqStartMins < openMins || reqEndMins > closeMins) {
        redirect(`/rooms/${roomId}?error=outside_hours`);
    }

    const { data: existingBookings } = await supabase
        .from('bookings')
        .select('*')
        .eq('room_id', roomId)
        .eq('booking_date', booking_date);

    const hasOverlap = existingBookings.some((booking) => {
        const [existStartH, existStartM] = booking.start_time.split(":").map(Number);
        const existStartTotalMins = (existStartH * 60) + existStartM;
        const existEndTotalMins = existStartTotalMins + (booking.duration * 60);

        return (reqStartMins < existEndTotalMins && reqEndMins > existStartTotalMins);
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