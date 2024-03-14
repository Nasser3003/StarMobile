package alpha.com.starmobile.controllers;

import alpha.com.starmobile.dto.AddOrRemoveDeviceDTO;
import alpha.com.starmobile.dto.DeviceLineChangeDTO;
import alpha.com.starmobile.models.Device;
import alpha.com.starmobile.models.User;
import alpha.com.starmobile.services.DeviceService;
import alpha.com.starmobile.services.MyService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/device")
@AllArgsConstructor(onConstructor = @__(@Autowired))

public class DeviceController {
    private DeviceService deviceService;
    private MyService myService;

    @GetMapping("/all")
    public ResponseEntity<List<Device>> getAllDevices() {
        List<Device> devices = deviceService.findAll();
        return new ResponseEntity<>(devices, HttpStatus.OK);
    }

    @GetMapping("/{brand}")
    public ResponseEntity<List<Device>> getAllByBrand(@PathVariable String brand) {
        List<Device> devices = deviceService.findAllByBrand(brand);
        return new ResponseEntity<>(devices, HttpStatus.OK);
    }
    @PostMapping("/add")
    public ResponseEntity<User> addDevice(@RequestBody AddOrRemoveDeviceDTO addOrRemoveDeviceDTO) {
        User updatedUser = myService.addDevice(addOrRemoveDeviceDTO);
        return new ResponseEntity<>(updatedUser, HttpStatus.CREATED);
    }
    @PostMapping("/remove")
    public ResponseEntity<User> removeDevice(@RequestBody AddOrRemoveDeviceDTO addOrRemoveDeviceDTO) {
        User updatedUser = myService.removeDevice(addOrRemoveDeviceDTO);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }
    @PostMapping("/changeLine")
    public ResponseEntity<User> changeLine(@RequestBody DeviceLineChangeDTO deviceLineChangeDTO) {
        User updatedUser = myService.changeDeviceLine(deviceLineChangeDTO);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }
}
