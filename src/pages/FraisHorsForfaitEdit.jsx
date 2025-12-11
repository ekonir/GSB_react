import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../services/authService";
import FraisHorsForfaitForm from "./FraisHorsForfaitForm";
import "../styles/FraisHorsForfait.css";

function FraisHorsForfaitEdit() {
  const { id, idHF } = useParams();
  const [fraisHF, setFraisHF] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFraisHF = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}fraisHF/${idHF}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFraisHF(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchFraisHF();
  }, [idHF]);

  if (loading) return <p>Chargement...</p>;
  if (!fraisHF) return <p>Frais hors forfait introuvable.</p>;

  return (
    <div className="frais-hors-forfait-container">
      <h2>Modifier un frais hors forfait</h2>
<FraisHorsForfaitForm idFrais={id} fraisHF={fraisHF} />
    </div>
  );
}

export default FraisHorsForfaitEdit;
