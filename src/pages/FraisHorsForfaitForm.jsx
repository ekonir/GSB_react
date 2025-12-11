// src/pages/FraisHorsForfaitForm.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../services/authService";
import "../styles/FraisHorsForfait.css";

function FraisHorsForfaitForm({ idFrais, fraisHF = null }) {
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [libelle, setLibelle] = useState("");
  const [montant, setMontant] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (fraisHF) {
      setDate(fraisHF.date_fraishorsforfait || "");
      setLibelle(fraisHF.lib_fraishorsforfait || "");
      setMontant(fraisHF.montant_fraishorsforfait || "");
    }
  }, [fraisHF]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!date || !libelle || !montant) {
      setError("Tous les champs sont obligatoires");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (fraisHF) {
        await axios.post(
          `${API_URL}fraisHF/modif`,
          {
            id_fraisHF: fraisHF.id_fraishorsforfait,
            date,
            libelle,
            montant: parseFloat(montant),
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          `${API_URL}fraisHF/ajout`,
          {
            id_frais: parseInt(idFrais),
            date,
            libelle,
            montant: parseFloat(montant),
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      navigate(`/frais/${idFrais}/hors-forfait`);
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'enregistrement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="frais-hors-forfait-form" onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}
<div className="form-group">
  <label>Date</label>
      <input
        type="text"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder="AAAA-MM-DD"
        required
      />
</div>
<div className="form-group">
    <label>Libelle</label>
      <input
        type="text"
        value={libelle}
        onChange={(e) => setLibelle(e.target.value)}
        placeholder="Libellé"
        required
      />
      </div>
<div className="form-group">
<label>Montant (€)</label>
      <input
        type="number"
        step="0.01"
        value={montant}
        onChange={(e) => setMontant(e.target.value)}
        placeholder="Montant (€)"
        required
      />
</div>
      <div style={{ display: "flex", gap: "10px" }}>
        <button type="submit" disabled={loading}>
          {loading ? "Enregistrement..." : fraisHF ? "Modifier" : "Ajouter"}
        </button>
        <button
          type="button"
          className="return-button"
          onClick={() => navigate(`/frais/${idFrais}/hors-forfait`)}
        >
          Retour
        </button>
      </div>
    </form>
  );
}

export default FraisHorsForfaitForm;
