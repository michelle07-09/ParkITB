import { createContext, useContext } from "react";

export type AuthData = {
     claims?: Record<string, any> | null;
     profile?: any | null;
     isLoading: boolean;
     isLoggedIn: boolean;
     activePark?: any | null;
};

export const AuthContext = createContext<AuthData>({
     claims: undefined,
     profile: undefined,
     isLoading: true,
     isLoggedIn: false,
     activePark: undefined,
});

export const useAuthContext = () => useContext(AuthContext);
