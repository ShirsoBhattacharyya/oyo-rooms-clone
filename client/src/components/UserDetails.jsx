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
import { getUser, logoutUser, updateUser } from "../store/actions";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  const dispatch = useDispatch();
  const [loadingToastId, setLoadingToastId] = useState(null);
  const { loading, user } = useSelector((state) => state.user);
  const [userShow, setUserShow] = useState(false);
  const [password, setPassword] = useState(false);
  const [show, setShow] = useState(false);
  const [myPass, setMyPass] = useState({
    newPass: null,
    newPass2: "",
  });
  const token = JSON.parse(localStorage.getItem("user"))?.token || user?.token;
  const navigate = useNavigate();

  useEffect(() => {
    token && getUserDetails();
  }, []);

  const getUserDetails = async () => {
    dispatch(getUser(token)).then((res) => {
      if (res?.data?.status === 401) {
        dispatch(logoutUser());
        navigate("/login");
      }
    });
  };

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

  const [nameRef, setNameRef] = useState(user?.existingUser?.name);
  const [phoneRef, setPhoneRef] = useState(user?.existingUser?.phone);
  const passRef = useRef(null);

  const updateUserDetails = async () => {
    const updatedUser = {
      name: nameRef,
      phone: phoneRef,
    };
    const token = user?.token;
    dispatch(updateUser(user?.existingUser?._id, updatedUser)).then((res) => {
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
    setUserShow(!userShow);
    dispatch(getUser(token));
  };

  const updatePassword = async () => {
    const updatedUser = {
      oldPassword: passRef.current.value,
      newPassword: myPass.newPass2,
    };

    if (myPass.newPass === myPass.newPass2) {
      dispatch(
        updateUser(user?.existingUser?._id, updatedUser, "UPDATE_PASSWORD")
      ).then((res) => {
        console.log({ res });
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
      setPassword(!password);
      dispatch(getUser(token));
    } else {
      toast.error("Passwords do not match. Please retry again.", {
        position: "top-center",
        theme: "colored",
      });
      dispatch(getUser(token));
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
              onChange={(e) => setNameRef(e.target.value)}
              value={nameRef}
            />
          ) : user?.existingUser?.name !== null ? (
            user?.existingUser?.name
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
              onChange={(e) => setPhoneRef(e.target.value)}
              value={phoneRef}
            />
          ) : user?.existingUser?.phone !== null ? (
            user?.existingUser?.phone
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
              endAdornment={
                <InputAdornment position="end">@gmail.com</InputAdornment>
              }
              value={user?.existingUser?.email?.split("@")[0]}
            />
          ) : user?.existingUser?.email !== null ? (
            user?.existingUser?.email
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
          >
            Update
          </Button>
        ) : (
          ""
        )}
      </Box>
      <ToastContainer style={{ zIndex: 110 }} />
    </div>
  );
};

export default UserDetails;
