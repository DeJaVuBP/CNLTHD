package com.sagroup.studentservice.services;

import com.sagroup.studentservice.domains.Student;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
@Service
public interface StudentService {
    Optional<Student> getById(Long id);
    List<Student> getAllStudents();
    Student addStudent(Student student);
    Student update(Long id, Student student);
    void removeById(Long id);
    List<Student> getByClassName(String className);
    Map<String, Map<String, Long>> getPerformanceStatisticsByClass();

}

