import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './styles/Navbar.css'
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import FraisAdd from "./pages/FraisAdd";
import FraisEdit from "./components/FraisEdit";
import Home from './pages/Home';
import FraisHorsForfait from "./pages/FraisHorsForfait";
import FraisHorsForfaitAdd from "./pages/FraisHorsForfaitAdd";
import FraisHorsForfaitEdit from "./pages/FraisHorsForfaitEdit";
import GestionVisiteur from "./pages/GestionVisiteur";
import GestionActCo from "./pages/GestionActCo";
import Top10 from "./pages/Top10";

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
          <Route path="/frais/:id/hors-forfait/ajouter" element={<FraisHorsForfaitAdd />} />
          <Route path="/frais/:id/hors-forfait/modifier/:idHF" element={<FraisHorsForfaitEdit />} />
          
          <Route path="/gestion" element={<PrivateRoute><GestionVisiteur /></PrivateRoute>} />
          <Route path="/gestion/:id" element={<PrivateRoute><GestionActCo/></PrivateRoute>} />
          <Route path="/top10" element={<PrivateRoute><Top10/></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;