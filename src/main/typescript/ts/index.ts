import { CityTable, CityPageButtons } from "./components/city_table";

const param = new URLSearchParams(window.location.search);
const page = Number(param.get("page"));

let cityTable = new CityTable(page);
let pageButtons = new CityPageButtons(cityTable);

document.body.appendChild(cityTable.getElement());
document.body.appendChild(pageButtons.getElement());