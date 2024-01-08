import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getUser, logoutUser } from "../store/actions";
import "./styles/Header.css";

const Header = () => {
  const [dropdown, setDropdown] = useState(false);
  let dispatch = useDispatch();
  let { user } = useSelector((state) => state.user);
  const token = JSON.parse(localStorage.getItem("user"))?.token || user?.token;

  useEffect(() => {
    token && getUserDetails();
  }, [token]);

  const getUserDetails = async () => {
    dispatch(getUser(token)).then((res) => {
      if (res?.data?.status === 401) {
        dispatch(logoutUser());
      }
    });
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div
      style={{
        position: "sticky",
        top: "0px",
        zIndex: "100",
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
            {user !== null ? (
              <Link to="/profile" className="login-signup" id="loginBox">
                <img src="/assets/images/profile.png" alt="profile" />
                <p>Welcome, {user?.existingUser?.name}</p>
              </Link>
            ) : (
              <Link to="/login" className="login-signup" id="loginBox">
                <img src="/assets/images/profile.png" alt="profile" />
                <p>Login / Signup</p>
              </Link>
            )}
            {dropdown && user !== null ? (
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
