import { useSelector, useDispatch } from "react-redux";
import "./styles/History.css";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useEffect } from "react";
import { getBookingsFilter, getUser } from "../store/actions";

const History = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const bookingsData = useSelector((state) => state.bookings.data);
  useEffect(() => {
    user?.data?.token && getUserDetails();
    dispatch(getBookingsFilter({ email: user?.data?.existingUser?.email }));
  }, [user, dispatch]);

  const getUserDetails = async () => {
    const token = user?.data?.token;
    dispatch(getUser(token));
  };
  return (
    <div id="profile_History">
      <Box
        width="100%"
        padding="30px 60px"
        borderRadius="2px"
        boxShadow="2px 4px 8px 0 rgba(0, 0, 0, 0.1)"
        border="1px solid #d6d6d6"
        backgroundColor="white"
        marginTop="40px"
      >
        <Typography variant="h4" color="#222222">
          Booking History
        </Typography>
        <div
          style={{
            textAlign: "center",
            padding: "50px 0",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {bookingsData?.length > 0 ? (
            bookingsData.map((booking) => (
              <Card
                key={booking._id}
                style={{
                  marginBottom: "20px",
                  width: "30%",
                  height: "350px",
                  gap: "2rem",
                }}
              >
                <CardContent>
                  <Typography variant="h6" color="#222222" fontWeight="600">
                    {booking.hotelName}
                  </Typography>
                  <Typography variant="body1" color="#333333">
                    Check-in: {booking.checkIn} | Check-out: {booking.checkOut}
                  </Typography>
                  <Typography variant="body1" color="#333333">
                    Room Count: {booking.roomCount} | Guest Count:{" "}
                    {booking.guestCount}
                  </Typography>
                  <Typography variant="body1" color="#333333">
                    Price: ₹{booking.price}
                  </Typography>
                  <Typography variant="body1" color="#333333">
                    Payment Status: {booking.paymentStatus}
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="h6" color="#ee2e24" fontWeight="600">
              You have no Booking History to Show.
            </Typography>
          )}
        </div>
      </Box>
    </div>
  );
};

export default History;
