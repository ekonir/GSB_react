import React from "react";
import { useAuth } from "../context/AuthContext.js";
import ActComTable from "../components/ActComTable.jsx";
import '../styles/Navbar.css'
 
function Top10() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Les 10 visiteurs ayant invité le plus de praticiens à des activités complémentaires</h1>

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