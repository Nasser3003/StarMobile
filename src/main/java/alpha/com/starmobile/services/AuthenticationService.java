package alpha.com.starmobile.services;

public interface AuthenticationService {

    void registerUser(String firstName, String lastName, String email, String password);
    void loginUser(String email, String password);

}
