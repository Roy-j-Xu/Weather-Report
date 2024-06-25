package io.springboot.weatherreport.weatherreport.repository;

import io.springboot.weatherreport.weatherreport.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Like, Long> {
}
