package alpha.com.starmobile.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import alpha.com.starmobile.models.Line;
import alpha.com.starmobile.repository.LineRepository;

public class LineServiceImpl implements LineService {

    @Autowired
    private LineRepository repo;

    @Override
    public List<Line> findAll() {
        return repo.findAll();
    }

    @Override
    public Optional<Line> findById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("ID must not be null");
        }
        return repo.findById(id);
    }

    @Override
    public Optional<Line> findByNumber(String number) {
        return repo.findByNumber(number);
    }

    @Override
    public Line save(Line line) {
        if (line == null) {
            throw new IllegalArgumentException("Line must not be null");
        }
        return repo.save(line);
    }

    @Override
    public void deleteById(Long id) {
        repo.deleteById(id);
    }

}
