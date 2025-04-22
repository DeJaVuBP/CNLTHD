package com.sagroup.studentservice.controllers;

import com.sagroup.studentservice.domains.Student;
import com.sagroup.studentservice.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/student")
public class studentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudent(@PathVariable Long id) {
        return studentService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/byClass/{className}")
    public ResponseEntity<List<Student>> getByClass(@PathVariable String className) {
        return ResponseEntity.ok(studentService.getByClassName(className));
    }

    @PostMapping("/addStudent")
    public ResponseEntity<Student> addStudent(@RequestBody Student student) {
        Student saved = studentService.addStudent(student);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Student> update(@PathVariable Long id, @RequestBody Student student) {
        return ResponseEntity.ok(studentService.update(id, student));
    }


    @GetMapping("/getStudents")
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }



    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> remove(@PathVariable Long id) {
        studentService.removeById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Map<String, Long>>> getStats() {
        return ResponseEntity.ok(studentService.getPerformanceStatisticsByClass());
    }

    // Nếu muốn phát triển sau:
    // @PostMapping("/buy")
    // public ResponseEntity<?> buyAvatar(...) { ... }

}
