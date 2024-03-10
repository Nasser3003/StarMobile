package alpha.com.starmobile.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class LoginController {

    @GetMapping("/login")
    public String login(@RequestParam(value = "error", required = false) String error,
                        @RequestParam(value = "logout", required = false) String logout) {
        if (error != null) {
            return "redirect:/login?error=true"; // Redirect to login page with error parameter
        }
        if (logout != null) {
            return "redirect:/login?logout=true"; // Redirect to login page with logout parameter
        }
        return "login"; // return the name of the login HTML file (e.g., login.html)
    }

    @GetMapping("/verification")
    public String verification(@RequestParam(value = "success", required = false) boolean success) {
        if (success) {
            return "verification_success"; // return the name of the success verification HTML file
        } else {
            return "verification_failure"; // return the name of the failure verification HTML file
        }
    }
}