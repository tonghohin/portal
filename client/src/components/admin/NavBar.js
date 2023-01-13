import { Link } from "react-router-dom";

function NavBar(props) {
  function handleClick() {
    localStorage.clear();
    props.setToggleRerender((prevToggleRerender) => !prevToggleRerender);
  }

  return (
    <nav className="bg-gray-700 p-2 text-center flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-gray-100">Granbury Place</h1>
      <h2 className="text-lg font-semibold text-gray-100">Welcome {props.authentication.username}!</h2>
      <Link to="/admin" className={`text-md text-gray-100 p-2 hover:bg-gray-600 ${props.page === 1 && "bg-gray-600"}`}>
        Home
      </Link>
      <Link to="/admin/manage-residents" className={`text-md text-gray-100 p-2 hover:bg-gray-600 ${props.page === 2 && "bg-gray-600"}`}>
        Manage Residents
      </Link>
      <Link to="/admin/manage-gym" className={`text-md text-gray-100 p-2 hover:bg-gray-600 ${props.page === 3 && "bg-gray-600"}`}>
        Manage Gymroom
      </Link>
      <Link to="/admin/manage-announcement" className={`text-md text-gray-100 p-2 hover:bg-gray-600 ${props.page === 4 && "bg-gray-600"}`}>
        Manage Announcements
      </Link>
      <Link to="/admin/manage-messages" className={`text-md text-gray-100 p-2 hover:bg-gray-600 ${props.page === 5 && "bg-gray-600"}`}>
        Manage Messages
      </Link>
      <button className="text-md text-gray-100 border font-semibold p-2 hover:bg-gray-600" onClick={handleClick}>
        Logout
      </button>
    </nav>
  );
}

export default NavBar;
