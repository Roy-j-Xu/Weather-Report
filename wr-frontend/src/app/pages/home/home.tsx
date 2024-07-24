import './home.css'
import MainNavbar from '../../../components/navbar/main.navbar.component';
import { useAuthService } from '../../../providers/auth.service.provider';
import CitySearchGroup from './city-search-group/city.search.group';

export default function Home() {
    const authService = useAuthService();

    return (
        <>
        <MainNavbar authService={authService}/>
        <h1>Weather Report</h1>
        <CitySearchGroup />
        </>
    );
}