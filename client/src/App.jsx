import { Route, Routes } from "react-router-dom";
import {
  Checkout,
  Home,
  Hotel,
  Hotels,
  Login,
  Partner,
  Payment,
  Profile,
  Register,
} from "./pages";
import { PrivateRoute } from "./routes";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route
          path="/partner"
          element={
            <PrivateRoute>
              <Partner />
            </PrivateRoute>
          }
        />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/payment/:id" element={<Payment />} />
      </Routes>
    </>
  );
};

export default App;
