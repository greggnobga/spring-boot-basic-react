package com.buntod.ems.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.buntod.ems.dto.EmployeeDTO;
import com.buntod.ems.service.EmployeeService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    private EmployeeService employeeService;

    /** Add employee rest api. */
    @PostMapping
    public ResponseEntity<EmployeeDTO> createEmployee(@RequestBody EmployeeDTO employeeDTO) {
        EmployeeDTO savedEmployee = employeeService.createEmployee(employeeDTO);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }

    /** Get employee by id rest api. */
    @GetMapping("{id}")
    public ResponseEntity<EmployeeDTO> getEmployeeByID(@PathVariable("id") Long employeeID) {
        EmployeeDTO employeeDTO = employeeService.getEmployeeByID(employeeID);
        return ResponseEntity.ok(employeeDTO);
    }

    /** Get all employees rest api. */
    @GetMapping
    public ResponseEntity<List<EmployeeDTO>> getAllEmployees() {
        List<EmployeeDTO> employees = employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }

    /** Update employee rest api. */
    @PutMapping("{id}")
    public ResponseEntity<EmployeeDTO> updateEmloyee(@PathVariable("id") Long employeeID,
            @RequestBody EmployeeDTO updatedEmployee) {
        EmployeeDTO employeeDTO = employeeService.updateEmployee(employeeID, updatedEmployee);
        return ResponseEntity.ok(employeeDTO);
    }

    /** Delete employee rest api. */
    @DeleteMapping("{id}")
    public ResponseEntity<String> delteEmployee(@PathVariable("id") Long employeeID) {
        employeeService.deleteEmployee(employeeID);
        return ResponseEntity.ok("Employee deleted successfully.");
    }
}
