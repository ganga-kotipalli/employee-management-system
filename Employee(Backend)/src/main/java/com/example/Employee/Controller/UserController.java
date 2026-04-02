package com.example.Employee.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Employee.Entity.User;
import com.example.Employee.ServiceLayer.UserService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class UserController {

	
	@Autowired
	
	private UserService service;
	
	@PostMapping("/register")
	
	public User register(@RequestBody User user) {
		return service.register(user);
	}
	
	@PostMapping("/login")
	public String login(@RequestBody User user) {
		return service.login(user);
	}
	
	@GetMapping("/login")
    public String loginGet(
            @RequestParam String email,
            @RequestParam String password) {

        User user = new User();
        user.setEmail(email);
        user.setPassword(password);

        return service.login(user);
    }
	
	

}
