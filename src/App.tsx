import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Orders } from "./pages/Orders";
import { Advertisment } from "./pages/Advertisement";
import { Advertisements } from "./pages/Advertisements";
import { NavBar } from "./components/NavBar";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/advertisements" />} />
        <Route path="/advertisements" element={<Advertisements />} />
        <Route path="/advertisements/:id" element={<Advertisment />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </Router>
  );
};

export default App;
