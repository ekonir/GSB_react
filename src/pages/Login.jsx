import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


function Login() {
 
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  // 4. Déclaration de la fonction handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    if (loginUser(login, password)) {
      navigate('/dashboard'); // Redirige vers /dashboard si succès
    } else {
      alert('Identifiants incorrects'); // Affiche une erreur si échec
    }
  };

  // 5. Rend le formulaire
  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Connexion</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <label>Login :</label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Mot de passe :</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Se connecter</button>
        </form>
      </div>
    </div>
  );
}


export default Login
