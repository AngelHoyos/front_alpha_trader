import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Register } from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Summary from "./pages/Dashboard/Summary/Summary";
import Wallet from "./pages/Dashboard/Wallet/Wallet";
import Coins from "./pages/Dashboard/Coins/Coins";
import Profile from "./components/Profile/Profile";
import CoinDetails from "./pages/Dashboard/Coins/components/CoinDetails/CoinDetails";
import AlphaX from "./pages/Dashboard/AlphaX/AlphaX";
import { PrivateRoute } from "./auth/PrivateRoute";
import RecoveryPassword from "./pages/RecoveryPassword/RecoveryPassword";
import AuthGoogleSuccess from "./pages/AuthGoogleSuccess/AuthGoogleSuccess";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recover-password" element={<RecoveryPassword />} />
        <Route path="/auth/google/success" element={<AuthGoogleSuccess />} /> 

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >        
          <Route index element={<Summary />} />
          <Route path="summary" element={<Summary />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="coin" element={<Coins />} />
          <Route path="profile" element={<Profile />} />
          <Route path="coins/:id" element={<CoinDetails />} />
          <Route path="Alpha_X" element={<AlphaX />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
