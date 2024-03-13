package alpha.com.starmobile.models;

import alpha.com.starmobile.models.ENUMS.PlanTypes;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

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
    @JsonManagedReference
    private Set<Line> lines = new HashSet<>();

    @ManyToOne
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    public void addLine(Line line) {
        lines.add(line);
    }
    public void removeLine(Line line) {
        lines.remove(line);
    }


    private void setDefaultsForPlanType() {
        String planTypeString = planType.name().toLowerCase();
        switch (planTypeString) {
            case "citizen":
                this.price = 20;
                this.quota = 150;
                this.signalRange = "Galactic";
                break;
            case "starfighter":
                this.price = 25;
                this.quota = 150;
                this.signalRange = "Universal";
                break;
            case "droid":
                this.price = 100;
                this.quota = 10_000;
                this.signalRange = "Galactic";
                break;
            case "larval":
                this.price = 5;
                this.quota = 10;
                this.signalRange = "System";
                break;
        }
    }

}
