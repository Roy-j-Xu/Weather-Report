import { CityRepository, ForecastRepository } from "../../data/repositories";
import { CityTable } from "./city_table";
import { CityPageButtons, CitySearchBar } from "./side_components";

function createCityTableSet(): [CityTable, CityPageButtons, CitySearchBar] {

    
    const cityRepository = new CityRepository();
    const forecastRepository = new ForecastRepository();
    

    let cityTable = new CityTable(cityRepository, forecastRepository);
    let pageButtons = new CityPageButtons(cityTable);
    let searchBar = new CitySearchBar(cityRepository, cityTable);

    cityTable.showData();

    return [cityTable, pageButtons, searchBar];
}


export { createCityTableSet };