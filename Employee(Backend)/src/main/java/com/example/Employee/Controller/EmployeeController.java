package com.example.Employee.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Employee.Entity.Employee;
import com.example.Employee.ServiceLayer.EmployeeServiceLayer;

@RestController
@RequestMapping("/employees")
@CrossOrigin(origins="http://localhost:5173")
public class EmployeeController {
	
	@Autowired
	
	private EmployeeServiceLayer esl;
	
	//Post
	
	@PostMapping
	
	public Employee addEmployee(@RequestBody Employee emp) {
		return esl.addEmployee(emp);
	}
	
	//Get
	@GetMapping
	public List<Employee>getAllEmployees(){
		return esl.getAllEmployees();
	}
	
	
	  // PUT
    @PutMapping("/{id}")
    public Employee updateEmployee(@PathVariable Long id, @RequestBody Employee emp) {
        return esl.updateEmployee(id, emp);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteEmployee(@PathVariable Long id) {
        esl.deleteEmployee(id);
    }
}
