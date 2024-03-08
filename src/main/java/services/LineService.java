package services;

import java.util.List;
import java.util.Optional;

import alpha.com.starmobile.models.Line;

public interface LineService {

    public List<Line> findAll();

    public Optional<Line> findById(Long id);

    Optional<Line> findByNumber(String number);

    public Line save(Line line);

    public void deleteById(Long id);

}
