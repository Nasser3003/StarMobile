package alpha.com.starmobile.controllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import alpha.com.starmobile.models.Device;
import alpha.com.starmobile.services.DeviceService;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/device")
@AllArgsConstructor(onConstructor = @__(@Autowired))

public class DeviceController {
    private DeviceService service;

    @GetMapping
    public ResponseEntity<List<Device>> getAllDevices() {
        List<Device> devices = service.findAll();
        return new ResponseEntity<>(devices, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Device> getDeviceById(@PathVariable("id") Long id) {
        Optional<Device> deviceOptional = service.findById(id);
        return deviceOptional.map(device -> new ResponseEntity<>(device, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Device> createDevice(@RequestBody Device device) {
        Device newDevice = service.save(device);
        return new ResponseEntity<>(newDevice, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Device> updateDevice(@PathVariable("id") Long id, @RequestBody Device device) {
        Device updatedDevice = service.save(device);
        return new ResponseEntity<>(updatedDevice, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDevice(@PathVariable("id") Long id) {
        service.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
