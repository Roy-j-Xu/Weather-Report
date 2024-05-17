import { CityRepository, ForecastRepository } from "../../data/repositories";
import { CityTable } from "./city_table";
import { CityPageButtons } from "./side_components";

function createCityTableSet(): [CityTable, CityPageButtons] {

    
    const cityRepository = new CityRepository();
    const forecastRepository = new ForecastRepository();
    

    let cityTable = new CityTable(cityRepository, forecastRepository);
    let pageButtons = new CityPageButtons(cityTable);

    cityTable.showData();

    return [cityTable, pageButtons];
}


export { createCityTableSet };