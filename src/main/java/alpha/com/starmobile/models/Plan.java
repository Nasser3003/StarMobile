package alpha.com.starmobile.models;

import alpha.com.starmobile.models.ENUMS.PlanTypes;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
public class Plan {

    @Setter(AccessLevel.NONE)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Enumerated(EnumType.STRING) // Use EnumType.STRING to store enums as strings
    private PlanTypes planType;

    private int price;

    private int quota; // dataLimit (gigabyte megabyte or terabyte in the future) :D

    @Column(name = "signal_range")
    private String signalRange; // aka (galactic, solar,  universal)

    public Plan() {
    }

    public Plan(long id, PlanTypes planType, int price, int quota, String signalRange) {
        this.id = id;
        this.planType = planType;
        this.price = price;
        this.quota = quota;
        this.signalRange = signalRange;
    }

    public void setId(long id) {
        this.id = id;
    }

    
    
}
