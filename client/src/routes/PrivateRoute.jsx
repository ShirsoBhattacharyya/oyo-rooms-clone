import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  if (!user?.data?.token) {
    navigate("/login");
  }
  return <div>{children}</div>;
};

PrivateRoute.propTypes = {
  children: PropTypes.any,
};

export default PrivateRoute;
