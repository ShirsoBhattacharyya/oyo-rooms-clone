import { useState } from "react";
import { RxChevronDown } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Navbarfunction = ({ name, more }) => {
  let navigate = useNavigate();
  const [div, setdiv] = useState(false);
  const handleEvent = () => {
    setdiv(true);
  };
  const searchHotels = (name) => {
    localStorage?.setItem("currentCity", name);
    navigate("/hotels");
  };
  return (
    <div>
      <div
        className="down"
        onClick={() => searchHotels(name)}
        onMouseEnter={handleEvent}
        onMouseLeave={() => {
          setdiv(false);
        }}
      >
        <p>{name}</p>
        <div>
          <RxChevronDown />
        </div>
        {/* <img src="/Images/down.png" alt="down" /> */}
      </div>

      {div ? (
        <div
          id="dropdown"
          onMouseEnter={handleEvent}
          onMouseLeave={() => {
            setdiv(false);
          }}
        >
          {more?.map((e, index) => (
            <p key={index}>{e}</p>
          ))}
        </div>
      ) : null}
    </div>
  );
};

Navbarfunction.propTypes = {
  name: PropTypes.string.isRequired,
  more: PropTypes.arrayOf(PropTypes.string),
};

export default Navbarfunction;
