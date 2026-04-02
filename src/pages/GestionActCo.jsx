import React from "react";
import { useAuth } from "../context/AuthContext.js";
import ActComTable from "../components/ActComTable.jsx";
import '../styles/Navbar.css'
 
function GestionVisiteur() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Gestion des activité complementaire des visiteurs</h1>

      {user ? (
        // src/components/GestionVisiteur.jsx
      // Affichage du composant VisiteurTable
      <ActComTable />

      ) : (
        <p>Vous devez être connecté pour accéder a la gestion des activité complementaire des visiteurs.</p>
      )}
    </div>
  );
}

export default GestionVisiteur;