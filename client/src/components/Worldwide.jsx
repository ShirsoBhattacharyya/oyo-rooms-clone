import { useState } from "react";
import "./styles/Worldwide.css";

const Worldwide = () => {
  const [uae, setuae] = useState(false);
  const [nepal, setnepal] = useState(false);
  const [china, setchina] = useState(false);
  const [india, setindia] = useState(false);
  const [malaysia, setmalaysia] = useState(false);
  const [indo, setindo] = useState(false);
  const handleUae = () => {
    setuae(true);
  };
  const handlenepal = () => {
    setnepal(true);
  };
  const handlechina = () => {
    setchina(true);
  };
  const handleindia = () => {
    setindia(true);
  };
  const handlemalaysia = () => {
    setmalaysia(true);
  };
  const handleindo = () => {
    setindo(true);
  };
  return (
    <div>
      <div className="world-wide">
        <div>
          {/* <div> */}
          <img src="/assets/images/map.png" alt="landing background map" />
          {uae ? <div className="uaeDiv">UAE</div> : null}
          <img
            src="/assets/images/uae.png"
            alt="uae"
            className="uae"
            onMouseEnter={handleUae}
            onMouseLeave={() => {
              setuae(false);
            }}
          />
          {nepal ? <div className="nepalDiv">Nepal</div> : null}
          <img
            src="/assets/images/nepal.png"
            alt="nepal"
            className="nepal"
            onMouseEnter={handlenepal}
            onMouseLeave={() => {
              setnepal(false);
            }}
          />
          {china ? <div className="chinaDiv">China</div> : null}
          <img
            src="/assets/images/china.png"
            alt="china"
            className="china"
            onMouseEnter={handlechina}
            onMouseLeave={() => {
              setchina(false);
            }}
          />
          {india ? <div className="indiaDiv">India</div> : null}
          <img
            src="/assets/images/india.png"
            alt="india"
            className="india"
            onMouseEnter={handleindia}
            onMouseLeave={() => {
              setindia(false);
            }}
          />
          {malaysia ? <div className="malaysiaDiv">Malaysia</div> : null}
          <img
            src="/assets/images/malaysia.png"
            alt="malaysia"
            className="malaysia"
            onMouseEnter={handlemalaysia}
            onMouseLeave={() => {
              setmalaysia(false);
            }}
          />
          {indo ? <div className="indoDiv">Indonesia</div> : null}
          <img
            src="/assets/images/indonesia.png"
            alt="indonesia"
            className="indonesia"
            onMouseEnter={handleindo}
            onMouseLeave={() => {
              setindo(false);
            }}
          />
        </div>
        <div className="world-wide-right-section">
          <img
            style={{ height: "100%" }}
            src="/assets/images/homeWorld.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Worldwide;
