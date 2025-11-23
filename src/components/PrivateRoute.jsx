import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { token, loading } = useAuth(); 
 if (loading) {
    return <div>Chargement...</div>;
  }
  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;