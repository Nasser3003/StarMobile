package services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import alpha.com.starmobile.models.Device;
import alpha.com.starmobile.repository.DeviceRepository;

public class DeviceServiceImpl implements DeviceService {

    @Autowired
    private DeviceRepository repo;

    @Override
    public List<Device> findAll() {
        return repo.findAll();
    }

    @Override
    public Optional<Device> findById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("ID must not be null");
        }
        return repo.findById(id);
    }

    @Override
    public List<Device> findAllByBrand(String brand) {
        return repo.findAllByBrand(brand);
    }

    @Override
    public List<Device> findAllByModel(String model) {
        return repo.findAllByModel(model);
    }

    @Override
    public Device save(Device device) {
        if (device == null) {
            throw new IllegalArgumentException("Device must not be null");
        }
        return repo.save(device);
    }

}
