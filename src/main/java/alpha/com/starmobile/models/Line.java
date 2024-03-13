package alpha.com.starmobile.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data @NoArgsConstructor
public class Line {

    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique = true)
    private long number;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "device_id")
    @JsonManagedReference
    private Device device;

}
