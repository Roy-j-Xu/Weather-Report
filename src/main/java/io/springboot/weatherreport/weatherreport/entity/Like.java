package io.springboot.weatherreport.weatherreport.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "likes", schema = "public")
public class Like {

    // use @EmbeddedId for composite primary key
    @EmbeddedId
    private LikeId likeId;

    @ManyToOne
    // @MapsId map to fields of LikeId
    @MapsId("cityId")
    @JoinColumn(name = "city_id")
    private City city;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    public Like(User user, City city) {
        this.user = user;
        this.city = city;
        this.likeId = new LikeId(user.getUserId(), city.getId());
    }

}
