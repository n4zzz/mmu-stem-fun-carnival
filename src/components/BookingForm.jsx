const BookingForm = () => {
    return (
        <div className="mt-6">
            <h2 className="text-xl font-bold">Book this Room</h2>
            <form className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    <div className="sm:col-span-2">
                        <label htmlFor="booking_date" className="block text-sm font-medium text-gray-700">
                            Date
                        </label>
                        <input
                            type="date"
                            id="booking_date"
                            name="booking_date"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>

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