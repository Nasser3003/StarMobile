package alpha.com.starmobile.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
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

    @ManyToOne
    @JoinColumn(name = "plan_id", nullable = true)
    private Plan plan;

    @OneToOne
    @JoinColumn(name = "line_id", nullable = true)
    private Line line;

    @Column(name = "image")
    private String image;
    
    public Device() {
    }
    public Device(long id, String brand, String model, String description, int price, Plan plan, Line line, String image) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.description = description;
        this.price = price;
        this.plan = plan;
        this.line = line;
        this.image = image;
    }
    public void setId(long id) {
        this.id = id;
    }

    

}
