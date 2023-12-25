import { useState, useRef } from "react";
import { Button, Modal, Box, Typography, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createHotel } from "../store/actions";
import { IoMdCloseCircle } from "react-icons/io";

const initialHotelData = {
  hotelName: "",
  city: "",
  address: "",
  images: [],
  facilities: Array(15).fill(false),
  price: 0,
};

const JoinForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [extraDetails, setExtraDetails] = useState(false);
  const [hotelData, setHotelData] = useState(initialHotelData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialRef = useRef(null);

  const fileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      const imageId = `image${hotelData.images.length + 1}`;
      setHotelData({
        ...hotelData,
        images: [...hotelData.images, { imageId, imageUrl: reader.result }],
      });
    });

    reader.readAsDataURL(file);
  };

  const addDetails = (e) => {
    let { name, value } = e.target;
    setHotelData({ ...hotelData, [name]: value });
  };

  const facilityNames = [
    "Elevator",
    "TV",
    "Wifi",
    "Iron",
    "Power backup",
    "Wardrobe",
    "CCTV",
    "Reception",
    "Caretaker",
    "Parking Area",
    "Fire Extinguisher",
    "Kitchen",
    "First-aid kit",
    "Electric Kettle",
    "Doctor On Call",
  ];

  const selectFacility = (index) => {
    setHotelData((prevData) => {
      const updatedFacilities = [...prevData.facilities];
      updatedFacilities[index] = !updatedFacilities[index];
      return { ...prevData, facilities: updatedFacilities };
    });
  };

  const clearFacilities = () => {
    setHotelData((prevData) => {
      const updatedFacilities = Array(15).fill(false);
      return { ...prevData, facilities: updatedFacilities };
    });
  };

  const saveHotelDetails = async () => {
    dispatch(createHotel(hotelData));
    navigate("/");
  };

  return (
    <>
      <Button
        variant="contained"
        style={{
          width: "700px",
          height: "45px",
          margin: "auto",
          borderRadius: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "22px",
          fontWeight: "600",
          backgroundColor: "#ff0007",
        }}
        onClick={() => setIsOpen(true)}
      >
        Join OYO
      </Button>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          style={{
            maxWidth: "900px",
            overflow: "hidden",
            padding: "20px 60px",
            backgroundColor: "#fff",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Box display="flex" alignItems="center">
            <Typography
              variant="h6"
              component="h2"
              style={{
                margin: "auto",
                fontSize: "35px",
                color: "black",
                fontWeight: "800",
                letterSpacing: "1px",
              }}
            >
              Get Associated with OYO
            </Typography>
            <Button
              onClick={() => setIsOpen(false)}
              style={{
                position: "absolute",
                right: "0",
                top: "0",
                paddingTop: "1rem",
                color: "#000",
              }}
            >
              {" "}
              <IoMdCloseCircle size={25} />{" "}
            </Button>
          </Box>
          {extraDetails ? (
            <Box>
              <Box
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gridGap: "20px",
                  marginTop: "20px",
                }}
              >
                {hotelData.facilities.map((facility, index) => (
                  <Button
                    key={index}
                    style={{
                      padding: "8px 15px",
                      backgroundColor: facility ? "green" : "#dfdfdf",
                      color: facility ? "white" : "black",
                      fontWeight: "600",
                      letterSpacing: "1px",
                    }}
                    onClick={() => selectFacility(index)}
                  >
                    {facilityNames[index]}
                  </Button>
                ))}
                <Button
                  style={{
                    padding: "8px 8px",
                    borderRadius: "4px",
                    backgroundColor: "#481616",
                    color: "white",
                    fontWeight: "600",
                    letterSpacing: "1px",
                  }}
                  onClick={clearFacilities}
                >
                  Reset
                </Button>
              </Box>
              <Box style={{ display: "flex", marginTop: "20px" }}>
                <Button
                  variant="contained"
                  style={{
                    fontWeight: "600",
                    fontSize: "17px",
                    letterSpacing: "0.8px",
                    marginRight: "8px",
                    backgroundColor: "#ff0007",
                  }}
                  onClick={() => setExtraDetails(false)}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  style={{
                    fontWeight: "600",
                    fontSize: "17px",
                    letterSpacing: "0.8px",
                    marginRight: "8px",
                    backgroundColor: "#ff0007",
                  }}
                  onClick={saveHotelDetails}
                >
                  Save Details
                </Button>
              </Box>
            </Box>
          ) : (
            <Box>
              <form>
                <TextField
                  variant="outlined"
                  label="Hotel Name*"
                  style={{ width: "100%", marginBottom: "14px" }}
                  inputRef={initialRef}
                  onChange={(e) => addDetails(e)}
                  name="hotelName"
                  required
                />
                <TextField
                  variant="outlined"
                  label="City*"
                  style={{ width: "100%", marginBottom: "14px" }}
                  onChange={(e) => addDetails(e)}
                  name="city"
                  required
                />
                <TextField
                  variant="outlined"
                  label="Full Address*"
                  style={{ width: "100%", marginBottom: "14px" }}
                  onChange={(e) => addDetails(e)}
                  name="address"
                  required
                />
                <TextField
                  variant="outlined"
                  label="Price*"
                  style={{ width: "100%", marginBottom: "14px" }}
                  onChange={(e) => addDetails(e)}
                  name="price"
                  required
                />
                <TextField
                  type="file"
                  style={{
                    width: "100%",
                    padding: "4px",
                    marginBottom: "20px",
                  }}
                  name="mainImage"
                  onChange={fileUpload}
                />
                <Box style={{ display: "flex", marginTop: "20px" }}>
                  <Button
                    variant="contained"
                    style={{
                      fontWeight: "600",
                      fontSize: "17px",
                      letterSpacing: "0.8px",
                      marginRight: "8px",
                      backgroundColor: "#ff0007",
                    }}
                    onClick={() => setExtraDetails(true)}
                  >
                    Add more Details
                  </Button>
                  <Button
                    variant="outlined"
                    style={{
                      fontWeight: "600",
                      fontSize: "17px",
                      letterSpacing: "0.8px",
                      marginRight: "8px",
                    }}
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                </Box>
              </form>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default JoinForm;
