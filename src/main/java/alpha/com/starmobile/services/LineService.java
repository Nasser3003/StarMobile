package alpha.com.starmobile.services;

import java.util.List;
import java.util.Optional;

import alpha.com.starmobile.models.Line;

public interface LineService {

    List<Line> findAll();

    Optional<Line> findById(Long id);

    Optional<Line> findByNumber(String number);

    Line save(Line line);

}
