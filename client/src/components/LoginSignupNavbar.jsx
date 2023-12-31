import { Link } from "react-router-dom";

const LoginSignupNavbar = () => {
  return (
    <div id="sl-nav">
      <div className="sl-nav-elem">
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/19/OYO_Rooms_%28logo%29.png"
            alt=""
            width="100"
          />
        </Link>
        <p>Hotels and homes across 800 cities, 24+ countries</p>
      </div>
    </div>
  );
};

export default LoginSignupNavbar;
