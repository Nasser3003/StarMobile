package alpha.com.starmobile.models;

import alpha.com.starmobile.models.ENUMS.PlanTypes;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor @EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Plan {

    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private PlanTypes planType;

    private int price;

    private int quota; // dataLimit (gigabyte megabyte or terabyte in the future) :D

    @Column(name = "signal_range")
    private String signalRange; // aka (galactic, solar,  universal)

    @OneToMany
    @JoinColumn(name = "device_id")
    private List<Line> lines;

}
