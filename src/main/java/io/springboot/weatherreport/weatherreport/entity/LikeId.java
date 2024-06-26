package io.springboot.weatherreport.weatherreport.entity;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@Data
@NoArgsConstructor
@Embeddable
public class LikeId implements Serializable {
    private long userId;
    private int cityId;

    public LikeId(long userId, int cityId) {
        this.userId = userId;
        this.cityId = cityId;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null) return false;
        if (this == o) return true;
        if (getClass() != o.getClass()) return false;
        LikeId likeId = (LikeId) o;
        return Objects.equals(userId, likeId.userId) &&
               Objects.equals(cityId, likeId.cityId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, cityId);
    }
}
