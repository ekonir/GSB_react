import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import './styles/Navbar.css'
import PrivateRoute from "./components/PrivateRoute";
import FraisAdd from "./pages/FraisAdd";
import FraisEdit from "./components/FraisEdit";
import Home from './pages/Home';
import FraisHorsForfait from "./pages/FraisHorsForfait";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/frais/ajouter" element={<FraisAdd />} />
          <Route path="/frais/modifier/:id" element={<FraisEdit />} />
          <Route path="/frais/:id/hors-forfait" element={<FraisHorsForfait />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;