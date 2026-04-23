import React from "react";
import { useAuth } from "../context/AuthContext.js";
import ActComTable from "../components/ActComTable.jsx";
import '../styles/Navbar.css'
 
function Top10() {
  const { user } = useAuth();

  return (
    <div>

      {user ? (
        // src/components/GestionVisiteur.jsx
      // Affichage du composant VisiteurTable
      <ActComTable />

      ) : (
        <p>Vous devez être connecté pour accéder a cette page.</p>
      )}
    </div>
  );
}

export default Top10;