// src/components/FraisTable.jsx
// TODO (question 2) : importer les dépendances nécessaires
import { useState, useEffect } from "react";
import React from "react";

import fraisData from "../data/frais.json";
import "../styles/FraisTable.css";

// TODO (question 3): déclarer un composant fonctionnel FraisTable
function FraisTable() {

  // TODO (question 4): Déclarer l'état 'frais' avec useState
  const [fraisList, setFraisList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterNonNull, setFilterNonNull] = useState(true)
  const [minMontant, setMontant] = useState("");


  useEffect(() => {
    // simulation d'un appel API avec un delai de 500ms
    setTimeout(() => {
      setFraisList(fraisData);//met à jour l'état avec les données du fichier json
      setLoading(false);//met fin a l'etat de chargement
    }, 550);// Delai du chargement
  }, []);//tableau de dépendances vide = éxécute 1 seule fois

  if (loading) return <div><b>Chargement des frais...</b></div>

  //Logique de filtrage : filtre les frais en fonction du terme de recherche
  const filteredFrais = fraisList
    .filter((f) =>
      minMontant === "" || (f.montantvalide !== null && f.montantvalide > parseFloat(minMontant)))
    .filter((frais) => !filterNonNull || frais.montantvalide !== null) // applique le filtre seulement si la case est cochée
    .filter((frais) =>
      frais.anneemois.includes(searchTerm) ||
      frais.id_visiteur.toString().includes(searchTerm)
    );


  return (
    <div className="frais-table-container">
      <h2>Liste des Frais</h2>

      {/* Case à cocher */}
      <div className="filter-container">
        <label>
          <input
            type="checkbox"
            checked={filterNonNull}
            onChange={(e) => setFilterNonNull(e.target.checked)}
          />
          Afficher seulement les frais avec un montant validé
        </label>
      </div>


      {/*Champ de recherche pour le filtrage*/}
      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher par année-mois, ID visiteur ou montant..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}//met a jour le searchTerm
        />
      </div>
      {/* Champ pour filtrer par montant minimum */}
      <div className="amount-filter">
        <label>
          Montant minimum validé (€) :
          <input
            type="number"
            value={minMontant}
            onChange={(e) => setMontant(e.target.value)}
          />
        </label>
      </div>
      {/* TODO (question 5): Compléter les en-têtes du tableau */}
      <table className="frais-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>ID État</th>
            <th>Année-Mois</th>
            <th>ID Visiteur</th>
            <th>Nombre de justificatifs</th>
            <th>Date de modification</th>
            <th>Montant saisi (€)</th>
            <th>Montant validé (€)</th>
          </tr>
        </thead>
        <tbody>
          {/* TODO (question 6): Utiliser la méthode map pour afficher chaque frais */}
          {/* TODO (question 7): Ajouter l'id du frais comme valeur pour key */}
          {filteredFrais.map((frais) => (
            <tr key={frais.id_frais}>
              <td>{frais.id_frais}</td>
              <td>{frais.id_etat}</td>
              <td>{frais.anneemois}</td>
              <td>{frais.id_visiteur}</td>
              <td>{frais.nbjustificatifs}</td>
              <td>{frais.datemodification}</td>
              <td></td>
              <td>{frais.montantvalide !== null ? frais.montantvalide : ""}€</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FraisTable;