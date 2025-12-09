"use client";
import createBooking from "@/app/actions/booking";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const BookingForm = ({ room, bookings }) => {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');
    const [selectedDate, setSelectedDate] = useState("");
    const [busySlots, setBusySlots] = useState([]);

    const handleSubmit = createBooking.bind(null, room.$id);

    useEffect(() => {
        if (selectedDate && bookings) {
            const slots = bookings.filter(b => b.booking_date === selectedDate);
            setBusySlots(slots);
        } else {
            setBusySlots([]);
        }
    }, [selectedDate, bookings]);

    return (
        <div className="mt-6">
            <h2 className="text-xl font-bold">Book this Room</h2>
            
            {error === 'overlap' && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-2">
                    <strong className="font-bold">Booking Failed! </strong>
                    <span className="block sm:inline">This time slot overlaps with an existing reservation. Please choose another time.</span>
                </div>
            )}

            <form action={handleSubmit} className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    <div className="sm:col-span-2">
                        <label htmlFor="booking_date" className="block text-sm font-medium text-gray-700">
                            Date
                        </label>
                        <input
                            type="date"
                            id="booking_date"
                            name="booking_date"
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>

                    {busySlots.length > 0 && (
                        <div className="sm:col-span-2 bg-gray-50 p-3 rounded-md border border-gray-200">
                            <h4 className="text-sm font-bold text-gray-700 mb-2">Reserved Times for {selectedDate}:</h4>
                            <ul className="text-sm text-red-600 list-disc pl-5">
                                {busySlots.map((slot) => (
                                    <li key={slot.id}>
                                        {slot.start_time} ({slot.duration} hours)
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div>
                        <label htmlFor="start_time" className="block text-sm font-medium text-gray-700">
                            Start Time
                        </label>
                        <input
                            type="time"
                            id="start_time"
                            name="start_time"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                            Duration (Hours)
                        </label>
                        <select
                            id="duration"
                            name="duration"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        >
                            <option value="1">1 Hour</option>
                            <option value="2">2 Hours</option>
                            <option value="3">3 Hours</option>
                            <option value="4">4 Hours</option>
                        </select>
                    </div>

                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Confirm Booking
                    </button>
                </div>
            </form>
        </div>
    );
}

export default BookingForm;