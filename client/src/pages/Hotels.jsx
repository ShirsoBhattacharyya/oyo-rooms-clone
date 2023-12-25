import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Header, Footer } from "../components";
import {
  Box,
  Button,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import "./styles/Hotels.css";
import { HotelItem } from "../components";
import { getHotelsFilter } from "../store/actions";

const Hotels = () => {
  let [start, setStart] = useState([0]);
  let [end, setEnd] = useState([10000]);
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

  const initialFacilities = facilityNames.map((name) => ({
    name,
    available: false,
  }));

  const [facilities, setFacilities] = useState(initialFacilities);

  const hoteldata = useSelector((state) => state?.hotels?.data?.hotels);
  console.log({ hoteldata });
  let [filterArray, setFilterArray] = useState(hoteldata || []);
  const [value, setValue] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("rating");
  const dispatch = useDispatch();
  let page = useRef(1);

  const handleFilter = (clickedFacility) => {
    const updatedFacilities = facilities.map((facility) =>
      facility.name === clickedFacility.name
        ? { ...facility, available: !facility.available }
        : facility
    );

    setFacilities(updatedFacilities);
    dispatch(getHotelsFilter({ searchKey: currentCity }, page.current));
  };

  useEffect(() => {
    if (!filterArray.length) {
      dispatch(getHotelsFilter({ searchKey: currentCity }, page.current));
    }
    setFilterArray(hoteldata || []);
  }, [hoteldata]);

  let currentCity = localStorage.getItem("currentCity");

  const prevPage = () => {
    page.current--;
    dispatch(getHotelsFilter({ currentCity, facilities }, page.current));
  };

  const nextPage = () => {
    page.current++;
    dispatch(getHotelsFilter({ currentCity, facilities }, page.current));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    start = newValue[0] * 100;
    end = newValue[1] * 100;
    setStart(start);
    setEnd(end);

    let filterHotelData = hoteldata.filter(
      (elem) => elem.price >= start && elem.price <= end
    );
    setFilterArray(filterHotelData);
  };

  const handleSortBy = (e) => {
    setSortBy(e.target.value);
  };

  switch (sortBy) {
    case "rating": {
      filterArray?.sort((a, b) => b.rating - a.rating);
      break;
    }
    case "lowtohigh": {
      filterArray?.sort((a, b) => a.price - b.price);
      break;
    }
    case "hightolow": {
      filterArray?.sort((a, b) => b.price - a.price);
      break;
    }
    default:
      return filterArray;
  }

  const valuetext = (value) => {
    return value * 100;
  };

  return (
    <div>
      <Header />

      <div
        style={{
          background: "rgb(222,150,64)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ marginTop: "-5px" }}>
          <span style={{ fontSize: "30px" }}>⚠</span>
        </div>
        <div style={{ padding: "5px" }}>
          <span
            style={{
              fontSize: "14px",
              lineHeight: "13px",
              color: "rgb(32,32,32)",
            }}
          >
            Please check the travel advisory issued by the concerned state
            government/local authorities before booking, as some places may have
            COVID-19 related travel/lodging restrictions.
          </span>
        </div>
      </div>

      <div style={{ display: "flex", padding: "0px 25px", textAlign: "left" }}>
        <div
          style={{
            width: "18%",
            borderRight: ".05px solid lightgrey",
            paddingRight: "20px",
          }}
        >
          <div>
            <h2 style={{ fontSize: "30px" }}>Filters</h2>
          </div>

          <hr
            style={{ border: ".2px solid rgb(224,224,224)", marginTop: "15px" }}
          />
          <div>
            <h4 style={{ marginTop: "15px" }}>Price </h4>
            <Box>
              <Slider
                style={{ color: "rgb(239,42,36)" }}
                getAriaLabel={() => "Temperature range"}
                value={value}
                onChange={handleChange}
                getAriaValueText={valuetext}
              />
            </Box>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "15px",
                fontWeight: "900",
              }}
            >
              <span
                style={{
                  backgroundColor: "#f3f5f7",
                  padding: "7px",
                  borderRadius: "15px",
                }}
              >
                ₹{start}
              </span>
              <span
                style={{
                  backgroundColor: "#f3f5f7",
                  padding: "7px",
                  borderRadius: "15px",
                }}
              >
                {" "}
                ₹{end}
              </span>
            </div>
          </div>
          <hr
            style={{ border: ".2px solid rgb(224,224,224)", marginTop: "10px" }}
          />

          <div>
            <h4>Hotel Facilities</h4>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {initialFacilities.map((facility) => (
                <div key={facility.name}>
                  <input
                    style={{
                      marginRight: "10px",
                      height: "15px",
                      width: "18px",
                      cursor: "pointer",
                    }}
                    type="checkbox"
                    checked={facility.available}
                    onChange={() => handleFilter(facility)}
                  />
                  {facility?.name}
                </div>
              ))}
            </div>

            <hr
              style={{
                border: ".2px solid rgb(224,224,224)",
                marginTop: "10px",
              }}
            />
            <h4>Check-in features</h4>
            <div>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label={
                    <Box
                      component="div"
                      fontSize={15}
                      fontWeight={500}
                      marginTop={0.5}
                    >
                      Pay at Hotel
                    </Box>
                  }
                />
              </FormGroup>
            </div>
          </div>
        </div>

        <div
          style={{
            width: "80%",
            margin: "auto",
            paddingLeft: "20px",
            marginTop: "20px",
          }}
        >
          <div style={{ display: "flex", marginBottom: "30px" }}>
            <Box
              display="flex"
              alignItems="flex-end"
              width="100%"
              borderBottom="1px solid #e1e2e3"
            >
              <span style={{ fontSize: "21px", fontWeight: "700" }}>
                Hotels in {currentCity}
              </span>
              <span style={{ marginLeft: "350px" }}> Map View </span>
              <span style={{ marginLeft: "8px" }}>
                <label className="switch">
                  <input type="checkbox" />
                  <span className={`slider round`}></span>
                </label>
              </span>
              <FormControl
                variant="standard"
                sx={{ minWidth: 120, marginLeft: "200px" }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Sort By
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  name="sort"
                  onChange={handleSortBy}
                  label="Sort By"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="rating">Guest Ratings</MenuItem>
                  <MenuItem value="lowtohigh">Price Low To High</MenuItem>
                  <MenuItem value="hightolow">Price High To Low</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <hr
            style={{ border: ".2px solid rgb(224,224,224)", marginTop: "15px" }}
          />

          <div style={{ width: "100%", display: "grid", gap: "45px" }}>
            {filterArray.length === 0 ? (
              <h2>Loading Hotels...</h2>
            ) : (
              filterArray.map((item) => (
                <HotelItem
                  key={item._id}
                  hotelName={item.hotelName}
                  address={item.address}
                  images={item.images}
                  city={item.city}
                  distance={item.distance}
                  info={item.info}
                  rating={item.rating}
                  ratingCount={item.ratingCount}
                  ratingStatus={item.ratingStatus}
                  facilities={item.facilities}
                  price={item.price}
                  discount={item.discount}
                  strikedPrice={item.strikedPrice}
                  _id={item._id}
                />
              ))
            )}
          </div>

          <div style={{ display: "flex", width: "215px", margin: "auto" }}>
            <div style={{ margin: "20px" }}>
              <Button
                variant="outlined"
                onClick={prevPage}
                disabled={page.current === 1 ? true : false}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  fontWeight: "900",
                  marginBottom: "20px",
                }}
              >
                Prev
              </Button>
            </div>
            <div style={{ margin: "20px" }}>
              <Button
                variant="outlined"
                onClick={nextPage}
                disabled={page.current === 4 ? true : false}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  fontWeight: "900",
                  marginBottom: "20px",
                }}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Hotels;
