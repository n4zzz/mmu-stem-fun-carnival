"use server";
import supabase from "@/config/supabase";

async function getBookings() {
    const { data: bookings, error } = await supabase
        .from('bookings')
        .select(`
            *,
            rooms (
                name,
                image,
                address
            )
        `)
        .order('booking_date', { ascending: true });

    if (error) {
        console.error("Error fetching bookings:", error);
        return [];
    }

    return bookings;
}

export default getBookings;