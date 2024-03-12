package alpha.com.starmobile.models;

import alpha.com.starmobile.models.ENUMS.PlanTypes;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Data @NoArgsConstructor
public class Plan {

    public Plan(PlanTypes planType) {
        this.planType = planType;
        setDefaultsForPlanType();
    }

    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private PlanTypes planType;

    private int price;

    private int quota;

    @Column(name = "signal_range")
    private String signalRange;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Set<Line> lines = new HashSet<>();

    @ManyToOne
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @JoinColumn(name = "user_id")
    @JsonIgnore 
    private User user;

    public void addLine(Line line) {
        lines.add(line);
        line.setPlan(this);
    }
    public void removeLine(Line line) {
        lines.remove(line);
        line.setPlan(null);
    }


    private void setDefaultsForPlanType() {
        String planTypeString = planType.name().toLowerCase();
        switch (planTypeString) {
            case "universal":
                this.price = 300;
                this.quota = 30;
                this.signalRange = "Universal";
                break;
            case "galactic":
                this.price = 200;
                this.quota = 20;
                this.signalRange = "Galactic";
                break;
            case "solar":
                this.price = 100;
                this.quota = 10;
                this.signalRange = "Solar";
                break;
        }
    }

}
