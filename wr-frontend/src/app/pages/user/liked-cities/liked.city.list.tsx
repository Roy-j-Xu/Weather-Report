import { useEffect, useState } from "react";
import { useUserService } from "../../../../providers/user.service.provider";
import City from "../../../../types/city.type";

function LikedCityList() {
    const userService = useUserService();
    const [likedCities, setLikedCities] = useState<City[]>([]);

    useEffect(() => {
        userService.getLikedCitiesByUsername("John")
            .then((cities) => setLikedCities(cities));
    }, []);

    return (
        <div>
            {likedCities.map((city) => <p>{city.city}</p>)}
        </div>
    )
}

export default LikedCityList;