import getBookings from "@/app/actions/getBookings";
import Heading from "@/components/Heading";
import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";

const BookingsPage = async () => {
    const reservations = await getBookings();

    return (
        <>
            <Heading title="My Reservations" />
            
            <div className="mt-6 space-y-4">
                {reservations.length > 0 ? (
                    reservations.map((reservation) => (
                        <div key={reservation.id} className="bg-white shadow-sm rounded-lg p-4 border border-gray-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                            
                            <div className="relative w-full sm:w-32 h-32 flex-shrink-0">
                                <Image
                                    src={`/images/rooms/${reservation.rooms?.image || 'room-1.jpg'}`}
                                    alt={reservation.rooms?.name || "Room"}
                                    fill
                                    className="object-cover rounded-md"
                                />
                            </div>

                            <div className="flex-grow">
                                <h3 className="text-lg font-bold text-gray-900">
                                    {reservation.rooms?.name}
                                </h3>
                                
                                <div className="mt-2 space-y-1 text-sm text-gray-600">
                                    <p className="flex items-center gap-2">
                                        <FaCalendarAlt className="text-blue-500"/> 
                                        Date: {reservation.booking_date}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <FaClock className="text-blue-500"/> 
                                        Time: {reservation.start_time} ({reservation.duration} hours)
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <FaMapMarkerAlt className="text-blue-500"/> 
                                        {reservation.rooms?.address}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-2 sm:mt-0">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Confirmed
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
                        <p className="text-gray-500 mb-4">You have no active reservations.</p>
                        <Link href="/" className="text-blue-600 font-semibold hover:underline">
                            Browse Rooms
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
 
export default BookingsPage;