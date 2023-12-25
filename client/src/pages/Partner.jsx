import { Box, Typography } from "@mui/material";
import { JoinForm } from "../components";

import "./styles/Partner.css";

const Partner = () => {
  return (
    <div id="partnerTop">
      <Box id="top" style={{ position: "absolute", width: "100%" }}>
        <img id="partner_Top_image" src="/assets/images/partnersTopBackground.jpg" alt="Partner Top Image" />
      </Box>
      <Box style={{ position: "relative", padding: "28px 100px", zIndex: 10 }}>
        <Box>
          <img id="partner_Logo" src="assets/images/partnerLogo.png" alt="Logo" />
        </Box>
        <Box color="white" style={{ width: "380px", marginTop: "150px" }}>
          <Typography variant="h3" fontSize="40px" lineHeight="50px">
            Growing your business made easy
          </Typography>
          <Typography
            variant="h2"
            className="heading"
            fontSize="50px"
            textTransform="uppercase"
            fontFamily="Roboto"
          >
            Just for you
          </Typography>
          <Box
            style={{ width: "87%", height: "1px", backgroundColor: "#ff0007" }}
          />
          <Typography
            variant="h4"
            fontSize="30px"
            lineHeight="37px"
            marginTop="15px"
            width="280px"
            letterSpacing="0.6px"
          >
            Become an OYO in just 30 minutes
          </Typography>
        </Box>
      </Box>
      <Box
        style={{
          position: "fixed",
          bottom: "0px",
          width: "100%",
          padding: "25px 0",
          backgroundColor: "white",
          zIndex: 10,
        }}
      >
        <JoinForm />
      </Box>
    </div>
  );
};

export default Partner;
