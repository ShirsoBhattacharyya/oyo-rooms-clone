import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import "bootstrap/dist/css/bootstrap.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./styles/SearchBanner.css";
import SearchBox from "./SearchBox";

const SearchBanner = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [searchKey, setSearchKey] = useState("");
  const [openDateRange, setOpenDateRange] = useState(false);
  const [showRooms, setShowRooms] = useState(false);
  const [roomCount, setRoomCount] = useState(1);
  const [guestCount, setGuestCount] = useState(1);
  const [roomContainer, setRoomContainer] = useState([<></>]);

  const handleChangeSearchKey = (e) => {
    setSearchKey(e.target.value);
  };

  const handleSearchHotel = () => {
    localStorage.setItem("currentCity", searchKey);
    navigate("/hotels");
  };

  const toggleDateRange = () => {
    setOpenDateRange(!openDateRange);
  };

  const handleDateChange = (item) => {
    setDateRange([item.selection]);
    localStorage.setItem("start", item.selection.startDate.toISOString());
    localStorage.setItem("finish", item.selection.endDate.toISOString());
  };

  const showRoomsHandler = () => {
    setShowRooms(!showRooms);
  };

  const handleRoomAndGuest = () => {
    const element = [
      ...roomContainer,
      <div
        key={roomCount}
        id="addRoomsDropDownHead"
        style={{ display: "flex" }}
      >
        <div>Room {roomCount}</div>
        <div>
          <span onClick={() => setGuestCount(guestCount - 1)}> – </span>
          <span>{guestCount}</span>
          <span onClick={() => setGuestCount(guestCount + 1)}> + </span>
        </div>
      </div>,
    ];

    localStorage.setItem("roomCount", roomCount);
    localStorage.setItem("guestCount", guestCount);

    return element;
  };

  const handleAddRoom = () => {
    localStorage.removeItem("roomCount");
    localStorage.removeItem("guestCount");
    const element = (
      <div
        key={roomCount}
        id="addRoomsDropDownHead"
        style={{ display: "flex" }}
      >
        <div>Room {roomCount}</div>
        <div>
          <span onClick={() => setGuestCount(guestCount - 1)}> – </span>
          <span>{1}</span>
          <span onClick={() => setGuestCount(guestCount + 1)}> + </span>
        </div>
      </div>
    );
    setRoomContainer([...roomContainer, element]);
    setRoomCount(roomCount + 1);
  };

  const handleDeleteRoom = () => {
    const elem = roomContainer.map((ele, index) => {
      if (index < roomContainer.length - 2) {
        return ele;
      }
      return null;
    });
    setRoomContainer(elem.filter(Boolean));
  };

  return (
    <div
      className="container-fluid"
      style={{ position: "relative", zIndex: "1" }}
    >
      <div className="row p-0">
        <div className="col-12 d-flex justify-content-center" id="container">
          <div className="col-10" id="wrapper">
            <div className="row justify-content-around w-100" id="background">
              <img src="assets/images/banner.svg" alt="" />
              <img src="assets/images/banner.svg" alt="" />
            </div>
            <div className="row w-100 justify-content-center " id="headingForm">
              <h1 style={{ fontWeight: "bold" }} id="title">
                Over 157,000 hotels and homes across 35 countries
              </h1>
            </div>
            <div
              style={{
                display: "flex",
                width: "85%",
                margin: "auto",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              {/* Search Box */}
              <div className="d-flex">
                <SearchBox
                  searchKey={searchKey}
                  handleChangeSearchKey={handleChangeSearchKey}
                />
              </div>
              {/* Date Dropdown */}
              <div id="homeCalender" className="headerSearchItem">
                <span id="dropdownDateButton" onClick={toggleDateRange}>
                  {`${format(dateRange[0].startDate, "MM/dd/yyyy")} - ${format(
                    dateRange[0].endDate,
                    "MM/dd/yyyy"
                  )}`}
                </span>
                {openDateRange && (
                  <div
                    aria-labelledby="dropdownDateButton"
                    id="dateDropDownContainer"
                  >
                    <DateRangePicker
                      editableDateInputs={true}
                      onChange={handleDateChange}
                      moveRangeOnFirstSelection={false}
                      ranges={dateRange}
                      className="date"
                      minDate={new Date()}
                    />
                  </div>
                )}
              </div>
              {/* Rooms Dropdown */}
              <div id="homeRoom" className="headerSearchItem">
                <span
                  type="button"
                  id="dropdownMenuButton"
                  onClick={showRoomsHandler}
                >
                  {roomCount} Rooms, {guestCount} Guests
                </span>
                <div
                  aria-labelledby="dropdownMenuButton"
                  id="addRoomsDropDownContainer"
                  style={showRooms ? { display: "block" } : { display: "none" }}
                >
                  <div id="addRoomsDropDownHead" style={{ display: "flex" }}>
                    <div>Rooms</div>
                    <div>Guests</div>
                  </div>
                  {handleRoomAndGuest()}
                  <div id="addRoomsDropDownHead">
                    <div onClick={() => handleAddRoom()}>Add Room</div>
                    <div onClick={() => handleDeleteRoom()}>Delete Room</div>
                  </div>
                </div>
              </div>
              {/* Search Button */}
              <div id="homebutton" style={{ height: "67px" }}>
                <p onClick={handleSearchHotel}>Search</p>
              </div>
            </div>
            {/* Searched Items */}
            <div
              id="items"
              style={{
                display: "flex",
                width: "75%",
                margin: "auto",
                alignItems: "center",
                marginTop: "15px",
              }}
            >
              <div id="searched">
                <span>Continue your search</span>
              </div>
              <div id="searchedPlace">
                <span>
                  Hyderabad Central India Transport 17 Sep - 20 Sep | 3 Guests
                </span>
              </div>
              <div id="searchedPlace">
                <span>
                  Hyderabad Central India Transport 17 Sep - 20 Sep | 3 Guests
                </span>
              </div>
              <div id="searchedPlace">
                <span>
                  Hyderabad Central India Transport 17 Sep - 20 Sep | 3 Guests
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBanner;
