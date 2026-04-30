import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import "../styles/FraisTable.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


// Import du contexte et de l’URL API
import { useAuth } from "../context/AuthContext.js";
import { API_URL } from "../services/authService.js";

function Top() {
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [Top10List, settoptList] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();


  useEffect(() => {
    const fetchVisit = async () => {
      try {
        const response = await axios.get(
          `${API_URL}top10Visiteurs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        settoptList(response.data); // Met à jour l’état avec les données de l’API
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
  const filterTop = Top10List;


  return (
    <div className="frais-table-container">
      <h3>Les 10 visiteurs ayant invité le plus de praticiens à des activités complémentaires</h3>


      {/* Tableau */}
      <table className="frais-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Laboratoire</th>
            <th>Nombre d'activités</th>
          </tr>
        </thead>
        <tbody>
          {filterTop.map((t, index) => (

            <tr key={t.id_visiteur}>
              <td> {index + 1}</td>
              <td>{t.nom_visiteur}</td>
              <td>{t.prenom_visiteur}</td>
              <td>{t.nom_laboratoire}</td>
              <td>{t.total_activites}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Top;