// src/pages/FraisAdd.jsx
import React from "react";
import FraisForm from "../components/FraisForm";

function FraisAdd() {
  return (
    <div className="frais-add-page">
      <h1>Ajouter une note de frais</h1>
      <FraisForm /> {/* Formulaire partagé pour l’ajout */}
    </div>
  );
}

export default FraisAdd;
