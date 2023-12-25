import { useState, useEffect, useRef } from "react";
import "./styles/UserDetails.css";
import {
  Box,
  Button,
  Typography,
  Input,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HiOutlinePencilAlt } from "react-icons/hi";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { getUser, updateUser } from "../store/actions/user.actions";

const UserDetails = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [userShow, setUserShow] = useState(false);
  const [password, setPassword] = useState(false);
  const [show, setShow] = useState(false);
  const [myPass, setMyPass] = useState({
    newPass: null,
    newPass2: "",
  });

  useEffect(() => {
    user?.data?.token && getUserDetails();
  }, [user]);

  const getUserDetails = async () => {
    const token = user?.data?.token;
    dispatch(getUser(token));
  };

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const passRef = useRef(null);

  const updateUserDetails = async () => {
    const updatedUser = {
      name: nameRef.current.value,
      phone: phoneRef.current.value,
      email: emailRef.current.value + "@gmail.com",
    };
    dispatch(updateUser(user?.data?.existingUser?._id, updatedUser));
    setUserShow(!userShow);
    dispatch(getUser(user?.data?.token));
  };

  const updatePassword = async () => {
    const updatedUser = {
      oldPassword: passRef.current.value,
      newPassword: myPass.newPass2,
    };

    if (myPass.newPass === myPass.newPass2) {
      dispatch(updateUser(user?.data?.existingUser?._id, updatedUser, "UPDATE_PASSWORD"));
      setPassword(!password);
      toast.success("Password successfully updated", {
        position: "top-center",
        theme: "colored",
      });
    } else {
      toast.info("Password did not change. Please retry again.", {
        position: "top-center",
        theme: "dark",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMyPass({ ...myPass, [name]: value });
  };

  const handleClick = () => {
    setShow(!show);
  };

  const changeUserDetails = () => {
    setUserShow(!userShow);
  };

  const changeUserPassword = () => {
    setPassword(!password);
  };

  return (
    <div id="UserDetails">
      <Box
        component="div"
        bgcolor="white"
        width="49%"
        color="#333333"
        padding="50px 80px"
        borderRadius="2px"
        boxShadow="2px 4px 8px 0 rgba(0, 0, 0, 0.1)"
        border="1px solid #d6d6d6"
        className="userDetailBox"
      >
        <Typography variant="h4" marginBottom="30px" color="#222222">
          Edit profile{" "}
          <IconButton onClick={changeUserDetails}>
            <HiOutlinePencilAlt />
          </IconButton>
        </Typography>
        <Box>
          <strong>
            <span className="profile_Money_Details">Name: &nbsp;</span>
          </strong>
          {userShow ? (
            <Input
              htmlSize={8}
              width="auto"
              placeholder="Enter Name"
              inputRef={nameRef}
              value={user?.data?.existingUser?.name}
            />
          ) : user?.data?.existingUser?.name != null ? (
            user?.data?.existingUser?.name
          ) : (
            ""
          )}
        </Box>
        <Box>
          <strong>
            <span className="profile_Money_Details">Phone Number: &nbsp;</span>
          </strong>
          {userShow ? (
            <Input
              htmlSize={8}
              width="auto"
              placeholder="Enter Phone Number"
              inputRef={phoneRef}
              value={user?.data?.existingUser?.phone}
            />
          ) : user?.data?.existingUser?.phone != null ? (
            user?.data?.existingUser?.phone
          ) : (
            ""
          )}
        </Box>
        <Box>
          <strong>
            <span className="profile_Money_Details">Email Address: &nbsp;</span>
          </strong>
          {userShow ? (
            <Input
              placeholder="Enter Email"
              inputRef={emailRef}
              endAdornment={
                <InputAdornment position="end">@gmail.com</InputAdornment>
              }
              value={user?.data?.existingUser?.email.split("@")[0]}
            />
          ) : user?.data?.existingUser?.email != null ? (
            user?.data?.existingUser?.email
          ) : (
            ""
          )}
        </Box>
        {userShow ? (
          <Button
            style={{
              backgroundColor: "#1ab64f",
              color: "white",
              marginTop: "30px",
              cursor: "pointer",
            }}
            onClick={updateUserDetails}
          >
            Update
          </Button>
        ) : (
          ""
        )}
      </Box>
      <Box
        component="div"
        bgcolor="white"
        width="49%"
        color="#333333"
        padding="50px 80px"
        borderRadius="2px"
        boxShadow="2px 4px 8px 0 rgba(0, 0, 0, 0.1)"
        border="1px solid #d6d6d6"
        className="userDetailBox"
      >
        <Typography variant="h4" marginBottom="30px" color="#222222">
          Change Password{" "}
          <IconButton onClick={changeUserPassword}>
            <HiOutlinePencilAlt />
          </IconButton>
        </Typography>
        <Box>
          <strong>
            {password ? (
              <span className="profile_Money_Details">
                Set New Password: &nbsp;
              </span>
            ) : (
              <span className="profile_Money_Details">
                Current Password: &nbsp;
              </span>
            )}
          </strong>

          {password ? (
            <Box>
              <p>
                <Input
                  type="password"
                  placeholder="Enter Current Password"
                  inputRef={passRef}
                />
              </p>
              <p>
                <Input
                  type={show ? "text" : "password"}
                  placeholder="Enter New Password"
                  name="newPass"
                  display="block"
                  onChange={handleChange}
                />
              </p>
              <p>
                <Input
                  type={show ? "text" : "password"}
                  placeholder="Confirm New Password"
                  name="newPass2"
                  display="block"
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleClick}>
                        {show ? <Visibility /> : <VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </p>
            </Box>
          ) : (
            "*********"
          )}
        </Box>
        {password ? (
          <Button
            style={{
              backgroundColor: "#1ab64f",
              color: "white",
              marginTop: "30px",
              cursor: "pointer",
            }}
            onClick={updatePassword}
            disabled={myPass.newPass === myPass.newPass2 ? false : true}
          >
            Update
          </Button>
        ) : (
          ""
        )}
      </Box>
      <ToastContainer />
    </div>
  );
};

export default UserDetails;
