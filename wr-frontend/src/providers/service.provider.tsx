import { AuthServiceProvider, useAuthService } from "./auth.service.provider";
import { CityServiceProvider, useCityService } from "./city.service.provider";
import { UserServiceProvider, useUserService } from "./user.service.provider";


function ServiceProvider({ children }: {children: React.ReactNode}) {
    return (
        <UserServiceProvider>
            <AuthServiceProvider>
                <CityServiceProvider>
                    {children}
                </CityServiceProvider>
            </AuthServiceProvider>
        </UserServiceProvider>
    );
}

export { 
    ServiceProvider,
    useAuthService,
    useUserService,
    useCityService
}