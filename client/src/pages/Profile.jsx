import { Wallet, History, UserDetails, Header } from "../components";
import "./styles/Profile.css";

const Profile = () => {
  return (
    <>
      <Header />
      <div id="profile_Box">
        <Wallet />
        <History />
        <UserDetails />
      </div>
    </>
  );
};

export default Profile;
