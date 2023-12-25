import { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import PaymentCard from "./PaymentCard";

const CustomerDetails = ({ userDetails, handleChangeUserDetailsObject }) => {
  const [conBtn, setConBtn] = useState(false);

  return (
    <Box mb="50px" textAlign="left" width="100%">
      <Box
        borderRadius="5px"
        textAlign="center"
        mb="20px"
        color="#d59560"
        bgcolor="#fef6e9"
        p="10px"
        border="1px solid yellow"
      >
        🎉 Yay! you just saved ₹1201 on this booking!
      </Box>

      <Box borderRadius="5px" border="1px solid gray">
        <Box textAlign="left" bgcolor="#f9f9fb" p="20px">
          <Typography variant="h6">1. Enter your details</Typography>
        </Box>

        <Box p="30px">
          We will use these details to share your booking information
        </Box>

        <Grid container spacing={6} p="20px">
          <Grid item xs={12} md={6}>
            <Typography component="b">Full Name</Typography>
            <TextField
              onChange={handleChangeUserDetailsObject}
              name="name"
              fullWidth
              margin="normal"
              placeholder="Enter your firstname and lastname"
              value={userDetails?.name}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography component="b">Email Address</Typography>
            <TextField
              onChange={handleChangeUserDetailsObject}
              name="email"
              fullWidth
              margin="normal"
              placeholder="Enter your email"
              value={userDetails?.email}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography component="b">Mobile Number</Typography>
            <TextField
              onChange={(e) => handleChangeUserDetailsObject(e)}
              name="phone"
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+91</InputAdornment>
                ),
              }}
              type="tel"
              placeholder="Phone Number"
              value={userDetails?.phone}
            />
          </Grid>
        </Grid>

        <Box p="20px">
          <Button
            onClick={() => {
              setConBtn(!conBtn);
            }}
            style={{
              height: "50px",
              width: "220px",
              backgroundColor: "#1ab64f",
              color: "white",
            }}
          >
            Continue
          </Button>
        </Box>
      </Box>
      {conBtn ? (
        <PaymentCard userDetails={userDetails}/>
      ) : (
        <Box
          color="gray"
          borderRadius="5px"
          mt="10px"
          textAlign="left"
          p="15px"
          border="1px solid gray"
        >
          <Typography variant="h6">2. Complete your booking</Typography>
        </Box>
      )}
    </Box>
  );
};

CustomerDetails.propTypes = {
  userDetails: PropTypes.any,
  handleChangeUserDetailsObject: PropTypes.any,
};

export default CustomerDetails;
