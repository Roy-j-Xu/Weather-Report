import { useEffect, useState } from "react";
import CityService from "../../../../services/city.service";
import CityTable from "./city.table";
import City from "../../../../types/city.type";
import CityPageButtons from "./city.pagebuttons";
import CitySearchbar from "./city.searchbar";
import { CITIES_PER_PAGE } from "../../../../constants/ui.constants";

const cityService = new CityService();

const initialTotalPage = 20;

function CitySearchGroup() {
    const [cityName, setCityName] = useState("");
    const [stateId, setStateId] = useState("");
    const [page, setPage] = useState(1);

    const [totalPage, setTotalPage] = useState(initialTotalPage);

    const [cities, setCities] = useState<City[]>([]);

    useEffect(() => {
        cityService.searchCity(cityName, stateId, page)
            .then((cities) => setCities(cities));
    }, [cityName, stateId, page]);

    useEffect(() => {
        cityService.searchCount(cityName, stateId)
            .then((result) => setTotalPage(Math.ceil(result / CITIES_PER_PAGE)));
    }, [cityName, stateId]);
    

    const onButtonClick = (index: number | string) => {
        return () => {
            if (typeof index === "number") setPage(index);
            else if (index === "first") setPage(1);
            else if (index === "last") setPage(totalPage);
            else throw new TypeError("Button index can only be number, \"first\" or \"last\".");
        }
    };

    const search = (cityName: string, stateId: string) => {
        setCityName(cityName);
        setStateId(stateId);
        setPage(1);
    };

    return (
        <div>
            <CitySearchbar search={search} />
            <CityTable cities={cities} />
            <CityPageButtons page={page} totalPage={totalPage} onClick={onButtonClick} />
        </div>
    );

}

export default CitySearchGroup;