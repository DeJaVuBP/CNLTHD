package com.sagroup.teacherservice.Service;

import com.sagroup.teacherservice.Domain.Teacher;

import java.util.List;

public interface TeacherService {
    List<Teacher> getAll();
    Teacher getTeacher(Long id);
    Teacher add(Teacher teacher);
    Teacher update(Long id, Teacher teacher);
    String delete(Long id);
}
