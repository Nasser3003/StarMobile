package alpha.com.starmobile.models;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Data @NoArgsConstructor
public class Device {

    public Device(String brand, String model) {
        this.brand = brand;
        this.model = model;
        setDefaultsForDevice();
    }

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

    @OneToOne(cascade = CascadeType.ALL)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Line line;

    private void setDefaultsForDevice() {
        if (brand.equalsIgnoreCase("Samsung")) {
            switch (model.toLowerCase()) {
                case "galaxy s24":
                    this.price = 1300;
                    this.description = "Flagship phone from Samsung.";
                    break;
                case "galaxy a32":
                    this.price = 300;
                    this.description = "Budget phone from Samsung.";
            }
        } else if (brand.equalsIgnoreCase("Apple")) {
            switch (model.toLowerCase()) {
                case "iphone 15 pro":
                    this.price = 1200;
                    this.description = "Flagship phone from Apple.";
                    break;
                case "iphone se":
                    this.price = 400;
                    this.description = "Budget iPhone from Apple.";
            }
        } else {
            switch (model.toLowerCase()) {
                case "pixel 7":
                    this.price = 700;
                    this.description = "Latest flagship phone from Google.";
                    break;
                case "pixel 6a":
                    this.price = 450;
                    this.description = "Budget phone from Google.";
            }
        }
    }
}
