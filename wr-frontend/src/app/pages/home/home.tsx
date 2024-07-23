import MainNavbar from '../../../components/navbar/main.navbar.component';
import './home.css'
import CitySearchGroup from './city-search-group/city.search.group';


export default function Home() {

    return (
        <>
        <MainNavbar />
        <h1>Weather Report</h1>
        <CitySearchGroup />
        </>
    );
}