package alpha.com.starmobile.repository;

import alpha.com.starmobile.models.Line;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LineRepository extends JpaRepository<Line, Long> {
    Optional<Line> findByNumber(long number);

    void deleteLineById(long id);
}
