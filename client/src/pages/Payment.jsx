import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Divider,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const Payment = () => {
  const data = useSelector((state) => state.bookings.data);
  console.log({data});

  // if (loading) {
  //   return (
  //     <Box>
  //       {[...Array(30)].map((_, index) => (
  //         <Skeleton key={index} height="20px" />
  //       ))}
  //     </Box>
  //   );
  // }

  // if (error) {
  //   return (
  //     <Box mt="50px">
  //       <Typography color="error">
  //         Something went wrong, please refresh
  //       </Typography>
  //     </Box>
  //   );
  // }

  return (
    <Box>
      <Box p={2} boxShadow="base">
        <img
          style={{ marginLeft: "12px", width: "95px", height: "auto" }}
          src={data?.hotelImage || "/assets/images/property.png"}
          alt="Hotel Image"
        />
      </Box>

      <Box textAlign="left" width="76%" m="auto">
        <Box m="10px" mt="30px">
          <Typography variant="h5" color="green">
            Great! Your stay is confirmed.
          </Typography>
          <Typography variant="body1" fontWeight={"500"}>
            You will soon receive an email confirmation {data?.userDetails?.email}
          </Typography>{" "}
          <br />
          <Button
            mt="30px"
            mb="30px"
            variant="outlined"
            style={{
              width: "180px",
              height: "40px",
              border: "2px solid",
              background: "white",
              color: "black",
            }}
          >
            Print
          </Button>
        </Box>

        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h6" fontSize={"25px"}>
            Booking ID
          </Typography>
          <Typography variant="body1" mt="5px">
            BID{(data?._id)}
          </Typography>

          <Divider
            style={{
              marginTop: "20px",
              marginBottom: "20px",
              backgroundColor: "gray",
              height: "2px",
            }}
          />

          <Box display="flex">
            <Box flexGrow={1}>
              <Typography variant="h5" fontWeight={"500"}>
                {data?.hotelName}
              </Typography>
              <Typography variant="body">{data?.hotelCity}</Typography>

              <Typography mt="10px" variant="h6" fontWeight={"500"}>
                Hotel Direction
              </Typography>
              <Typography variant="body">{data?.hotelLocation}</Typography>

              <Typography mt="10px" variant="h6" fontWeight={"500"}>
                Primary Guest
              </Typography>
              <Typography variant="body">{data?.guestCount}</Typography>

              <Typography mt="5px" variant="h6" fontWeight={"500"}>
                Email address
              </Typography>
              <Typography variant="body">{data?.userDetails?.email}</Typography>

              <Typography mt="5px" variant="h6" fontWeight={"500"}>
                Phone Number
              </Typography>
              <Typography variant="body">{data?.userDetails?.phone}</Typography>
            </Box>

            <Box>
              <img
                style={{ width: "300px", height: "180px" }}
                src={data?.hotelImage || "/assets/images/property.png"}
                alt="Hotel Image"
              />
            </Box>
          </Box>

          <Divider
            style={{
              backgroundColor: "gray",
              height: "2px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          />

          <img
            width="100%"
            src="/assets/images/breakfastcards.png"
            alt="Breakfast Cards"
          />

          <Divider
            style={{
              backgroundColor: "gray",
              height: "2px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default Payment;
