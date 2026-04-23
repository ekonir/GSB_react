import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import "../styles/FraisTable.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


// Import du contexte et de l’URL API
import { useAuth } from "../context/AuthContext.js";
import { API_URL } from "../services/authService.js";

function VisiteurTable() {
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [visitList, setvisitList] = useState([]);
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
        setvisitList(response.data); // Met à jour l’état avec les données de l’API
      } catch (error) {
        console.error("Erreur lors de la récupération de la liste des visiteurs:", error);
      } finally {
        setLoading(false); // Met fin à l’état de chargement
      }
    };
    fetchVisit();
  }, [user, token]);

  if (loading) return <div><b>Chargement de la liste des visiteurs...</b></div>;

  // Logique de filtrage
  const filterVisit = visitList
   .filter((visiteur) => visiteur.nom_visiteur.toUpperCase().includes(searchTerm.toUpperCase()) || visiteur.nom_laboratoire.toUpperCase().includes(searchTerm.toUpperCase())
    );

  return (
    <div className="frais-table-container">
      <h2>Liste des visiteur</h2>


      {/* Champ de recherche */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher par nom de visiteur ou de laboratoirs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div> 
      <div className="top10">
          {<button onClick={() => navigate(`/Top10`)} className="edit-button"> Top 10 </button>}
      </div>

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
          {filterVisit.map((visit) => (
            <tr key={visit.id_visiteur}>
              <td>{visit.nom_visiteur}</td>
              <td>{visit.prenom_visiteur}</td>
              <td>{visit.nom_laboratoire}</td>
              <td>{<button onClick={() => navigate(`/gestion/${visit.id_visiteur}`)} className="edit-button"> Voir Activité complementaire </button>}

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VisiteurTable;