import { createContext, useContext } from "react";
import CityService from "../../../../services/city.service";

const CityServiceContext = createContext<CityService | null>(null);

function CityServiceProvider({ children }: {children: React.ReactNode}) {
    const cityService = new CityService();
    return (
        <CityServiceContext.Provider value={cityService}>
            {children}
        </CityServiceContext.Provider>
    );
}

function useCityService(): CityService {
    const cityService = useContext(CityServiceContext);
    if (!cityService) throw new Error("CityService within the context is null.");
    return cityService;
}

export { useCityService, CityServiceProvider };