import { useParams } from "react-router-dom";
import FraisHorsForfaitForm from "./FraisHorsForfaitForm";
import "../styles/FraisHorsForfait.css";

function FraisHorsForfaitAdd() {
  const { id } = useParams();
  return (
    <div className="frais-hors-forfait-container">
      <h2>Ajouter un frais hors forfait</h2>
      <FraisHorsForfaitForm idFrais={id} />
    </div>
  );
}

export default FraisHorsForfaitAdd;


