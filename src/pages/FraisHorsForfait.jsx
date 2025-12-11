import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../services/authService";
import FraisHorsForfaitTable from "../components/FraisHorsForfaitTable";
import "../styles/FraisHorsForfait.css";

function FraisHorsForfait() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [fraisHFList, setFraisHFList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchFraisHorsForfaitList = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}fraisHF/liste/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFraisHFList(response.data);

       // calcul du total des frais hors forfait 
       let somme = 0; response.data.forEach((fraisHorsForfait) => {
        somme += parseFloat(fraisHorsForfait.montant_fraishorsforfait);
      });
      setTotal(somme);

      } catch {
        setError("Erreur lors du chargement");
      } finally {
        setLoading(false);
      }
    };

    fetchFraisHorsForfaitList();
  }, [id]);

  const handleDelete = async (idHF) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}fraisHF/suppr`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { id_fraisHF: idHF },
      });
      const response = await axios.get(`${API_URL}fraisHF/liste/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // fetchFraisHorsForfaitList();
      setFraisHFList(response.data);
    } catch {
      setError("Suppression impossible");
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="frais-hors-forfait-container">

      <FraisHorsForfaitTable
        idFrais={id}
        fraisHFList={fraisHFList}
        handleDelete={handleDelete}
      />
      <div className="total">Total : {total.toFixed(2)} €</div>
<button
        type="button"
        className="add-button"
        onClick={() => navigate(`/frais/${id}/hors-forfait/ajouter`)}
      >
        Ajouter
      </button>
      <button
        type="button"
        className="return-button"
        onClick={() => navigate(`/frais/modifier/${id}`)}
      >
        Retour
      </button>
      

    </div>
  );
}

export default FraisHorsForfait;