package alpha.com.starmobile.services;

import java.util.List;
import java.util.Optional;

import alpha.com.starmobile.models.Device;

public interface DeviceService {

    public List<Device> findAll();

    public Optional<Device> findById(Long id);

    List<Device> findAllByBrand(String brand);

    List<Device> findAllByModel(String brand);

    public Device save(Device device);

    public void deleteById(Long id);

}
