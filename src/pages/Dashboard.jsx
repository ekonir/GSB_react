import React from "react";
import { useAuth } from "../context/AuthContext";
import FraisTable from "../components/FraisTable.jsx"; 
import '../styles/Navbar.css'
 
function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Tableau de bord</h1>
            <p>Bienvenue <b>{user.login}</b> !</p>
      {user ? (
        // src/components/Dashboard.jsx
      // Affichage du composant FraisTable
      <FraisTable />

      ) : (
        <p>Vous devez être connecté pour accéder au tableau de bord.</p>
      )}
    </div>
  );
}

export default Dashboard;