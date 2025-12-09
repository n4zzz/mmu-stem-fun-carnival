import Link from "next/link";
import Image from "next/image";
import { FaBox, FaCalendarCheck, FaClock, FaArrowRight } from "react-icons/fa";
import getDashboardStats from "@/app/actions/dashboardStats"; 

const DashboardPage = async () => {
  const statsData = await getDashboardStats();
  
  const { availableCount = 0, activeBookingsCount = 0, featuredRooms = [] } = statsData || {};

  const stats = [
    { 
      label: "Available Resources", 
      value: availableCount, 
      icon: <FaBox />, 
      color: "bg-blue-100 text-blue-600" 
    },
    { 
      label: "Active Bookings", 
      value: activeBookingsCount, 
      icon: <FaCalendarCheck />, 
      color: "bg-green-100 text-green-600" 
    },
    { 
      label: "Pending Approvals", 
      value: "0", 
      icon: <FaClock />, 
      color: "bg-yellow-100 text-yellow-600" 
    },
  ];

  return (
    <div className="space-y-6">
      
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 to-blue-700 p-8 text-white shadow-lg">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Nazrin.</h1>
          <p className="text-blue-100 max-w-2xl">
            Your central hub for managing STEM laboratory resources, scheduling equipment, and ensuring safety compliance.
          </p>
        </div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-blue-500 opacity-20 blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</h3>
            </div>
            <div className={`p-4 rounded-lg text-xl ${stat.color}`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-800">Your Upcoming Reservations</h2>
            <Link href="/bookings" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
              View All <FaArrowRight size={12}/>
            </Link>
          </div>
          
          <div className="flex flex-col items-center justify-center h-48 text-gray-400 bg-gray-50 rounded-lg border-dashed border-2 border-gray-200">
            <p>No upcoming reservations.</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-800">Featured Resources</h2>
            <Link href="/" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
              Browse Catalog <FaArrowRight size={12}/>
            </Link>
          </div>

          <div className="space-y-4">
            {featuredRooms.length > 0 ? (
              featuredRooms.map((resource) => (
                <div key={resource.$id} className="flex gap-4 items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <Image 
                    src={`/images/rooms/${resource.image}`} 
                    width={60} 
                    height={60} 
                    alt={resource.name} 
                    className="rounded-lg object-cover w-16 h-16"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{resource.name}</h4>
                    <p className="text-sm text-gray-500 line-clamp-2">{resource.description}</p>
                  </div>
                </div>
              ))
            ) : (
                <p className="text-gray-500 text-sm">No featured resources found.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;