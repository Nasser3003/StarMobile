package services;

import java.util.List;

import alpha.com.starmobile.models.Line;

public interface LineService {

    public List<Line> findAll();

    public Line findById(Long id);

    public Line save(Line line);

}
