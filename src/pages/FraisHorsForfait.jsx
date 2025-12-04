import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// Import API
import { API_URL } from "../services/authService.js";
import FraisHorsForfaitTable from "../components/FraisHorsForfaitTable.jsx";

function FraisHorsForfait() {
  const { id } = useParams();   // Récupère l’ID du frais dans l’URL

  const [fraisHorsForfaitList, setFraisHorsForfaitList] = useState([]);
  const [loading, setLoading] = useState(true);

  // ────────────────────────────────────────────────
  // Récupérer les frais hors forfait pour l'id donné
  // ────────────────────────────────────────────────
  useEffect(() => {
    const fetchFraisHorsForfaitList = async () => {
      try {
        const response = await axios.get(
          `http://gsb.julliand.etu.lmdsio.com/api/fraisHF/liste/${id}`
        );

        setFraisHorsForfaitList(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des frais HF :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFraisHorsForfaitList();
  }, [id]);

  if (loading) return <b>Chargement des frais hors forfait...</b>;

  return (
    <div>
      <h2>Frais hors forfait du frais n° {id}</h2>

      {/* Passage des props au composant enfant */}
      <FraisHorsForfaitTable
        idFrais={id}
        fraisHFList={fraisHorsForfaitList}
      />
    </div>
  );
}

export default FraisHorsForfait;
