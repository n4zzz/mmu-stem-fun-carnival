import Image from "next/image";
import Link from "next/link";

const RoomCard = ({ room }) => {
    return (
        <div className="bg-white shadow rounded-lg p-4 mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="flex flex-col sm:flex-row sm:space-x-4">
                <Image
                    src={`/images/rooms/${room.image}`}
                    width={400}
                    height={400}
                    alt={room.name}
                    className="w-full sm:w-32 sm:h-32 mb-3 sm:mb-0 object-cover rounded-lg"
                />
                <div className="space-y-1">
                    <h4 className="text-lg font-semibold">{room.name}</h4>
                    <p className="text-sm text-gray-600">
                        <span className="font-semibold text-gray-800"> Address:</span> 
                        {room.address}
                    </p>
                    <p className="text-sm text-gray-600">
                        <span className="font-semibold text-gray-800"> Availability:</span>
                        {room.availability}
                    </p>
                </div>
            </div>
            
            <div className="flex flex-col sm:flex-row w-full sm:w-auto sm:space-x-2 mt-2 sm:mt-0">
                <Link 
                    href={`/rooms/${room.$id}`} 
                    className="block w-full text-center bg-indigo-50 text-indigo-700 py-2 px-4 rounded-lg font-medium hover:bg-indigo-100 transition-colors mt-4 sm:mt-0"
                >
                    View Resource
                </Link>
            </div>
        </div>
    );
}

export default RoomCard;