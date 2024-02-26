package alpha.com.starmobile.services;

import java.util.List;
import java.util.Optional;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import alpha.com.starmobile.models.Line;
import alpha.com.starmobile.repository.LineRepository;
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class LineServiceImpl implements LineService {

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

}
