import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import "../styles/FraisTable.css";
import { useNavigate } from "react-router-dom";

// Import du contexte et de l’URL API
import { useAuth } from "../context/AuthContext.js";
import { API_URL } from "../services/authService.js";

function VisiteurTable() {
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [visitList, setvisitList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterNonNull, setFilterNonNull] = useState(true);
  const [minMontant, setMontant] = useState("");


  useEffect(() => {
    const fetchFrais = async () => {
      try {
        const response = await axios.get(
          `${API_URL}frais/liste/${user.id_visiteur}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setvisitList(response.data); // Met à jour l’état avec les données de l’API
      } catch (error) {
        console.error("Erreur lors de la récupération des frais:", error);
      } finally {
        setLoading(false); // Met fin à l’état de chargement
      }
    };
    fetchVisit();
  }, [user, token]);

  if (loading) return <div><b>Chargement des frais...</b></div>;

  // Logique de filtrage
  const filterVisit = fraisList
    .filter((f) =>
      minMontant === "" || (f.montantvalide !== null && f.montantvalide > parseFloat(minMontant))
    )
    .filter((frais) => !filterNonNull || frais.montantvalide !== null)
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

      {/* Champ de recherche */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher par année-mois, ID visiteur ou montant..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      

      {/* Tableau */}
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
            <th>Actions</th>

          </tr>
        </thead>
        <tbody>
          {filteredFrais.map((frais) => (
            <tr key={frais.id_frais}>
              <td>{frais.id_frais}</td>
              <td>{frais.id_etat}</td>
              <td>{frais.anneemois}</td>
              <td>{frais.id_visiteur}</td>
              <td>{frais.nbjustificatifs}</td>
              <td>{frais.datemodification}</td>
              <td>{frais.montantsaisi !== null ? frais.montantsaisi : ""}€</td>
              <td>{frais.montantvalide !== null ? frais.montantvalide : ""}€</td>
              <td>
                <button onClick={() => navigate(`/frais/modifier/${frais.id_frais}`)}
                  className="edit-button"
                >
                  Modifier
                </button>

                <button
                  onClick={() => handleDelete(frais.id_frais)}
                  className="delete-button"
                >
                  Supprimer
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VisiteurTable;