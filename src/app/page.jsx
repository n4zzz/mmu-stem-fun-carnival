  // import rooms from "@/data/rooms.json";
  import Heading from "@/components/Heading";
  import RoomCard from "@/components/RoomCard";
  import getAllRooms from "./actions/getAllRooms";

  export default async function Home() {
    const rooms = await getAllRooms();

    return (
      <>
        <Heading title='Available Labs'></Heading>
        {rooms.length > 0 ? (
          rooms.map((room) => <RoomCard room={room} />)
        ) : (
          <p>No room available at the moment</p>
        )}
      </>
    );
  }
