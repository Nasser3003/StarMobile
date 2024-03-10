package alpha.com.starmobile.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor @EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Line {

    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique = true)
    private String number;

    @OneToOne
    private Device device;

    @ManyToOne
    @ToString.Exclude
    @JoinColumn(name = "plan_id")
    private Plan plan;

}
