import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { FaRegCalendarAlt } from "react-icons/fa";
import { HiReceiptTax } from "react-icons/hi";
import StarIcon from "@mui/icons-material/Star";

const HotelBookingDetails = ({ data }) => {
  const roomCount = localStorage.getItem("roomCount") || 1;
  const guestCount = localStorage.getItem("guestCount") || 1;

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currDate = new Date();
  let monthName = month[currDate.getMonth()];
  let date = currDate.getDate();
  let year = currDate.getFullYear();

  let today = `${date}th ${monthName} ${year}`;
  let tomorrow = `${date + 1}th ${monthName} ${year}`;

  const bookingStartDate = localStorage.getItem("start") || today;
  const bookingEndDate = localStorage.getItem("finish") || tomorrow;
  localStorage.setItem("start", bookingStartDate);
  localStorage.setItem("finish", bookingEndDate);

  return (
    <Box padding="20px" width="100%" height="480px" border="1px solid gray">
      <Box display="flex" justifyContent="space-between">
        <Box textAlign="left">
          <Typography variant="h6" gutterBottom>
            {`${data?.hotelName}`}
          </Typography>
          <Typography display="flex" alignItems="center" color="textSecondary">
            <StarIcon
              sx={{ color: "#1ab64f", fontSize: "15px", marginRight: 0.5 }}
            />
            {`${data?.rating} rating`}
          </Typography>
          <Typography fontWeight="bold" marginTop={1}>
            Night
          </Typography>
        </Box>
        <Box>
          <img
            height="60px"
            style={{ marginLeft: "10px", borderRadius: "5px", width: "80px" }}
            src={`${data?.images?.[0]}`}
            alt="Hotel"
          />
        </Box>
      </Box>

      <Box marginTop={2} textAlign="left" display="flex">
        <Box
          paddingTop={1}
          paddingBottom={1}
          paddingRight={1}
          display="flex"
          borderBottom="0.1px solid gray"
          borderRight="0.1px solid gray"
        >
          <Box padding={0.5}>
            <FaRegCalendarAlt />
          </Box>
          <Box
            padding={"0px 5px"}
          >{`${bookingStartDate}  -  ${bookingEndDate}`}</Box>
        </Box>
        <Box padding={1} borderBottom="0.1px solid gray">
          {`${roomCount} Room, ${guestCount} Guests`}
        </Box>
      </Box>

      <Box paddingTop={1} paddingBottom={1} paddingRight={1} display="flex">
        <Box padding={0.5}>
          <FaRegCalendarAlt />
        </Box>
        <Box> Classic (2X)</Box>
      </Box>

      <Box marginTop={3} display="flex" justifyContent="space-between">
        <Box>Room price for 1 Night X {guestCount} Guests</Box>
        <Box component="b">₹{`${data?.strikedPrice}`}</Box>
      </Box>

      <Box
        marginBottom={3}
        marginTop={3}
        display="flex"
        justifyContent="space-between"
      >
        <Box>{`${data?.discount}`} Coupon Discount</Box>
        <Box component="b">-{`${data?.discount}`}</Box>
      </Box>

      <hr />

      <Box
        marginTop={3}
        marginBottom={3}
        display="flex"
        justifyContent="space-between"
      >
        <Box>
          <Typography component="p">Payable Amount</Typography>
          <Box display="flex" alignItems="center">
            <HiReceiptTax
              sx={{ color: "#1ab64f", fontSize: "15px", marginRight: 0.5 }}
            />
            <Typography component="p" fontSize="xs">
              inclusive of all taxes
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography component="b" variant="h6">
            ₹{`${data?.price}`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

HotelBookingDetails.propTypes = {
  data: PropTypes.any
};

export default HotelBookingDetails;
