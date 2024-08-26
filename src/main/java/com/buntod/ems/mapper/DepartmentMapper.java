package com.buntod.ems.mapper;

import com.buntod.ems.dto.DepartmentDTO;
import com.buntod.ems.entity.Department;

public class DepartmentMapper {
    /** Convert deparment jpa entity into department dto. */
    public static DepartmentDTO mapToDepartmentDTO(Department department) {
        return new DepartmentDTO(
                department.getId(),
                department.getDepartmentName(),
                department.getDepartmentDescription());
    }

    /** Convert deparment dto into department jpa entity. */
    public static Department mapToDepartment(DepartmentDTO departmentDTO) {
        return new Department(
                        departmentDTO.getId(),
                        departmentDTO.getDepartmentName(),
                        departmentDTO.getDepartmentDescription());
     }
}
