package io.springboot.weatherreport.weatherreport.service;

import io.springboot.weatherreport.weatherreport.entity.City;
import io.springboot.weatherreport.weatherreport.entity.Like;
import io.springboot.weatherreport.weatherreport.entity.User;
import io.springboot.weatherreport.weatherreport.exception.CityNotFoundException;
import io.springboot.weatherreport.weatherreport.exception.UserNotFoundException;
import io.springboot.weatherreport.weatherreport.repository.CityRepository;
import io.springboot.weatherreport.weatherreport.repository.LikeRepository;
import io.springboot.weatherreport.weatherreport.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final CityRepository cityRepository;
    private final LikeRepository likeRepository;

    @Autowired
    public UserService(
            UserRepository userRepository,
            CityRepository cityRepository,
            LikeRepository likeRepository) {
        this.userRepository = userRepository;
        this.cityRepository = cityRepository;
        this.likeRepository = likeRepository;
    }

    public void likeCity(long userId, int cityId) {
        Optional<User> userOptional = userRepository.findById(userId);
        Optional<City> cityOptional = cityRepository.findById(cityId);
        userOptional.orElseThrow(() ->
                new UserNotFoundException("User id " + userId + " does not exist")
        );
        cityOptional.orElseThrow(() ->
                new CityNotFoundException("City id " + cityId + " does not exist.")
        );

        likeRepository.save(
                Like.builder()
                        .user(userOptional.get())
                        .city(cityOptional.get())
                        .build()
        );
    }

    public List<City> getLikedCitiesByUserId(long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        userOptional.orElseThrow(() ->
                new UserNotFoundException("User id " + userId + " does not exist")
        );
        return userOptional
                .get()
                .getLikes()
                .stream()
                .map(Like::getCity)
                .toList();
    }

}
