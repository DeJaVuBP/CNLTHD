package com.sagroup.teacherservice.Service.IMP;

import com.sagroup.teacherservice.Domain.Teacher;
import com.sagroup.teacherservice.Repository.TeacherRepository;
import com.sagroup.teacherservice.Service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherServiceIMP implements TeacherService {

    @Autowired
    private TeacherRepository teacherRepository;

    @Override
    public List<Teacher> getAll() {
        return teacherRepository.findAll();
    }

    @Override
    public Teacher getTeacher(Long id) {
        return teacherRepository.findById(id).orElse(null);
    }

    @Override
    public Teacher add(Teacher teacher) {
        return teacherRepository.save(teacher);
    }

    @Override
    public Teacher update(Long id, Teacher updatedTeacher) {
        Teacher existing = teacherRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Teacher not found with id: " + id));

        existing.setFullName(updatedTeacher.getFullName());
        existing.setAddress(updatedTeacher.getAddress());
        existing.setEmail(updatedTeacher.getEmail());
        existing.setPhone(updatedTeacher.getPhone());
        existing.setHomeroomClass(updatedTeacher.getHomeroomClass());
        existing.setSubject(updatedTeacher.getSubject());

        return teacherRepository.save(existing);
    }



    @Override
    public String delete(Long id) {
        Teacher teacher = teacherRepository.findById(id).orElse(null);
        if (teacher != null) {
            teacherRepository.deleteById(id);
            return "Safely deleted";
        }
        return "Teacher not found";
    }
}
