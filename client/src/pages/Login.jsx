import { Button, TextField, InputAdornment } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import "./styles/Common.css";
import { Link, useNavigate } from "react-router-dom";
import { LoginSignupNavbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../store/actions";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { user } = useSelector((state) => state.user);
  console.log({user});
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const getInputFieldData = async (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
    console.log(credentials);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (user?.data?.token) {
      return navigate("/");
    }
  }, [navigate, user]);
  const handleLogin = () => {
    dispatch(loginUser(credentials));
  };
  return (
    <div id="wrap-main-div">
      <LoginSignupNavbar />

      <div className="sl-main-div">
        <div className="sl-left-div">
          <h2
            style={{
              fontSize: "45px",
              marginTop: "50px",
              marginBottom: "10px",
            }}
          >
            There’s a smarter way to OYO around
          </h2>
          <span>
            Sign up with your phone number and get exclusive access to discounts
            and savings on OYO stays and with our many travel partners.
          </span>
        </div>
        <div id="sl-right-div">
          <div
            style={{
              backgroundColor: "#da1b42",
              color: "white",
              padding: "10px 0 10px 20px",
            }}
          >
            <p>Sign up & Get ₹500 OYO Money</p>
          </div>
          <form>
            <div id="sl-form-div" style={{ paddingBottom: "20px 10px" }}>
              <h2
                style={{
                  fontWeight: "600",
                  marginTop: "15px",
                  marginBottom: "10px",
                }}
              >
                Login / Signup
              </h2>
              <TextField
                onChange={(e) => getInputFieldData(e)}
                size="small"
                margin="normal"
                padding="0"
                label="Email"
                placeholder="Enter Email...."
                name="email"
                required
              />{" "}
              <TextField
                onChange={(e) => getInputFieldData(e)}
                size="small"
                margin="normal"
                label="Password"
                placeholder="Enter Password"
                name="password"
                required
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(true)}
                        onMouseDown={() => setShowPassword(false)}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />{" "}
              <Button
                onClick={handleLogin}
                variant="contained"
                color="secondary"
                margin="normal"
                id="LoginButton"
                sx={{
                  backgroundColor: "#1ab64f",
                  width: "200px",
                  m: "auto",
                  p: "10px",
                  mt: "20px",
                  mb: "20px",
                }}
              >
                Login
              </Button>
              <p>
                Don&apos;t have an Account ?{" "}
                <Link
                  to="/register"
                  style={{
                    textDecoration: "none",
                    fontWeight: "bold",
                    color: "red",
                  }}
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
