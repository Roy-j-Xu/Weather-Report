import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import City from "../../../../types/city.type";

interface CityTableProps {
    cities: City[];
}

function CityTable({ cities }: CityTableProps) {
    return (
        <TableContainer>
        <Table  sx={{ minWidth: 650 }} id="city-table">
        <TableHead>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>State</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {cities.map(city => (
                <CityTableRow key={city.id} city={city} />
            ))}
        </TableBody>
        </Table>
        </TableContainer>
    )
}


interface CityTableRowProps {
    city: City;
}

function CityTableRow({ city }: CityTableRowProps) {
    return (
        <TableRow>
            <TableCell>{city.city}</TableCell>
            <TableCell>{city.stateName}</TableCell>
        </TableRow>
    );
}

export default CityTable;