package com.buntod.ems.service.implementation;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.buntod.ems.dto.EmployeeDTO;
import com.buntod.ems.entity.Department;
import com.buntod.ems.entity.Employee;
import com.buntod.ems.exception.ResourceExistException;
import com.buntod.ems.exception.ResourceNotFoundException;
import com.buntod.ems.mapper.EmployeeMapper;
import com.buntod.ems.repository.DepartmentRepostory;
import com.buntod.ems.repository.EmployeeRepository;
import com.buntod.ems.service.EmployeeService;

@Service
public class EmployeeServiceImplementation implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DepartmentRepostory departmentRepostory;

    @Override
    public EmployeeDTO createEmployee(EmployeeDTO employeeDTO) {
        /** Map employee. */
        Employee employee = EmployeeMapper.mapToEmployee(employeeDTO);

        /** Get department. */
        Department department = departmentRepostory.findById(employeeDTO.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Department doest not exist with the id: " + employeeDTO.getDepartmentId()));

        /** Set department to employee. */
        employee.setDepartment(department);

         /** Check the respository if email exist. */
         boolean present = employeeRepository.findByEmail(employee.getEmail()).isPresent();

        /** Then conditionally test the result if false. */
        if (present) {
            /** And return an exception if proven. */
            throw new ResourceExistException("Email is already in use.");
        }

         /** Else save the employee. */
        Employee savedEmployee = employeeRepository.save(employee);

        /** And return the result. */
        return EmployeeMapper.mapToEmployeeDTO(savedEmployee);
    }

    @Override
    public EmployeeDTO getEmployeeByID(Long employeeID) {
        /** Find employee and if not found then throw exception. */
        Employee employee = employeeRepository.findById(employeeID)
                .orElseThrow(() -> new ResourceNotFoundException("Employee Not Found: " + employeeID));

        /** Return employee if found. */
        return EmployeeMapper.mapToEmployeeDTO(employee);
    }

    @Override
    public List<EmployeeDTO> getAllEmployees() {
        /** Fetch all employees. */
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream().map((employee) -> EmployeeMapper.mapToEmployeeDTO(employee)).collect(Collectors.toList());
    }

    @Override
    public EmployeeDTO updateEmployee(Long employeeID, EmployeeDTO updatedEmployee) {
        /** Check if employee exist else throw exception. */
        Employee employee = employeeRepository.findById(employeeID)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found: " + employeeID));

        /** Get department. */
        Department department = departmentRepostory.findById(updatedEmployee.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Department doest not exist with the id: " + updatedEmployee.getDepartmentId()));

        /** Set department to employee. */
        employee.setDepartment(department);

        /** If found set the updated detail. */
        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setEmail(updatedEmployee.getEmail());

        Employee updatedEmployeeObject = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDTO(updatedEmployeeObject);
    }

    @Override
    public EmployeeDTO deleteEmployee(Long employeeID) {
        /** Check if employee exist else throw exception. */
        Employee employee = employeeRepository.findById(employeeID)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found: " + employeeID));

        /** If found set the updated detail. */
        employeeRepository.deleteById(employeeID);

        /** Return employee if found. */
        return EmployeeMapper.mapToEmployeeDTO(employee);
    }
}
