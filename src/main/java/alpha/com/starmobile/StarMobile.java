package alpha.com.starmobile;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"services", "alpha.com.starmobile.repository"})
public class StarMobile {

	public static void main(String[] args) {
		SpringApplication.run(StarMobile.class, args);
	}

}
