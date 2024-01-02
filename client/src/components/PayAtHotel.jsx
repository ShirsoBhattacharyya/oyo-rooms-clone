import { Box, Button, Typography } from "@mui/material";
import { Star } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { createBooking } from "../store/actions";
import PropTypes from "prop-types";

const PayAtHotel = ({ userDetails }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const tempData = useSelector((state) => state.bookings.tempdata);
  const [bookingObject, setBookingObject] = useState({
    hotelId: tempData?.hotelId,
    userDetails: userDetails,
    checkIn: tempData?.checkIn,
    checkOut: tempData?.checkOut,
    hotelName: tempData?.hotelName,
    hotelCity: tempData?.hotelCity,
    hotelLocation: tempData?.hotelLocation,
    roomCount: tempData?.roomCount,
    guestCount: tempData?.guestCount,
    hotelImage: tempData?.hotelImage,
    price: tempData?.price,
    paymentMode: "Offline",
    paymentStatus: "Not Paid",
  });
  const dispatch = useDispatch();

  const handleCreateBooking = () => {
    setBookingObject({
      hotelId: tempData?.hotelId,
      userDetails: userDetails,
      checkIn: tempData?.checkIn,
      checkOut: tempData?.checkout,
      hotelName: tempData?.hotelName,
      hotelCity: tempData?.hotelCity,
      hotelLocation: tempData?.hotelLocation,
      roomCount: tempData?.roomCount,
      guestCount: tempData?.guestCount,
      hotelImage: tempData?.hotelImage,
      price: tempData?.price,
      paymentMode: "Offline",
      paymentStatus: "Not Paid",
    });
    dispatch(createBooking(bookingObject));
    localStorage?.clear();
    navigate(`/payment/${id}`);
  };

  return (
    <Box marginLeft="10px" height="150px" width="400px">
      <Typography fontWeight="bold" display="flex" alignItems="center">
        <Star color="orange" marginBottom="5px" marginLeft="5px" />
        No payment needed today
      </Typography>
      <Typography marginTop="20px" color="gray" fontSize="sm" component="p">
        We will confirm your stay without any charge. Pay directly at the hotel
        during your stay.
      </Typography>
      <Button
        width="250px"
        sx={{ backgroundColor: "#1ab64f", color: "white", marginTop: "10px" }}
        onClick={handleCreateBooking}
      >
        Book Now
      </Button>
    </Box>
  );
};

PayAtHotel.propTypes = {
  userDetails: PropTypes.any,
};

export default PayAtHotel;
