package alpha.com.starmobile.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    @JsonBackReference
    private Line line;

    private void setDefaultsForDevice() {
        if (brand.equalsIgnoreCase("Ploklok")) {
            switch (model.toLowerCase()) {
                case "ashen nightmare 3":
                    this.price = 1300;
                    this.description = "Flagship phone from Ploklok.";
                    this.picturePath = "application-frontend/src/assets/imgs/devices/ashen_nightmare_3.jfif";
                    break;
                case "ashen daydream 3":
                    this.price = 300;
                    this.description = "Budget phone from Ploklok.";
                    this.picturePath = "application-frontend/src/assets/imgs/devices/ashen_daydream_3.jfif";
            }
        } else if (brand.equalsIgnoreCase("Quantum")) {
            switch (model.toLowerCase()) {
                case "1x":
                    this.price = 1200;
                    this.description = "Flagship phone from Quantum.";
                    this.picturePath = "application-frontend/src/assets/imgs/devices/1x.jfif";
                    break;
                case "1x0":
                    this.price = 400;
                    this.description = "Budget iPhone from Quantum.";
                    this.picturePath = "application-frontend/src/assets/imgs/devices/1.jpeg";
            }
        } else if (brand.equalsIgnoreCase("BlackHoleBerry")) {
            switch (model.toLowerCase()) {
                case "3 pro":
                    this.price = 700;
                    this.description = "Flagship phone from BlackHoleBerry.";
                    this.picturePath = "application-frontend/src/assets/imgs/devices/3_pro.jpg";
                    break;
                case "pixel 6a":
                    this.price = 450;
                    this.description = "Budget phone from BlackHoleBerry.";
                    this.picturePath = "application-frontend/src/assets/imgs/devices/3_no.jpeg";
            }
        } else {
            switch (model.toLowerCase()) {
                case "billion 8":
                    this.price = 700;
                    this.description = "Flagship phone from Hive.";
                    this.picturePath = "application-frontend/src/assets/imgs/devices/billion_8.jpg";
                    break;
                case "million 7":
                    this.price = 450;
                    this.description = "Budget phone from Hive.";
                    this.picturePath = "application-frontend/src/assets/imgs/devices/million_7.png";
            }
        }
    }
}