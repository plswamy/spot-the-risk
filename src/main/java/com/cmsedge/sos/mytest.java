package com.cmsedge.sos;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.Pbkdf2PasswordEncoder;
import org.springframework.security.crypto.password.StandardPasswordEncoder;
import org.springframework.security.crypto.scrypt.SCryptPasswordEncoder;

public class mytest {

	/*public static void main(String[] args) {
		String idForEncode = "Password1234";
		
		PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String encPass = passwordEncoder.encode(idForEncode);
		
		System.out.println("encoded password for String  " + idForEncode + " is ");
		System.out.println(encPass);
	}*/

}
