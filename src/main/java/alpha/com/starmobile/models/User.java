package alpha.com.starmobile.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data @NoArgsConstructor @RequiredArgsConstructor
public class User {


    @Setter(AccessLevel.NONE)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NonNull
    @Column(name = "first_name")
    private String firstName;

    @NonNull
    @Column(name = "last_name")
    private String lastName;

    @NonNull
    @Column(unique = true)
    private String email;

    @NonNull
    private String password;

    @OneToMany
    @ToString.Exclude
    private List<Plan> plans;
    // should add a cart here and make it transient, or no
    // do I need unidirectional or bidirectional?

}
