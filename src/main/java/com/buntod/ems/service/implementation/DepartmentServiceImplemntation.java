package com.buntod.ems.service.implementation;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.buntod.ems.dto.DepartmentDTO;
import com.buntod.ems.entity.Department;
import com.buntod.ems.exception.ResourceExistException;
import com.buntod.ems.exception.ResourceNotFoundException;
import com.buntod.ems.mapper.DepartmentMapper;
import com.buntod.ems.repository.DepartmentRepostory;
import com.buntod.ems.service.DepartmentService;

@Service
public class DepartmentServiceImplemntation implements DepartmentService {

    @Autowired
    private DepartmentRepostory departmentRepostory;

    @Override
    public DepartmentDTO createDepartment(DepartmentDTO departmentDTO) {
        /** Map department. */
        Department department = DepartmentMapper.mapToDepartment(departmentDTO);

        /** Check the respository if email exist. */
        boolean present = departmentRepostory.findByDepartmentName(department.getDepartmentName()).isPresent();

        /** Then conditionally test the result if false. */
        if (present) {
            /** And return an exception if proven. */
            throw new ResourceExistException("Department name exist.");
        }

        Department savedDepartment = departmentRepostory.save(department);
        return DepartmentMapper.mapToDepartmentDTO(savedDepartment);
    }

    @Override
    public DepartmentDTO getDepartmentByID(Long departmentID) {
         /** Find department and if not found then throw exception. */
        Department department = departmentRepostory.findById(departmentID)
                .orElseThrow(() -> new ResourceNotFoundException("Department Not Found: " + departmentID));

        /** Return department if found. */
        return DepartmentMapper.mapToDepartmentDTO(department);
    }

    @Override
    public List<DepartmentDTO> getAllDepartments() {
        /** Fetch all department. */
        List<Department> departments = departmentRepostory.findAll();
        return departments.stream().map((department) -> DepartmentMapper.mapToDepartmentDTO(department)).collect(Collectors.toList());
    }

    @Override
    public DepartmentDTO updateDepartment(Long departmentID, DepartmentDTO updatedDepartment) {
         /** Check if department exist else throw exception. */
        Department deparment = departmentRepostory.findById(departmentID)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found: " + departmentID));

        /** If found set the updated detail. */
       deparment.setDepartmentName(updatedDepartment.getDepartmentName());
       deparment.setDepartmentDescription(updatedDepartment.getDepartmentDescription());

        Department updatedDepartmentObject = departmentRepostory.save(deparment);

        return DepartmentMapper.mapToDepartmentDTO(updatedDepartmentObject);
    }

    @Override
    public DepartmentDTO deleteDepartment(Long departmentID) {
        /** Check if department exist else throw exception. */
        Department department = departmentRepostory.findById(departmentID)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found: " + departmentID));

        /** If found set the updated detail. */
        departmentRepostory.deleteById(departmentID);

        /** Return depatment if found. */
        return DepartmentMapper.mapToDepartmentDTO(department);
    }

}
