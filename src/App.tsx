import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Register } from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Summary from "./pages/Dashboard/Summary/Summary";
import Wallet from "./pages/Dashboard/Wallet/Wallet";
import Coins from "./pages/Dashboard/Coins/Coins";
import Profile from "./components/Profile/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Summary />} />
          <Route path="summary" element={<Summary />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="coin" element={<Coins />} />
        <Route path="profile" element={<Profile />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
