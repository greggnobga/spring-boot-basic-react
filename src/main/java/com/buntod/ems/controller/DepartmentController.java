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

import com.buntod.ems.dto.DepartmentDTO;
import com.buntod.ems.service.DepartmentService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/departments")
public class DepartmentController {
    private DepartmentService departmentService;

    /** Build department rest api. */
    @PostMapping
    public ResponseEntity<DepartmentDTO> createDeparment(@RequestBody DepartmentDTO departmentDTO) {
        DepartmentDTO department = departmentService.createDepartment(departmentDTO);
        return new ResponseEntity<>(department, HttpStatus.CREATED);
    }

    /** Get department by id rest api. */
    @GetMapping("{id}")
    public ResponseEntity<DepartmentDTO> getDepartmentByID(@PathVariable("id") Long departmentID) {
        DepartmentDTO department = departmentService.getDepartmentByID(departmentID);
        return ResponseEntity.ok(department);
    }

    /** Get all department rest api. */
    @GetMapping
    public ResponseEntity<List<DepartmentDTO>> getAllDepartments() {
        List<DepartmentDTO> departments = departmentService.getAllDepartments();
        return ResponseEntity.ok(departments);
    }

    /** Update department rest api. */
    @PutMapping("{id}")
    public ResponseEntity<DepartmentDTO> updateDepartment(@PathVariable("id") Long departmentID,
            @RequestBody DepartmentDTO updatedDepartment) {
        DepartmentDTO departmentDTO = departmentService.updateDepartment(departmentID, updatedDepartment);
        return ResponseEntity.ok(departmentDTO);
    }

    /** Delete department rest api. */
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteDepartment(@PathVariable("id") Long departmentID) {
        departmentService.deleteDepartment(departmentID);
        return ResponseEntity.ok("Department deleted successfully.");
    }
}
