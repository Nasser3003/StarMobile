package alpha.com.starmobile.models;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Data @NoArgsConstructor @AllArgsConstructor @EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Device {

    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String picturePath;
    private String brand;
    private String model;
    private String description;
    private int price;

}
