import { useState } from "react";
import { Box, Typography } from "@mui/material";
import PayAtHotel from "./PayAtHotel";
import PayNow from "./PayNow";
import PropTypes from "prop-types";

const PaymentCard = ({userDetails}) => {
  const [paynow, setPayNow] = useState(false);
  console.log("Inside PaymentCard",{userDetails});

  return (
    <Box
      border="1px solid gray"
      borderRadius="5px"
      marginTop="20px"
      marginBottom="50px"
    >
      <Box
        backgroundColor="#f9f9fb"
        display="flex"
        justifyContent="space-between"
      >
        <Box padding="20px">
          <Typography variant="h6">2. Complete your booking</Typography>
        </Box>
        <Box padding="25px">
          <Typography color="green" fontSize="sm" as="span">
            100% Secure payments
          </Typography>
        </Box>
      </Box>

      <Box display="flex" padding="20px">
        <Box>
          <Box
            onClick={() => setPayNow(false)}
            padding="20px"
            width="200px"
            boxShadow="md"
            style={{ cursor: "pointer" }}
          >
            <Typography fontWeight="bold">Pay At Hotel</Typography>
          </Box>
          <Box
            onClick={() => setPayNow(true)}
            padding="20px"
            width="200px"
            boxShadow="md"
            style={{ cursor: "pointer" }}
          >
            <Typography fontWeight="bold">Pay Now</Typography>
          </Box>
        </Box>
        <Box textAlign="center">{paynow ? <PayNow /> : <PayAtHotel userDetails={userDetails}/>}</Box>
      </Box>
    </Box>
  );
};

PaymentCard.propTypes = {
  userDetails: PropTypes.any,
};

export default PaymentCard;
