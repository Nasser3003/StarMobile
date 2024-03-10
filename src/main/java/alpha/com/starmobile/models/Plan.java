package alpha.com.starmobile.models;

import alpha.com.starmobile.models.ENUMS.PlanTypes;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data @NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
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
    private List<Line> lines = new ArrayList<>();


    @ManyToOne
    @ToString.Exclude
    @JoinColumn(name = "user_id")
    private User user;

    public void addLine(Line line) {
        lines.add(line);
    }

    private void setDefaultsForPlanType() {
        switch (planType) {
            case UNIVERSAL:
                this.price = 300;
                this.quota = 30;
                this.signalRange = "Universal";
                break;
            case GALACTIC:
                this.price = 200;
                this.quota = 20;
                this.signalRange = "Galactic";
                break;
            case SOLAR:
                this.price = 100;
                this.quota = 10;
                this.signalRange = "Solar";
                break;
        }
    }
}
