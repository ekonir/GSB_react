import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL, getCurrentUser } from "../services/authService";
import "../styles/FraisForm.css";

function FraisForm({ frais = null }) {
  const navigate = useNavigate();

  const [idFrais, setIdFrais] = useState(null);
  const [anneeMois, setAnneeMois] = useState("");
  const [nbJustificatifs, setNbJustificatifs] = useState("");
  const [montant, setMontant] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Pré-remplir le formulaire si on modifie un frais existant
  useEffect(() => {
    if (frais) {
      setIdFrais(frais.id_frais);
      setMontant(frais.montantvalide || "");
      setAnneeMois(frais.anneemois || "");
      setNbJustificatifs(frais.nbjustificatifs?.toString() || "");
    }
  }, [frais]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token manquant");

      const fraisData = {
        anneemois: anneeMois,
        nbjustificatifs: parseInt(nbJustificatifs, 10),
      };

      if (frais) {
        // Mise à jour d'un frais existant (UPDATE)
        fraisData["id_frais"] = idFrais;
        fraisData["montantvalide"] = parseFloat(montant);

        const response = await axios.post(`${API_URL}frais/modif`, fraisData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response);
      } else {
        // Ajout d'un nouveau frais (CREATE)
        fraisData["id_visiteur"] = getCurrentUser()["id_visiteur"];

        const response = await axios.post(`${API_URL}frais/ajout`, fraisData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response);
      }

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Erreur lors de l'enregistrement"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="frais-form-container">
      <h2>{frais ? "Modifier le frais" : "Saisir un frais"}</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="frais-form">
        <label>
          Année-Mois :
          <input
            type="text"
            value={anneeMois}
            onChange={(e) => setAnneeMois(e.target.value)}
            required
          />
        </label>

        <label>
          Nombre de justificatifs :
          <input
            type="number"
            value={nbJustificatifs}
            onChange={(e) => setNbJustificatifs(e.target.value)}
            required
          />
        </label>

        {frais && (
          <label>
            Montant validé (€) :
            <input
              type="number"
              step="0.01"
              value={montant}
              onChange={(e) => setMontant(e.target.value)}
              required
            />
          </label>
        )}

        <button type="submit" disabled={loading}>
          {loading
            ? "Enregistrement..."
            : frais
            ? "Mettre à jour"
            : "Ajouter"}
        </button>
      </form>
    </div>
  );
}

export default FraisForm;
