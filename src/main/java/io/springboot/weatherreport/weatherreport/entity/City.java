package io.springboot.weatherreport.weatherreport.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.lang.NonNull;

@Entity
@Data
@Builder
@Table(name = "cities", schema = "public")
public class City {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "city")
    private String city;

    @Column(name = "state_id")
    private String stateId;

    @Column(name = "state_name")
    private String stateName;

    @Column(name = "lat")
    private float lat;

    @Column(name = "lng")
    private float lng;

    @Column(name = "timezone")
    private String timezone;

}
