package com.example.Employee.ServiceLayer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Employee.Entity.User;
import com.example.Employee.Repository.UserRepository;

@Service

public class UserService {
	
	@Autowired
	
	private UserRepository ur;
	
	//Register
	
	public User register(User user) {
		return ur.save(user);
	}
	
	//Login
	
	public String login(User user) {
		User existingUser=ur.findByEmail(user.getEmail());
		if(existingUser !=null && existingUser.getPassword().equals(user.getPassword())) {
			return "LOgin Success";
		}else {
			return "Invalid Credentials";
		}
	}
	
	

}
