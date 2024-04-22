package io.springboot.weatherreport.weatherreport.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "cities", schema = "public")
public class City {

    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "state_id")
    private String stateId;

    @Column(name = "state_name")
    private String stateName;

    @Column(name = "lat")
    private float Lat;

    @Column(name = "lng")
    private float Lng;

    @Column(name = "timezone")
    private String timezone;

}
