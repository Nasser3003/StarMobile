package alpha.com.starmobile.dtos;

public class RegisterResponse {
	
	private String username;
	
	private String role;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public RegisterResponse(String username, String role) {
		super();
		this.username = username;
		this.role = role;
	}

	public RegisterResponse() {
		super();
	}
	
	
}