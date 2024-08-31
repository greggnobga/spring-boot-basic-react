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
                employee.getEmail(),
                employee.getDepartment().getId(),
                employee.getDepartment().getDepartmentName());
    }

    /** Map employee entity to employeedto. */
    public static Employee mapToEmployee(EmployeeDTO employeeDTO) {
        Employee employee = new Employee();
        employee.setId(employeeDTO.getId());
        employee.setFirstName(employeeDTO.getFirstName());
        employee.setLastName(employeeDTO.getLastName());
        employee.setEmail(employeeDTO.getEmail());
        return employee;
    }

}
