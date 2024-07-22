import CitySearchGroupContainer from "./city.search.group.container";
import { CityServiceProvider } from "./city.service.provider";

export default function CitySearchGroup() {
    return (
        <CityServiceProvider>
            <CitySearchGroupContainer />
        </CityServiceProvider>
    );
}