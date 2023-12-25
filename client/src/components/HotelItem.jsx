import { Box, Button, Stack } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { BsCheck2Circle } from "react-icons/bs";
import { BiWifi } from "react-icons/bi";
import { AiFillCar } from "react-icons/ai";
import { GiCctvCamera, GiElevator, GiSecurityGate } from "react-icons/gi";
import { WiSnowflakeCold } from "react-icons/wi";
import { RiTempColdLine } from "react-icons/ri";
import { SlScreenDesktop } from "react-icons/sl";
import { GrStakeholder } from "react-icons/gr";

const HotelItem = ({
  hotelName,
  address,
  images,
  city,
  distance,
  info,
  rating,
  ratingCount,
  ratingStatus,
  facilities,
  price,
  discount,
  strikedPrice,
  _id,
}) => {
  const facilityIcons = {
    Wifi: <BiWifi />,
    Reception: <BsCheck2Circle />,
    "Parking facility": <AiFillCar />,
    "CCTV cameras": <GiCctvCamera />,
    "Power backup": <GiElevator />,
    Elevator: <GiElevator />,
    AC: <WiSnowflakeCold />,
    Geyser: <RiTempColdLine />,
    TV: <SlScreenDesktop />,
    Security: <GiSecurityGate />,
    Caretaker: <GrStakeholder />,
  };

  return (
    <>
      {/* Render hotel information */}
      <Box display="flex" borderBottom="1px solid #e1e2e3" paddingBottom="45px">
        <Box width="40%">
          <Carousel>
            {images.map((image, i) => (
              <img
                key={i}
                style={{ height: "270px" }}
                src={image}
                className="main-image"
              />
            ))}
          </Carousel>
        </Box>
        <Box
          width="8.2%"
          height="270px"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Render short images */}
          {images.slice(0, 5).map((image, i) => (
            <img
              key={i}
              style={{ height: "52px" }}
              src={image}
              alt={`short-img-${i}`}
              className="short-image"
            />
          ))}
        </Box>
        <Box
          width="52%"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          paddingLeft="12px"
        >
          {/* Rendering hotel details */}
          <Box display="flex">
            {/* Rendering hotel name and address */}
            <Box width="75%" display="grid">
              <h3 className="hotelName">{hotelName}</h3>
              <Box display="flex">
                <Box width="80%">
                  <p className="all-p-tags">{address}</p>
                </Box>
                <Box
                  width="20%"
                  display="flex"
                  justifyContent="space-evenly"
                  alignItems="center"
                  color="#222"
                >
                  <IoLocationSharp color="#ef4023" />
                  <p className="all-p-tags">{distance}</p>
                </Box>
              </Box>
            </Box>
            {/* Rendering hotel info */}
            <Box
              width="25%"
              color="#ef4023"
              fontSize="14px"
              fontWeight="600"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <p style={{ width: "85%" }}>{info}</p>
            </Box>
          </Box>
          <Box>
            {/* Render rating */}
            <div style={{ display: "flex" }}>
              <div
                style={{
                  marginBottom: "10px",
                  marginTop: "10px",
                  display: "flex",
                }}
              >
                <button
                  style={{
                    background: "rgb(82,181,32)",
                    color: "white",
                    border: "none",
                    borderRadius: "3px",
                    padding: "1px 7px",
                    marginRight: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "15px",
                  }}
                >
                  &nbsp; {rating}★
                </button>
                <p style={{ color: "#898989", fontSize: "14px" }}>
                  {ratingCount} .{ratingStatus}
                </p>
              </div>
            </div>
          </Box>
          <Box>
            {/* Rendering facilities */}
            <Box display="flex" gap="2rem" marginBottom="10px" marginTop="10px" flexWrap={"wrap"}>
              {facilities.map((facility, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent="space-between"
                  gap="5px"
                  height="35px"
                  alignItems="center"
                  color="#222"
                  fontSize="15px"
                >
                  <Box>{facilityIcons[facility.name]}</Box>
                  <p>{facility.name} &nbsp;</p>
                </Box>
              ))}
            </Box>
          </Box>
          <Box>
            {/* Rendering price and buttons */}
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Box>
                  <p style={{ lineHeight: "5px" }}>
                    <span
                      style={{
                        fontSize: "22px",
                        fontWeight: "700",
                        lineHeight: "24px",
                        color: "rgb(238,42,35)",
                      }}
                    >
                      ₹{price} &nbsp;
                    </span>
                    <span
                      style={{
                        textDecoration: "line-through",
                        fontSize: "15px",
                        lineHeight: "25px",
                        color: "rgb(180,186,188)",
                      }}
                    >
                      ₹{strikedPrice} &nbsp;
                    </span>
                    <span
                      style={{
                        color: "rgb(244,165,34)",
                        paddingBottom: "10px",
                        fontSize: "15px",
                      }}
                    >
                      &nbsp;{discount}
                    </span>
                  </p>
                </Box>
                <Box>
                  <p
                    style={{
                      color: "rgb(163,169,172)",
                      fontSize: "13px",
                      paddingBottom: "10px",
                      paddingTop: "10px",
                    }}
                  >
                    per room per night
                  </p>
                </Box>
              </Box>
              <Box style={{ marginLeft: "20px" }}>
                <Stack direction="row" spacing={2}>
                  {/* Rendering buttons with Link */}
                  <Button
                    variant="outlined"
                    style={{
                      fontSize: "15px",
                      fontWeight: "600",
                      color: "black",
                      border: "1px solid black",
                      padding: "4px 15px",
                      borderRadius: "3px",
                    }}
                  >
                    <Link
                      to={`/hotels/${_id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      View Details
                    </Link>
                  </Button>
                  <Button
                    variant="outlined"
                    style={{
                      fontSize: "15px",
                      border: "1px solid black",
                      color: "white",
                      backgroundColor: "#1ab64f",
                      padding: "4px 15px",
                      borderRadius: "3px",
                    }}
                  >
                    <Link
                      to={`/hotels/${_id}`}
                      style={{
                        textDecoration: "none",
                        color: "white",
                        fontWeight: "600",
                      }}
                    >
                      Book Now
                    </Link>
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

HotelItem.propTypes = {
  hotelName: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  city: PropTypes.string,
  distance: PropTypes.number.isRequired,
  info: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  ratingCount: PropTypes.number.isRequired,
  ratingStatus: PropTypes.string.isRequired,
  facilities: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      available: PropTypes.bool.isRequired,
    })
  ).isRequired,
  price: PropTypes.number.isRequired,
  discount: PropTypes.number.isRequired,
  strikedPrice: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
};

export default HotelItem;
