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
        const currentMins = (currentHour * 60) + currentMinute;

        const activeBookingsCount = bookings ? bookings.filter((booking) => {
            if (booking.booking_date > currentDateStr) return true;

            if (booking.booking_date === currentDateStr) {
                const [startH, startM] = booking.start_time.split(':').map(Number);
                const bookingStartMins = (startH * 60) + startM;
                const bookingEndMins = bookingStartMins + (booking.duration * 60);

                return currentMins < bookingEndMins;
            }

            return false;
        }).length : 0;


        const currentlyBusyBookings = bookings ? bookings.filter((booking) => {
            if (booking.booking_date !== currentDateStr) return false;

            const [startH, startM] = booking.start_time.split(':').map(Number);
            const bookingStartMins = (startH * 60) + startM;
            const bookingEndMins = bookingStartMins + (booking.duration * 60);

            return currentMins >= bookingStartMins && currentMins < bookingEndMins;
        }) : [];

        const busyRoomIds = currentlyBusyBookings.map((b) => b.room_id);
        const availableRooms = rooms ? rooms.filter((room) => !busyRoomIds.includes(room.id)) : [];


        return {
            availableCount: availableRooms.length,
            activeBookingsCount: activeBookingsCount,
            featuredRooms: rooms ? rooms.slice(0, 2).map(r => ({...r, $id: r.id})) : []
        };

    } catch (error) {
        console.error("Stats Error:", error);
        return { availableCount: 0, activeBookingsCount: 0, featuredRooms: [] };
    }
}

export default getDashboardStats;