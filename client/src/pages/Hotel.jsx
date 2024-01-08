import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getHotelById, createTemporaryBooking } from "../store/actions";
import { BiWifi } from "react-icons/bi";
import { GrStakeholder } from "react-icons/gr";
import {
  GiCarBattery,
  GiCctvCamera,
  GiElevator,
  GiSecurityGate,
} from "react-icons/gi";
import { BsCheck2Circle, BsFillPatchCheckFill } from "react-icons/bs";
import { AiFillCar } from "react-icons/ai";
import { WiSnowflakeCold } from "react-icons/wi";
import { RiTempColdLine } from "react-icons/ri";
import { SlScreenDesktop } from "react-icons/sl";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { HiReceiptPercent } from "react-icons/hi2";
import { SiVirustotal } from "react-icons/si";
import { Skeleton, Box } from "@mui/material";
import { Header, Footer } from "../components";
import Carousel from "react-material-ui-carousel";

const Hotel = () => {
  const { id } = useParams();
  const roomCount = localStorage.getItem("roomCount") || 1;
  const guestCount = localStorage.getItem("guestCount") || 1;
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.hotels);
  const roomDetails = useSelector((state) => state.hotels.data);
  console.log({roomDetails});
  const { user } = useSelector((state) => state.user);
  console.log({user});
  console.log({ roomDetails });

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

  const getDetails = () => {
    dispatch(getHotelById(id));
  };

  useEffect(() => {
    getDetails();
  }, []);

  console.log(roomDetails);

  if (loading)
    return (
      <Box>
        {[...Array(30)].map((_, index) => (
          <Skeleton key={index} height="20px" />
        ))}
      </Box>
    );

  const facilityIcons = [
    {
      icon: <BiWifi />,
      facility: "Free Wi-Fi",
    },
    {
      icon: <BsCheck2Circle />,
      facility: "Reception",
    },
    {
      icon: <AiFillCar />,
      facility: "Parking facility",
    },
    {
      icon: <GiCctvCamera />,
      facility: "CCTV cameras",
    },
    {
      icon: <GiCarBattery />,
      facility: "Power backup",
    },
    {
      icon: <GiElevator />,
      facility: "Elevator",
    },
    {
      icon: <WiSnowflakeCold />,
      facility: "AC",
    },
    {
      icon: <RiTempColdLine />,
      facility: "Geyser",
    },
    {
      icon: <SlScreenDesktop />,
      facility: "TV",
    },
    {
      icon: <GiSecurityGate />,
      facility: "Security",
    },
    {
      icon: <GrStakeholder />,
      facility: "Caretaker",
    },
  ];

  const handleCreateTemporaryBooking = () => {
    const temporaryBookingObject = {
      hotelId: roomDetails?._id || id,
      userDetails: {
        name: user?.data?.existingUser?.name || "",
        email: user?.data?.existingUser?.email || "",
        phone: user?.data?.existingUser?.phone || "",
      },
      checkIn: bookingStartDate,
      checkOut: bookingEndDate,
      hotelName: roomDetails?.hotelName,
      hotelCity: roomDetails?.city,
      hotelLocation: roomDetails?.region,
      hotelAddress: roomDetails?.address,
      roomCount: roomCount,
      guestCount: guestCount,
      hotelImage: roomDetails?.images?.[0],
      price: roomDetails?.price,
    };
    console.log({temporaryBookingObject});
    dispatch(createTemporaryBooking(temporaryBookingObject));
  };
  return (
    <>
      <Header />
      <Box display="flex" justifyContent="space-around">
        <Box width="49%" height="90%">
          <Carousel>
            {roomDetails?.images?.map((item, i) => (
              <img key={i} src={item} className="main-image" />
            ))}
          </Carousel>
        </Box>
        <Box width="49%" height="90%">
          <Carousel>
            {roomDetails?.images?.map((item, i) => (
              <img key={i} src={item} className="main-image" />
            ))}
          </Carousel>
        </Box>
      </Box>
      <div>
        <div>
          <div
            style={{
              display: "flex",
              gap: "2rem",
              margin: "5%",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
                paddingLeft: "20px",

                width: "50%",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: "500px" }}>
                  <h2>{roomDetails?.hotelName}</h2>
                  <p style={{ color: "#c4c4c4" }}>{roomDetails?.address}</p>
                </div>
                <div>
                  <button
                    style={{
                      background: "rgb(82,181,32)",
                      color: "white",
                      border: "none",
                      borderRadius: "3px",
                      padding: "5px 18px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "18px",
                      fontWeight: "bolder",
                      margin: "0px",
                    }}
                  >
                    {roomDetails?.rating} ★
                  </button>
                  <p
                    style={{
                      backgroundColor: "rgb(239 239 239)",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                  >
                    {roomDetails?.ratingCount}
                  </p>
                </div>
              </div>
              <div style={{ textAlign: "left" }}>
                <h5>Description</h5>
                <p
                  style={{
                    color: "rgba(0,0,0,0.7)",
                    fontWeight: "100",
                    wordSpacing: "2px",
                  }}
                >
                  {roomDetails?.info}
                </p>
                <div>
                  <h6 style={{ color: "#ee2e24" }}>Read more</h6>
                </div>
              </div>
              <div>
                <h5>Amenities</h5>
              </div>
              <Box>
                <Box
                  display="flex"
                  gap="2rem"
                  marginBottom="10px"
                  marginTop="10px"
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    gap="5px"
                    height="35px"
                    alignItems="center"
                    color="#222"
                    fontSize="15px"
                  >
                    {facilityIcons.map((elem) => {
                      if (elem.facility == roomDetails?.facility1) {
                        return elem.icon;
                      }
                    })}{" "}
                    <p> {roomDetails?.facility1} &nbsp;</p>{" "}
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    gap="5px"
                    height="35px"
                    alignItems="center"
                    color="#222"
                    fontSize="15px"
                  >
                    {facilityIcons.map((elem) => {
                      if (elem.facility == roomDetails?.facility2) {
                        return elem.icon;
                      }
                    })}{" "}
                    <p> {roomDetails?.facility2} &nbsp;</p>{" "}
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    gap="5px"
                    height="35px"
                    alignItems="center"
                    color="#222"
                    fontSize="15px"
                  >
                    {facilityIcons.map((elem) => {
                      if (elem.facility == roomDetails?.facility3) {
                        return elem.icon;
                      }
                    })}{" "}
                    <p> {roomDetails?.facility3} &nbsp;</p>{" "}
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    gap="5px"
                    height="35px"
                    alignItems="center"
                    color="#222"
                    fontSize="15px"
                  >
                    {" "}
                    <p> {roomDetails?.facilityX} &nbsp;</p>{" "}
                  </Box>
                </Box>
              </Box>

              <div>
                <div>
                  <h2>Choose your room</h2>
                </div>
                <div
                  style={{
                    border: "1px solid rgb(215,215,215)",
                    borderRadius: "20px",
                    padding: "10px",
                  }}
                >
                  <div
                    style={{
                      background: "#7c809b",
                      paddingLeft: "10px",
                      borderRadius: "10px",
                    }}
                  >
                    <p>
                      <span style={{ color: "yellow" }}>★</span>{" "}
                      <span
                        style={{
                          color: "white",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        SELECTED CATEGORY
                      </span>
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingTop: "14px",
                      borderBottom: "1px solid #74747428",
                    }}
                  >
                    <Box>
                      <Box>
                        <h5>
                          Classic (2X) <BsFillPatchCheckFill color="#2ed56b" />
                        </h5>
                        <p style={{ fontSize: "15px" }}>Room size: 156 sqft</p>
                      </Box>
                      <Box
                        display="flex"
                        gap="2rem"
                        marginBottom="10px"
                        marginTop="10px"
                      >
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          gap="5px"
                          height="35px"
                          alignItems="center"
                          color="#222"
                          fontSize="15px"
                        >
                          {facilityIcons.map((elem) => {
                            if (elem.facility == roomDetails?.facility2) {
                              return elem.icon;
                            }
                          })}{" "}
                          <p> {roomDetails?.facility2} &nbsp;</p>{" "}
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          gap="5px"
                          height="35px"
                          color="#222"
                          fontSize="15px"
                        >
                          {facilityIcons.map((elem) => {
                            if (elem.facility == roomDetails?.facility3) {
                              return elem.icon;
                            }
                          })}{" "}
                          <p> {roomDetails?.facility3} &nbsp;</p>{" "}
                        </Box>
                      </Box>
                    </Box>
                    <div style={{ padding: "5px" }}>
                      <img
                        src={roomDetails?.image1}
                        alt="img"
                        height="120px"
                        style={{ borderRadius: "10px", marginLeft: "50px" }}
                      />
                    </div>
                  </div>

                  <Box
                    padding="12px"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box display="flex" justifyContent="space-between">
                      <h5>₹ {roomDetails?.price}</h5>
                      <p
                        style={{
                          textDecoration: "line-through",
                          color: "gray",
                          marginLeft: "8px",
                        }}
                      >
                        ₹ {roomDetails?.strikedPrice}
                      </p>
                    </Box>
                    <Box>
                      <button
                        style={{
                          cursor: "pointer",
                          border: "1px solid rgb(215,215,215)",
                          backgroundColor: "white",
                          fontSize: "12px",
                          fontWeight: "700",
                          width: "150px",
                          padding: "10px",
                          borderRadius: "5px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <BsFillPatchCheckFill color="#2ed56b" /> &nbsp; SELECTED
                      </button>
                    </Box>
                  </Box>
                </div>
              </div>
            </div>
            {/* Checkout section */}
            <div style={{ border: "1px solid rgb(240,240,240)" }}>
              {user?.token ? (
                ""
              ) : (
                <div
                  style={{
                    background: "rgb(241,85,63)",
                    padding: "10px",
                    color: "white",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>LOG IN NOW TO GET EXCLUSIVE DEALS</span>
                  <span style={{ marginLeft: "60px" }}>
                    <Link to="/login">
                      <button
                        style={{
                          borderRadius: "4px",
                          padding: "3px",
                          color: "white",
                          background: "rgb(247,139,123)",
                          border: "1px solid rgb(247,139,123)",
                        }}
                      >
                        LOGIN
                      </button>
                    </Link>
                  </span>
                </div>
              )}
              <div style={{ margin: "20px" }}>
                <div>
                  <p style={{ lineHeight: "5px", textAlign: "left" }}>
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        lineHeight: "24px",
                        color: "rgb(238,42,35)",
                      }}
                    >
                      ₹ {roomDetails?.price}
                    </span>
                    <span
                      style={{
                        textDecoration: "line-through",
                        fontSize: "13px",
                        lineHeight: "25px",
                        color: "rgb(180,186,188)",
                        marginLeft: "1rem",
                      }}
                    >
                      ₹ {roomDetails?.strikedPrice}
                    </span>
                    <span
                      style={{ color: "rgb(246,178,75)", marginLeft: "1rem" }}
                    >
                      {roomDetails?.discount}
                    </span>
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      color: "rgb(163,169,172)",
                      fontSize: "14px",
                      textAlign: "left",
                    }}
                  >
                    Inclusive of all taxes
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    border: "2px solid rgb(240,240,240)",
                    boxShadow: "1px 1px 3px gray",
                  }}
                >
                  <div
                    style={{
                      borderRight: "1px solid rgb(240,240,240)",
                      padding: "10px",
                    }}
                  >
                    {`${bookingStartDate}  -  ${bookingEndDate}`}
                  </div>
                  <div
                    style={{
                      borderRight: "1px solid white",
                      padding: "10px",
                    }}
                  >
                    {`${roomCount} Room, ${guestCount} Guests`}
                  </div>
                </div>
                <div
                  style={{
                    border: "2px solid rgb(240,240,240)",
                    boxShadow: "1px 1px 3px gray",
                    marginTop: "15px",
                    padding: "10px",
                  }}
                >
                  Classic (2X)
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "20px",
                    color: "rgb(34,34,34)",
                  }}
                >
                  <div>
                    <HiReceiptPercent color="#f8c267" fontSize="30px" />{" "}
                    OYOFESTIVE50 coupon applied
                  </div>
                  <div>₹{89}✅</div>
                </div>

                <div
                  style={{
                    marginLeft: "20px",
                    background: "rgb(247,247,247)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px",
                      color: "rgb(34,34,34)",
                    }}
                  >
                    <div>
                      <FaMoneyCheckAlt color="#2b30d1" fontSize="30px" /> Save
                      5% with Wizard membership
                    </div>
                    <div>- ₹52</div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px",
                    }}
                  >
                    <p>Get Wizard Membership at special price</p>
                    <p>₹99</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px",
                    }}
                  >
                    <p>Get additional benefits upto ₹1000</p>
                    <p style={{ textDecoration: "line-through" }}>₹199</p>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    textAlign: "left",
                    gap: "17.5rem",
                  }}
                >
                  <div>
                    <div style={{ margin: "20px" }}>
                      <SiVirustotal color="lightgreen" /> Your savings
                    </div>
                    <div style={{ margin: "20px" }}>Total price</div>
                    <div style={{ margin: "20px" }}>
                      <span>(Incl. of all taxes)</span>
                    </div>
                  </div>
                  <div>
                    <div style={{ margin: "20px" }}>
                      ₹{roomDetails?.strikedPrice - roomDetails?.price - 89}
                    </div>
                    <div style={{ marginLeft: "20px" }}>
                      ₹{roomDetails?.price}
                    </div>
                  </div>
                </div>
                <Link
                  to={`/checkout/${id}`}
                  style={{
                    padding: "20px",
                    background: "#1ab64f",
                    textDecoration: "none",
                    color: "white",
                    cursor: "pointer",
                    fontSize: "18px",
                    fontWeight: "700",
                    display: "block",
                  }}
                  onClick={handleCreateTemporaryBooking}
                >
                  Continue to Book
                </Link>
                <div
                  style={{ margin: "20px", color: "red", textAlign: "left" }}
                >
                  Cancellation Policy ©️
                </div>
                <div
                  style={{ margin: "20px", color: "red", textAlign: "left" }}
                >
                  Follow safety measures advised at the hotel
                </div>
                <div
                  style={{ margin: "20px", color: "red", textAlign: "left" }}
                >
                  <span style={{ color: "rgb(158,158,158)" }}>
                    {" "}
                    By proceeding, you agree to our
                  </span>{" "}
                  Guest Policies.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Hotel;
