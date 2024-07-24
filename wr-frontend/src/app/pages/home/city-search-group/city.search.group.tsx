import "./city.search.group.css"
import { useEffect, useState } from "react";
import CityTable from "./city.table";
import City from "../../../../types/city.type";
import CityPageButtons from "./city.pagebuttons";
import CitySearchbar from "./city.searchbar";
import { useCityService } from "../../../../providers/city.service.provider";


function CitySearchGroup() {
    const cityService = useCityService();

    const [cityName, setCityName] = useState("");
    const [stateId, setStateId] = useState("");
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(20);
    const [cities, setCities] = useState<City[]>([]);


    useEffect(() => {
        cityService.searchCity(cityName, stateId, page)
            .then((cities) => setCities(cities));
    }, [cityName, stateId, page]);

    useEffect(() => {
        cityService.searchPageCount(cityName, stateId)
            .then((result) => setTotalPage(result));
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