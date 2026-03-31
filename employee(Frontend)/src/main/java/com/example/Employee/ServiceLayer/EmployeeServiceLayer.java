package com.example.Employee.ServiceLayer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Employee.Entity.Employee;
import com.example.Employee.Repository.EmployeeRepository;

@Service

public class EmployeeServiceLayer {
	
	@Autowired
	
	private EmployeeRepository er;
	
	//get
	public List<Employee>getAllEmployees(){
		
		return er.findAll();
	}
	
	//save
	
	public Employee addEmployee(Employee emp) {
		return er.save(emp);
	}
	
	//update
	
	public Employee updateEmployee(Long id, Employee emp) {
	    Employee existing = er.findById(id)
	        .orElseThrow(() -> new RuntimeException("Employee not found"));

	    existing.setName(emp.getName());
	    existing.setEmail(emp.getEmail());
	    existing.setDepartment(emp.getDepartment());

	    return er.save(existing);
	}
	//Delete
	
	public void deleteEmployee(Long id) {
		 er.deleteById(id);
	}

}
