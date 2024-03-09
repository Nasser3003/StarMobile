package alpha.com.starmobile.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

@Entity
@Data
public class Device {

    @Setter(AccessLevel.NONE)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String brand;
    private String model;
    private String description;
    private int price;
    
    public Device() {
    }
    public Device(long id, String brand, String model, String description, int price) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.description = description;
        this.price = price;
    }
    public void setId(long id) {
        this.id = id;
    }

    

}
