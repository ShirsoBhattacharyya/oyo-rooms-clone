import { Box, Button, Input, Typography } from "@mui/material";

const PayNow = () => {
  return (
    <Box textAlign="center" width="400px" height="150px">
      <Box width="200px" margin="auto" alignItems="center" display="flex">
        <Box>
          <img
            style={{ width: "60px" }}
            src="https://cdn1.iconfinder.com/data/icons/logos-brands-in-colors/436/Google_Pay_GPay_Logo-512.png"
            alt="Google Pay Logo"
          />
        </Box>
        <Box ml="10px">
          <Typography fontWeight="bold">Google Pay</Typography>
        </Box>
      </Box>

      <Box>
        <Input width="200px" placeholder="Enter mobile number" /> <br />
        <Button
          style={{
            backgroundColor: "#1ab64f",
            color: "white",
            width: "200px",
            marginTop: "5px",
          }}
        >
          Pay
        </Button>
      </Box>
    </Box>
  );
};

export default PayNow;
