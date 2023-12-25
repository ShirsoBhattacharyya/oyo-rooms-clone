import { useState, useEffect } from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import { ChevronLeft as ChevronLeftIcon } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import "./styles/Checkout.css";
import { CustomerDetails, HotelBookingDetails } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { getHotelById, getTemporaryBookingById } from "../store/actions";

const Checkout = () => {
  const { data, loading, error } = useSelector((state) => state.hotels);
  const tempData = useSelector((state) => state.bookings.tempdata);
  console.log({ tempData });
  if (tempData?._id) {
    localStorage.setItem("tempDataId", tempData._id);
  }
  const tempDataId = localStorage.getItem("tempDataId") || undefined;
  const [userDetailsObject, setUserDetailsObject] = useState({
    name: tempData?.userDetails?.name || "",
    email: tempData?.userDetails?.email || "",
    phone: tempData?.userDetails?.phone || "",
  });
  console.log({ userDetailsObject });
  const handleChangeUserDetailsObject = (e) => {
    let { name, value } = e.target;
    setUserDetailsObject({ ...userDetailsObject, [name]: value });
  };
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHotelById(id));
    if (tempDataId) {
      dispatch(getTemporaryBookingById(tempDataId));
    }
  }, [id, dispatch]);

  if (loading) {
    return (
      <Box>
        {[...Array(30)].map((_, index) => (
          <Skeleton key={index} height="20px" />
        ))}
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt="50px">
        <Typography color="error">
          Something went wrong, please refresh
        </Typography>
      </Box>
    );
  }

  return (
    <Box m="0%">
      <Box
        p={"14px"}
        boxShadow="base"
        bgcolor="white"
        position="sticky"
        top="0px"
        zIndex="4"
      >
        <Link to="/">
          <img
            style={{ width: "95px" }}
            src="https://qph.cf2.quoracdn.net/main-qimg-b8bf0fbc22cdb8223cbb298ea1c0ca67"
          />
        </Link>
      </Box>

      <Box ml="200px" mt="30px" textAlign="left" color="red.500" mb="80px">
        <Link to={`/hotels/${id}`}>
          <Typography style={{ color: "red.500", fontWeight: 600 }}>
            {" "}
            <ChevronLeftIcon /> Modify your booking{" "}
          </Typography>
        </Link>
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        width="80%"
        margin="auto"
        marginTop="30px"
      >
        <Box width="64%">
          <CustomerDetails
            userDetails={userDetailsObject}
            handleChangeUserDetailsObject={handleChangeUserDetailsObject}
          />
        </Box>

        <Box width="34%">
          <HotelBookingDetails data={data} />
        </Box>
      </Box>
    </Box>
  );
};

export default Checkout;
