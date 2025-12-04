import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'


//1. états locaux pour les champs du formulaire
function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useAuth();   // accès au contexte
  const navigate = useNavigate();

  //2. fonction de soumission du formulaire
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // appel à loginUser (asynchrone)
    await loginUser(login, password);

    // redirection si succès
    navigate('/dashboard');
  } catch (error) {
    // gestion des erreurs
    alert('Échec de la connexion : identifiants incorrects ou problème serveur');
    console.error(error);
  }
};

  //5. rendu du formulaire
  return (
    <div className="login-page">
      <div className="login-contener">
        <h1>Connexion</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <label>Login :</label>
            <input 
              name="login"
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Password :</label>
            <input 
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <button type="submit" className="btn btn-primary">Valider</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;