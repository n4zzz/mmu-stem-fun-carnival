import rooms from "@/data/rooms.json";

export default function Home() {
  return (
    <>
      {rooms.length > 0 ? (
        rooms.map((room) => <h3>{room.name}</h3>)
      ) : (
        <p>No room available at the moment</p>
      )}
    </>
  );
}
