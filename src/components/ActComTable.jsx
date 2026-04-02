import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import "../styles/FraisTable.css";
import { useNavigate } from "react-router-dom";

// Import du contexte et de l’URL API
import { useAuth } from "../context/AuthContext.js";
import { API_URL } from "../services/authService.js";

function ActComTable() {
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [actComList, setacttList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    const fetchVisit = async () => {
      try {
        const response = await axios.get(
          `${API_URL}listerVisit`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setacttList(response.data); // Met à jour l’état avec les données de l’API
      } catch (error) {
        console.error("Erreur lors de la récupération des visiteur:", error);
      } finally {
        setLoading(false); // Met fin à l’état de chargement
      }
    };
    fetchVisit();
  }, [user, token]);

  if (loading) return <div><b>Chargement de la liste des visiteurs...</b></div>;

  // Logique de filtrage
  const filteractCom = actComList
   .filter((visiteur) => visiteur.nom_visiteur.toUpperCase().includes(searchTerm.toUpperCase()) || visiteur.nom_laboratoire.toUpperCase().includes(searchTerm.toUpperCase())
    );

  return (
    <div className="frais-table-container">
      <h2>Listes activité complementaire de l'utilisateur </h2>
    

      {/* Tableau */}
      <table className="frais-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Laboratoire</th>
            <th>Activités complémentaires</th>

          </tr>
        </thead>
        <tbody>
          {filteractCom.map((actCom) => (
            <tr key={actCom.id_visiteur}>
              <td>{actCom.nom_visiteur}</td>
              <td>{actCom.prenom_visiteur}</td>
              <td>{actCom.nom_laboratoire}</td>
              <td>activité complemetntaire</td>
              <td>
                
                   {/* Tableau <button onClick={() => navigate(`/frais/modifier/${frais.id_frais}`)}
                  className="edit-button"
                >
                  Modifier
                </button>*/}


              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ActComTable;