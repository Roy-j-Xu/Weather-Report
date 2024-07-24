import { createContext, useContext } from "react";
import AuthService from "../services/auth.service";

const AuthServiceContext = createContext<AuthService | null>(null);

function AuthServiceProvider({ children }: {children: React.ReactNode}) {
    const authService = new AuthService();
    return (
        <AuthServiceContext.Provider value={authService}>
            {children}
        </AuthServiceContext.Provider>
    );
}

function useAuthService(): AuthService {
    const authService = useContext(AuthServiceContext);
    if (!authService) throw new Error("CityService within the context is null.");
    return authService;
}

export { useAuthService, AuthServiceProvider };