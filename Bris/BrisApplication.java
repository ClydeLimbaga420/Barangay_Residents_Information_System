package com.BRIS.Login;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class BrisApplication {

	public static void main(String[] args) {
		SpringApplication.run(BrisApplication.class, args);
	}

}
