import { createContext, useContext, useState } from "react";

// 1. Création du contexte
const AuthContext = createContext();

// 2. Fournisseur du contexte (AuthProvider)
export function AuthProvider({ children }) {
  // État local pour stocker l'utilisateur (null = non connecté)
  const [user, setUser] = useState(null);

  // 3. Fonction de connexion
  const loginUser = (login, password) => {
    // Vérification simplifiée : login = 'Andre', password = 'secret'
    if (login === "Andre" && password === "secret") {
      setUser({ login }); // mise à jour de l'état avec le login
      return true;        // connexion réussie
    } else {
      return false;       // connexion échouée
    }
  };

  // 4. Fonction de déconnexion
  const logoutUser = () => {
    setUser(null); // réinitialiser l'état à null
  };

  // 5. Valeurs exposées aux composants enfants
  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children} {/* rend les composants enfants (ex: App) */}
    </AuthContext.Provider>
  );
}

// 6. Hook personnalisé pour utiliser le contexte facilement
export function useAuth() {
  return useContext(AuthContext);
}