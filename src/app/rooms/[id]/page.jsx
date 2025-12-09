import Heading from "@/components/Heading";
import BookingForm from "@/components/BookingForm";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaShieldAlt, FaTools } from "react-icons/fa";
import getSingleRoom from "@/app/actions/getSingleRoom";
import supabase from "@/config/supabase";
import ExperimentSuggester from "@/components/ExperimentSuggester";

const RoomPage = async ({ params }) => {
    const { id } = await params;
    const room = await getSingleRoom(id);

    const { data: bookings } = await supabase
        .from('bookings')
        .select('*')
        .eq('room_id', id);

    if (!room) {
        return <Heading title='Resource Not Found' />;
    }

    const isEquipment = room.category === 'Equipment';

    const guidelines = isEquipment ? [
        "Read the operating manual before powering on.",
        "Check calibration status before use (If applicable).",
        "Wear insulated gloves and safety goggles.",
        "Do not leave the equipment running unattended."
    ] : [
        "Lab coat and safety goggles are required at all times.",
        "No food or drinks allowed inside the laboratory.",
        "Keep emergency exits clear of obstructions.",
        "Wash hands thoroughly before leaving the lab.",
        "Dispose of chemical waste in designated containers."
    ];

    return (
        <>
            <Heading title={room.name} />
            <div className="bg-white shadow rounded-lg p-6">
                <Link href="/" className="flex items-center text-gray-600 hover:text-gray-800 mb-4">
                    <FaChevronLeft className="inline mr-1" />
                    <span className="ml-2">Back to Resources</span>
                </Link>

                <div className="flex flex-col sm:flex-row sm:space-x-6">
                    <Image
                        src={`/images/rooms/${room.image}`}
                        alt={room.name}
                        width={400}
                        height={100}
                        className="w-full sm:w-1/3 h-64 object-cover rounded-lg"
                    />

                    <div className="mt-4 sm:mt-0 sm:flex-1">
                        <p className="text-gray-600 mb-4">
                            {room.description}
                        </p>

                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                            isEquipment ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                            {room.category || 'Resource'}
                        </span>

                        <ul className="space-y-2">
                            <li>
                                <span className="font-semibold text-gray-800">Size: </span> {room.sqft} sqft
                            </li>
                            <li>
                                <span className="font-semibold text-gray-800">Availability: </span> {room.availability}
                            </li>
                            <li>
                                <span className="font-semibold text-gray-800">Address: </span> {room.address}
                            </li>
                        </ul>

                        <div className={`mt-6 p-4 rounded-lg border ${
                            isEquipment ? 'bg-amber-50 border-amber-100' : 'bg-blue-50 border-blue-100'
                        }`}>
                            <h3 className={`text-sm font-bold flex items-center gap-2 ${
                                isEquipment ? 'text-amber-800' : 'text-blue-800'
                            }`}>
                                {isEquipment ? <FaTools /> : <FaShieldAlt />} 
                                {isEquipment ? "Equipment Safety Protocols" : "Lab Safety Guidelines"}
                            </h3>
                            <ul className={`mt-2 text-sm list-disc pl-5 space-y-1 ${
                                isEquipment ? 'text-amber-700' : 'text-blue-700'
                            }`}>
                                {guidelines.map((rule, index) => (
                                    <li key={index}>{rule}</li>
                                ))}
                            </ul>
                        </div>
                        
                        <ExperimentSuggester
                            resourceName={room.name}
                            description={room.description}
                        />
                    </div>
                </div>

                <BookingForm room={room} bookings={bookings || []} />

            </div>
        </>
    );
}

export default RoomPage;