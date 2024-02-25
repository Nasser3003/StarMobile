package services;

import java.util.List;

import alpha.com.starmobile.models.Device;

public interface DeviceService {

    public List<Device> findAll();

    public Device findById(Long id);

    public Device save(Device device);

}
