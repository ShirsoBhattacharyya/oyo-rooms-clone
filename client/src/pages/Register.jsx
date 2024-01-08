import { Button, TextField, InputAdornment } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { LoginSignupNavbar } from "../components";
import { Link } from "react-router-dom";
import "./styles/Common.css";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/actions";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [checkValidEmail, setCheckValidEmail] = useState(null);
  const [inputFieldData, setInputFieldData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [loadingToastId, setLoadingToastId] = useState(null);
  const { loading } = useSelector((state) => state.user);
  useEffect(() => {
    if (loading) {
      setLoadingToastId(
        toast.loading("Wait a moment..", {
          position: "top-center",
          theme: "colored",
        })
      );
    } else {
      if (loadingToastId) {
        toast.dismiss(loadingToastId);
      }
    }
  }, [loading]);
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+$/;
  const handleClickShowPassword = () => setShowPassword(true);
  const handleMouseDownPassword = () => setShowPassword(false);

  const handleChangeInputField = async (e) => {
    setInputFieldData({
      ...inputFieldData,
      [e.target.name]: e.target.value,
    });
    if (regex.test(inputFieldData.email)) {
      setCheckValidEmail(null);
    } else {
      setCheckValidEmail("Please enter a valid email address");
    }
  };
  const handleRegistration = async (e) => {
    e.preventDefault();
    setInputFieldData({
      email: "",
      name: "",
      password: "",
    });
    if (
      inputFieldData.name === "" ||
      inputFieldData.email === "" ||
      inputFieldData.password === ""
    ) {
      toast.info("Please fill all the fields", {
        position: "bottom-center",
        theme: "colored",
      });
      return;
    }
    if (checkValidEmail) {
      toast.warning(checkValidEmail, {
        position: "top-center",
        theme: "colored",
      });
      return;
    }
    dispatch(registerUser(inputFieldData)).then((res) => {
      if (res?.data?.status === 200) {
        toast.success(res?.data?.message, {
          position: "top-center",
          theme: "colored",
        });
      } else if (res?.data?.status === 500) {
        toast.error(res?.data?.message, {
          position: "top-center",
          theme: "colored",
        });
      } else {
        toast.warning(res?.data?.message, {
          position: "top-center",
          theme: "colored",
        });
      }
      if (loadingToastId) {
        toast.dismiss(loadingToastId);
      }
    });
  };
  const { name, email, password } = inputFieldData;
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
          <div className="s-red-div">
            <p>Sign up & Get ₹500 OYO Money</p>
          </div>
          <form>
            <div id="sl-form-div">
              <h2 id="LoginSignup">Login / Signup</h2>
              <TextField
                onChange={(e) => handleChangeInputField(e)}
                size="small"
                margin="normal"
                padding="0"
                label="Name"
                placeholder="Enter Name"
                required={true}
                name="name"
                value={name}
              />{" "}
              <TextField
                onChange={(e) => handleChangeInputField(e)}
                size="small"
                margin="normal"
                padding="0"
                label="Email"
                placeholder="Enter Email"
                name="email"
                required={true}
                type="email"
                value={email}
              />{" "}
              <TextField
                onChange={(e) => handleChangeInputField(e)}
                size="small"
                margin="normal"
                label="Password"
                placeholder="Enter Password"
                name="password"
                value={password}
                required={true}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />{" "}
              <Button
                // disabled={password.length < 7 ? true : false}
                onClick={handleRegistration}
                variant="contained"
                id="SignupButton"
                margin="normal"
                sx={{
                  backgroundColor: "#1ab64f",
                  width: "200px",
                  m: "auto",
                  p: "10px",
                  mt: "20px",
                  mb: "15px",
                }}
              >
                Register
              </Button>
              <p
                style={{
                  padding: "0px",
                  marginTop: "15px",
                }}
              >
                Prefer to Sign in with password instead ?{" "}
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    fontWeight: "bold",
                    color: "red",
                  }}
                >
                  Click here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Register;
