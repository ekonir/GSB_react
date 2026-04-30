import React from "react";
import { useAuth } from "../context/AuthContext.js";
import Top from "../components/Top.jsx";
import '../styles/Navbar.css'
 
function Top10() {
  const { user } = useAuth();

  return (
    <div>

      {user ? (
      // Affichage du composant VisiteurTable
      <Top />

      ) : (
        <p>Vous devez être connecté pour accéder a cette page.</p>
      )}
    </div>
  );
}

export default Top10;