import { createCityTableSet } from "./components/city_table/city_table_factory";


let [cityTable, pageButtons] = createCityTableSet();


document.body.appendChild(cityTable.getElement());
document.body.appendChild(pageButtons.getElement());