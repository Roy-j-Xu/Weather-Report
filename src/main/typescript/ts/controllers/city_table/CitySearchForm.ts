import { CityTable } from "../../components/city_table/city_table";
import { CityPageButtons, CitySearchBar } from "../../components/city_table/side_components";
import { CityRepository } from "../../data/repositories";

class CitySearchForm {
    private page: number;
    private state: string;
    private input: string;

    constructor(
        cityRepository: CityRepository,
        cityTable: CityTable,
        citySearchBar: CitySearchBar,
        cityPageButtons: CityPageButtons
    ) {

    }


    private addListeners(): void {

    }

}