import { createCityTableSet } from "./components/city_table/city_table_factory";


let [cityTable, pageButtons, searchBar] = createCityTableSet();

document.body.appendChild(searchBar.getElement());
document.body.appendChild(cityTable.getElement());
document.body.appendChild(pageButtons.getElement());