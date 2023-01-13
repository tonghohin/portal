import UserAnnouncements from "../../components/user/announcements/UserAnnouncements";

function UserHome() {
  return (
    <main className="p-5 bg-gray-100">
      <h1 className="text-xl font-semibold">Home</h1>
      <UserAnnouncements />
    </main>
  );
}

export default UserHome;
