package alpha.com.starmobile.repository;

import alpha.com.starmobile.models.Device;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DeviceRepository extends JpaRepository<Device, Long> {
    List<Device> findAllByBrand(String brand);
    List<Device> findAllByModel(String brand);

    Optional<Device> findDeviceByBrandAndModel(String brand, String model);
}
