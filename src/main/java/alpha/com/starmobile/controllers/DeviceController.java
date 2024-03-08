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
    private DeviceService service;


    public DeviceController(DeviceService deviceService) {
        this.service = deviceService;
    }

    // Endpoint to retrieve all devices
    @GetMapping
    public ResponseEntity<List<Device>> getAllDevices() {
        List<Device> devices = service.findAll();
        return new ResponseEntity<>(devices, HttpStatus.OK);
    }

    // Endpoint to retrieve a device by ID
    @GetMapping("/{id}")
    public ResponseEntity<Device> getDeviceById(@PathVariable("id") Long id) {
        Optional<Device> deviceOptional = service.findById(id);
        return deviceOptional.map(device -> new ResponseEntity<>(device, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Endpoint to create a new device
    @PostMapping
    public ResponseEntity<Device> createDevice(@RequestBody Device device) {
        Device newDevice = service.save(device);
        return new ResponseEntity<>(newDevice, HttpStatus.CREATED);
    }

    // Endpoint to update an existing device
    @PutMapping("/{id}")
    public ResponseEntity<Device> updateDevice(@PathVariable("id") Long id, @RequestBody Device device) {
        device.setId(id); // Ensure the ID matches the path variable
        Device updatedDevice = service.save(device);
        return new ResponseEntity<>(updatedDevice, HttpStatus.OK);
    }

    // Endpoint to delete a device
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDevice(@PathVariable("id") Long id) {
        service.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
