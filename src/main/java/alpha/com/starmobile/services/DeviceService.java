package alpha.com.starmobile.services;

import java.util.List;
import java.util.Optional;

import alpha.com.starmobile.models.Device;

public interface DeviceService {

    List<Device> findAll();

    Optional<Device> findById(long id);


    List<Device> findAllByBrand(String brand);

    List<Device> findAllByModel(String brand);

    Device save(Device device);
    Device save(Device device);
    void deleteById(long id);

}
