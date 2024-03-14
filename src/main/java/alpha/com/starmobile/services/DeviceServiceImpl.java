package alpha.com.starmobile.services;

import alpha.com.starmobile.models.Device;
import alpha.com.starmobile.repository.DeviceRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class DeviceServiceImpl implements DeviceService {

    private DeviceRepository repo;

    @Override
    public List<Device> findAll() {
        return repo.findAll();
    }

    @Override
    public List<Device> findAllByBrandAndModel(String Brand, String model) {
        return null;
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

    @Override
    public void deleteById(long id) {
        repo.deleteById(id);
    }

}
