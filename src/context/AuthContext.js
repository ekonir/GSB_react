import { createContext, useContext, useState, useEffect } from "react";
import { signIn, logout, getCurrentUser, getAuthToken } from "../services/authService";

// 1. Création du contexte
const AuthContext = createContext();

// 2. Fournisseur du contexte
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // 6. Effet de bord pour recharger user/token depuis localStorage
  useEffect(() => {
    const user = getCurrentUser();
    const token = getAuthToken();
    if (user && token) {
      setUser(user);
      setToken(token);
    }
    setLoading(false);
  }, []);

  // 3. Fonction de connexion
  const loginUser = async (login, password) => {
    setLoading(true);
    const data = await signIn(login, password);
    setUser(data.visiteur);
    setToken(data.access_token);
    setLoading(false);
    return data;
  };

  // 2. Fonction de déconnexion
  const logoutUser = () => {
    logout();        // supprime du localStorage
    setUser(null);   // réinitialise l’état user
    setToken(null);  // réinitialise l’état token
  };

  // 3. Exposer logoutUser aussi
  return (
    <AuthContext.Provider value={{ user, token, loading, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// 6. Hook personnalisé
export function useAuth() {
  return useContext(AuthContext);
}