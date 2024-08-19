package com.buntod.ems.mapper;

import com.buntod.ems.dto.EmployeeDTO;
import com.buntod.ems.entity.Employee;

public class EmployeeMapper {
    /** Map employeedto to employee entity. */
    public static EmployeeDTO mapToEmployeeDTO(Employee employee) {
        return new EmployeeDTO(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail());
    }

    /** Map employee entity to employeedto. */
    public static Employee mapToEmployee(EmployeeDTO employeeDTO) {
        return new Employee(
            employeeDTO.getId(),
            employeeDTO.getFirstName(),
            employeeDTO.getLastName(),
            employeeDTO.getEmail()
        );
    }

}
