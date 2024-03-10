package alpha.com.starmobile.models;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Entity
@Data
public class User {

    @Setter(AccessLevel.NONE)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String email;

    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;

    private String password;

    @OneToMany
    @ToString.Exclude
    private List<Device> devices;
    // should add a cart here and make it transient, or no
    // do I need unidirectional or bidirectional?


    public User() {
    }

    public User(long id, String email, String firstName, String lastName, String password, List<Device> devices) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.devices = devices;
    }

    public void setId(long id) {
        this.id = id;
    }

    

}
