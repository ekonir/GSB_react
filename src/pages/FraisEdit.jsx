import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../services/authService";
import FraisForm from "../components/FraisForm";

function FraisEdit() {
  const { id } = useParams();
  const [frais, setFrais] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFrais = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token manquant");

        const response = await axios.get(`${API_URL}frais/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFrais(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFrais();
  }, [id]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return <FraisForm frais={frais} />;
}

export default FraisEdit;
