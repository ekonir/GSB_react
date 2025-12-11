import { Link } from "react-router-dom";
import "../styles/FraisHorsForfait.css";

function FraisHorsForfaitTable({ idFrais, fraisHFList, total, handleDelete }) {


  return (
    <div>
      <h2>Frais hors forfait</h2>
      <table className="frais-hors-forfait-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Montant (€)</th>
            <th>Libellé</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fraisHFList.map((f) => (
            <tr key={f.id_fraishorsforfait}>
              <td>{(f.date_fraishorsforfait)}</td>
              <td>{f.montant_fraishorsforfait}</td>
              <td>{f.lib_fraishorsforfait}</td>
              <td>
                <Link
                  className="frais-hors-forfait-link"
                  to={`/frais/${idFrais}/hors-forfait/modifier/${f.id_fraishorsforfait}`}
                >

                  Modifier
                </Link>{" "}
                <button onClick={() => handleDelete(f.id_fraishorsforfait)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>

  );
}

export default FraisHorsForfaitTable;
