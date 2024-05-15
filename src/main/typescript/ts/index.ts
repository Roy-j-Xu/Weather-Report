import { createCityTableSet } from "./components/city_table";


let [cityTable, pageButtons] = createCityTableSet();


document.body.appendChild(cityTable.getElement());
document.body.appendChild(pageButtons.getElement());