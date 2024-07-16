import City from "../../../../types/city.type";
import "./city.search.group.css"

interface CityTableProps {
    cities: City[];
}

function CityTable({ cities }: CityTableProps) {
    return (
        <div>
        <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>State</th>
            </tr>
        </thead>
        <tbody>
            {cities.map(city => (
                <CityTableRow key={city.id} city={city} />
            ))}
        </tbody>
        </table>
        </div>
    )
}


interface CityTableRowProps {
    city: City;
}

function CityTableRow({ city }: CityTableRowProps) {
    return (
        <tr>
            <td>{city.city}</td>
            <td>{city.stateName}</td>
        </tr>
    );
}

export default CityTable;