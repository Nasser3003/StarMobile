package alpha.com.starmobile.models;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;
import lombok.ToString;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Data
public class User implements UserDetails{

    @Setter(AccessLevel.NONE)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String email;

    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;

    private String password;

    @OneToMany
    @ToString.Exclude
    private List<Device> devices;
    // should add a cart here and make it transient, or no
    // do I need unidirectional or bidirectional?

    private String role;
    public User(String email, String password, String role) {
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public User(long id, String email, String firstName, String lastName, String password, List<Device> devices) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.devices = devices;
        this.role = "USER";
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

    @Override
    public String getUsername() {
        return email;
    }

	@Override
	public String getPassword() {
		return password;
	}

    public void setUsername(String username) {
		this.email = username;
	}

	public void setPassword(String password) {
		this.password = password;
	}
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
		Set<SimpleGrantedAuthority> authorities = new HashSet<>();
		SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role);
		authorities.add(authority);
		return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    

}
