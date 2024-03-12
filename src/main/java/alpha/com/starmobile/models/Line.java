package alpha.com.starmobile.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data @NoArgsConstructor
public class Line {

    public Line(String number, Plan plan) {
        this.number = number;
        this.plan = plan;
    }

    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique = true)
    private String number;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "device_id")
    private Device device;

    @ManyToOne
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JoinColumn(name = "plan_id")
    private Plan plan;

    private void linkDevice(Device device) {
        this.device = device;
    }
    private void unlinkDevice() {
        device = null;
    }

}
