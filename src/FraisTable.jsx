// TODO (question 2) : importer les dépendances nécessaires


// TODO (question 3): déclarer un composant fonctionnel FraisTable
 {
  // TODO (question 4): Déclarer l'état 'frais' avec useState
  
  return (
    <div className="frais-table-container">
      <h2>Liste des Frais</h2>
      {/* TODO (question 5): Compléter les en-têtes du tableau */}
      <table className="frais-table">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            {/* TODO (question 6): Utiliser la méthode map pour afficher chaque frais */}
            {/* TODO (question 7): Ajouter l'id du frais comme valeur pour key */}
           
        </tbody>
      </table>
    </div>
  );
};

export default FraisTable;
