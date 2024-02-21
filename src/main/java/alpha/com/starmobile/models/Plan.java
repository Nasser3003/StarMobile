package alpha.com.starmobile.models;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Plan {

    @Setter(AccessLevel.NONE)
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private int price;

    private int quota; // dataLimit (gigabyte megabyte or terabyte in the future) :D

    @Column(name = "signal_range")
    private String signalRange; // aka (galactic, solar,  universal)

    @OneToMany
    private List<Line> lines;
}
