import {
  Header,
  DropdownNavbar,
  SearchBanner,
  Worldwide,
  Footer,
} from "../components";
import "./styles/Home.css";

const Home = () => {
  return (
    <>
      <Header />
      <DropdownNavbar />
      <SearchBanner />
      <div className="belowNav">
        <img
          src="https://assets.oyoroomscdn.com/cmsMedia/f0be8dc3-e384-40b3-89f9-a0a0109159ce.jpg"
          alt="rectangle"
        />
      </div>
      <Worldwide />
      <Footer />
    </>
  );
};

export default Home;
