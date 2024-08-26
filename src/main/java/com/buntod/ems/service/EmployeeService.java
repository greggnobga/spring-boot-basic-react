package com.buntod.ems.service;

import java.util.List;

import com.buntod.ems.dto.EmployeeDTO;

public interface EmployeeService {
    /** Create employee. */
    EmployeeDTO createEmployee(EmployeeDTO employeeDTO);

    /** Get employee by id. */
    EmployeeDTO getEmployeeByID(Long employeeID);

    /** Get all employess. */
    List<EmployeeDTO> getAllEmployees();

    /** Update employee. */
    EmployeeDTO updateEmployee(Long employeeID, EmployeeDTO updatedEmployee);

    /** Delate employee. */
    EmployeeDTO deleteEmployee(Long employeeID);
}
