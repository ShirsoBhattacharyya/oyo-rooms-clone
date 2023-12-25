import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getUser, logoutUser } from "../store/actions";
import "./styles/Header.css";

const Header = () => {
  const [dropdown, setDropdown] = useState(false);
  let dispatch = useDispatch();
  let loggedInUser = useSelector((store) => {
    return store.user.user;
  });
  let currentUser = useSelector((state) => state.user.user);
  const token = currentUser?.data?.token;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    dispatch(getUser(token));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div
      style={{
        position: "sticky",
        top: "0px",
        zIndex: "100000",
        backgroundColor: "white",
      }}
    >
      <div className="mainNav">
        <Link to="/" className="leftnav">
          <img src="/assets/images/oyologo.png" alt="oyored" />
        </Link>

        <div className="rightnav">
          <div>
            <Link>
              <img src="/assets/images/becomeMember.png" alt="becomeamember" />
            </Link>
          </div>
          <div>
            <Link to="/partner">
              <img src="/assets/images/listProperty.png" alt="listproperty" />
            </Link>
          </div>
          <div>
            <Link>
              <img src="/assets/images/language.png" alt="language" />
            </Link>
          </div>

          <div
            onMouseEnter={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}
            style={{ position: "relative" }}
          >
            {loggedInUser !== null ? (
              <Link to="/profile" className="login-signup" id="loginBox">
                <img src="/assets/images/profile.png" alt="profile" />
                <p>Welcome, {currentUser?.data?.existingUser?.name}</p>
              </Link>
            ) : (
              <Link to="/login" className="login-signup" id="loginBox">
                <img src="/assets/images/profile.png" alt="profile" />
                <p>Login / Signup</p>
              </Link>
            )}
            {dropdown && loggedInUser !== null ? (
              <div onMouseEnter={() => setDropdown(true)} id="profileDropdown">
                <Link to="/profile">Profile</Link>
                <Link to="/profile">Wallet</Link>
                <Link to="/profile">Booking History</Link>
                <Link onClick={handleLogout}>Logout</Link>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
