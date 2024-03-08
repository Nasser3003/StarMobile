package alpha.com.starmobile.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
public class Line {

    @Setter(AccessLevel.NONE)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique = true)
    private String number;

    @OneToOne
    @ToString.Exclude
    private Device device;

    public Line() {
    }

    public Line(long id, String number, Device device) {
        this.id = id;
        this.number = number;
        this.device = device;
    }

    public void setId(long id) {
        this.id = id;
    }

    

}
