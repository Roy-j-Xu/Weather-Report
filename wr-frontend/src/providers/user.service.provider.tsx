import { createContext, useContext } from "react";
import UserService from "../services/user.service";

const UserServiceContext = createContext<UserService | null>(null);

function UserServiceProvider({ children }: {children: React.ReactNode}) {
    const userService = new UserService();
    return (
        <UserServiceContext.Provider value={userService}>
            {children}
        </UserServiceContext.Provider>
    );
}

function useUserService(): UserService {
    const userService = useContext(UserServiceContext);
    if (!userService) throw new Error("CityService within the context is null.");
    return userService;
}

export { useUserService, UserServiceProvider };