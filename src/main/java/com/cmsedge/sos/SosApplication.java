package com.cmsedge.sos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan({ "com.cmsedge.sos.controller", "com.cmsedge.sos.service", "com.cmsedge.sos.model",
		"com.cmsedge.sos.dao", "com.cmsedge.sos.conf" })
public class SosApplication {

	public static void main(String[] args) {
		SpringApplication.run(SosApplication.class, args);
	}
}
