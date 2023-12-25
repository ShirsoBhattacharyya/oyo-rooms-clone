import "./styles/History.css";
import { Box, Typography } from "@mui/material";

const History = () => {
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
        <div style={{ textAlign: "center", padding: "50px 0" }}>
          <Typography variant="h6" color="#ee2e24" fontWeight="600">
            You have no Booking History to Show.
          </Typography>
        </div>
      </Box>
    </div>
  );
};

export default History;
