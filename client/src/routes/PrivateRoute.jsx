import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("user"))?.token || user?.token;

  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }
  });

  return <div>{children}</div>;
};

PrivateRoute.propTypes = {
  children: PropTypes.any,
};

export default PrivateRoute;
