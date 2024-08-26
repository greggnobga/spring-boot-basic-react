package com.buntod.ems.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.buntod.ems.entity.Department;

public interface DepartmentRepostory extends JpaRepository<Department, Long>{
    Optional<Department> findByDepartmentName(String departmentName);
}
