import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


function Navbar() {
  const { user, logoutUser } = useAuth();

  return (
    <nav className="nav">
      <div className="nav-container">
        <div>
          <span><strong>GSB Frais</strong></span>
          <Link to="/" className="nav-link home">Accueil</Link>
          {user && <Link to="/dashboard" className="nav-link dashboard">Tableau de bord</Link>}
          {user && <Link to="/frais/ajouter" className="nav-link add-frais">Saisir un frais</Link>}
          {user && <Link to="/gestion" className="nav-link Gestion">Gestion Visiteur</Link>}

       
          {user ? (
            
            <button id="deco" onClick={logoutUser} style={{ color: 'white', background: 'none', border: 'none',cursor: "pointer", textdecoration: "underline" }}> Déconnexion</button>

          ) : (
            <Link to="/login" className="nav-link login">Connexion</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;