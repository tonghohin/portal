import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserAuthentication } from "../../features/userSlice";

function UserNavBar(props) {
  const userReducer = useSelector((store) => store.user);
  const dispatch = useDispatch();

  function handleClick() {
    localStorage.clear();
    dispatch(fetchUserAuthentication());
  }

  return (
    <nav className="bg-gray-700 p-2 text-center flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-gray-100">Granbury Place</h1>
      <h2 className="text-lg font-semibold text-gray-100">Your unit no: {userReducer.unit}</h2>
      <Link to="/" className={`text-md text-gray-100 p-2 hover:bg-gray-600 ${props.page === 1 && "bg-gray-600"}`}>
        Home
      </Link>
      <Link to="/gym" className={`text-md text-gray-100 p-2 hover:bg-gray-600 ${props.page === 2 && "bg-gray-600"}`}>
        Register Gymroom
      </Link>
      <Link to="/message" className={`text-md text-gray-100 p-2 hover:bg-gray-600 ${props.page === 3 && "bg-gray-600"}`}>
        Message
      </Link>
      <Link to="/password" className={`text-md text-gray-100 p-2 hover:bg-gray-600 ${props.page === 4 && "bg-gray-600"}`}>
        Change Password
      </Link>
      <button className="text-md text-gray-100 border font-semibold p-2 hover:bg-gray-600" onClick={handleClick}>
        Logout
      </button>
    </nav>
  );
}

export default UserNavBar;
