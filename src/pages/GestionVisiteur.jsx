import React from "react";
import { useAuth } from "../context/AuthContext";
import VisiteurTable from "../components/VisiteurTable.jsx"; 
import '../styles/Navbar.css'
 
function GestionVisiteur() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Gestion des visiteurs</h1>

      {user ? (
        // src/components/GestionVisiteur.jsx
      // Affichage du composant VisiteurTable
      <VisiteurTable />

      ) : (
        <p>Vous devez être connecté pour accéder a la gestion des visiteurs.</p>
      )}
    </div>
  );
}

export default GestionVisiteur;