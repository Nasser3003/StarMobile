package alpha.com.starmobile.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import alpha.com.starmobile.models.Device;
import alpha.com.starmobile.services.DeviceService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/devices")
public class DeviceController {
    @Autowired
    private final DeviceService deviceService;


    public DeviceController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    // Endpoint to retrieve all devices
    @GetMapping
    public ResponseEntity<List<Device>> getAllDevices() {
        List<Device> devices = deviceService.findAll();
        return new ResponseEntity<>(devices, HttpStatus.OK);
    }

    // Endpoint to retrieve a device by ID
    @GetMapping("/{id}")
    public ResponseEntity<Device> getDeviceById(@PathVariable("id") Long id) {
        Optional<Device> deviceOptional = deviceService.findById(id);
        return deviceOptional.map(device -> new ResponseEntity<>(device, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Endpoint to create a new device
    @PostMapping
    public ResponseEntity<Device> createDevice(@RequestBody Device device) {
        Device newDevice = deviceService.save(device);
        return new ResponseEntity<>(newDevice, HttpStatus.CREATED);
    }

    // Endpoint to update an existing device
    @PutMapping("/{id}")
    public ResponseEntity<Device> updateDevice(@PathVariable("id") Long id, @RequestBody Device device) {
        device.setId(id); // Ensure the ID matches the path variable
        Device updatedDevice = deviceService.save(device);
        return new ResponseEntity<>(updatedDevice, HttpStatus.OK);
    }

    // Endpoint to delete a device
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDevice(@PathVariable("id") Long id) {
        deviceService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
