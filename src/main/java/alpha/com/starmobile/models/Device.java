package alpha.com.starmobile.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;


@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class Device {

    @Setter(AccessLevel.NONE)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String picturePath;
    private String brand;
    private String model;
    private String description;
    private int price;

    @OneToOne
    private Line line;

    public Device() {
    }

    public Device(long id, String brand, String model, String description, int price, Line line) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.description = description;
        this.price = price;
        this.line = line;
    }

    public void setId(long id) {
        this.id = id;
    }

}
