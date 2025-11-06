import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-container">
        <div>
          <span>
            <strong>
              GSB Frais
            </strong>
          </span>
        </div>
        <div>
          <Link to="/" className="nav-link home">Accueil</Link>
          <Link to="/dashboard" className="nav-link dashboard">Tableau de bord</Link>
        </div>
        <div>
          <Link to="/" className="nav-link logout">Déconnexion</Link>
          <Link to="/login" className="nav-link login">Connexion</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
