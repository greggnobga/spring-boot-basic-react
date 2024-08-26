package com.buntod.ems.service;

import java.util.List;

import com.buntod.ems.dto.DepartmentDTO;

public interface DepartmentService {
    /** Create department. */
    DepartmentDTO createDepartment(DepartmentDTO departmentDTO);

    /** Get department by id. */
    DepartmentDTO getDepartmentByID(Long departmentID);

    /** Get all departments. */
    List<DepartmentDTO> getAllDepartments();

    /** Update department. */
    DepartmentDTO updateDepartment(Long departmentID, DepartmentDTO updatedDepartment);

    /** Delete department. */
    DepartmentDTO deleteDepartment(Long departmentID);
}
