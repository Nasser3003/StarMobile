package alpha.com.starmobile.repository;

import alpha.com.starmobile.models.Device;
import alpha.com.starmobile.models.Line;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DeviceRepository extends JpaRepository<Device, Long> {
    List<Device> findAllByBrand(String brand);
    List<Device> findAllByModel(String brand);

    Optional<Device> findDeviceByBrandAndModelAndLine(String brand, String model, Line line);
}
