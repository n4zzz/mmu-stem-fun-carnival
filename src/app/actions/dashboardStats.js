"use server";
import supabase from "@/config/supabase";

async function getDashboardStats() {
    try {
        const { data: rooms } = await supabase.from('rooms').select('*');
        const { data: bookings } = await supabase.from('bookings').select('*');

        const now = new Date();
        const currentDateStr = now.toISOString().split('T')[0];
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        const activeBookings = bookings.filter((booking) => {
            if (booking.booking_date !== currentDateStr) return false;

            const [startH, startM] = booking.start_time.split(':').map(Number);
            
            const bookingStartMins = (startH * 60) + startM;
            const bookingEndMins = bookingStartMins + (booking.duration * 60);
            const currentMins = (currentHour * 60) + currentMinute;

            return currentMins >= bookingStartMins && currentMins < bookingEndMins;
        });

        const bookedRoomIds = activeBookings.map((b) => b.room_id);
        const availableRooms = rooms.filter((room) => !bookedRoomIds.includes(room.id));

        return {
            availableCount: availableRooms.length,
            activeBookingsCount: activeBookings.length,
            featuredRooms: rooms.slice(0, 2).map(r => ({...r, $id: r.id}))
        };

    } catch (error) {
        console.error("Stats Error:", error);
        return { availableCount: 0, activeBookingsCount: 0, featuredRooms: [] };
    }
}

export default getDashboardStats;