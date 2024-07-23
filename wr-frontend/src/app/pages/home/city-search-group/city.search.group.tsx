import CitySearchGroupContainer from "./city.search.group.container";
import { CityServiceProvider } from "./city.service.provider";
import "./city.search.group.css"

export default function CitySearchGroup() {
    return (
        <CityServiceProvider>
            <CitySearchGroupContainer />
        </CityServiceProvider>
    );
}