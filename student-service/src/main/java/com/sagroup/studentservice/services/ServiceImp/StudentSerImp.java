package com.sagroup.studentservice.services.ServiceImp;

import com.sagroup.studentservice.domains.Student;
import com.sagroup.studentservice.repositories.StudentRepo;
import com.sagroup.studentservice.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.PostLoad;
import javax.persistence.Transient;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StudentSerImp implements StudentService {

    @Autowired
    private StudentRepo studentRepo;

    @Override
    public Optional<Student> getById(Long id){
        return studentRepo.findById(id);
    }

    @Override
    public Student addStudent(Student student) {
        if (student != null) {
            assignAcademicPerformance(student);
        }
        return studentRepo.save(student);
    }

    @Override
    public Student update(Long id, Student student) {
        Student repoStudent = studentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        repoStudent.setFirstName(student.getFirstName());
        repoStudent.setLastName(student.getLastName());
        repoStudent.setMathScore(student.getMathScore());
        repoStudent.setPhysicsScore(student.getPhysicsScore());
        repoStudent.setChemistryScore(student.getChemistryScore());
        repoStudent.setLiteratureScore(student.getLiteratureScore());
        repoStudent.setEnglishScore(student.getEnglishScore());
        repoStudent.setBehaviorScore(student.getBehaviorScore());
        repoStudent.setClassName(student.getClassName());

        assignAcademicPerformance(repoStudent);

        return studentRepo.save(repoStudent);
    }

    @Override
    public List<Student> getByClassName(String className) {
        List<Student> students = studentRepo.findByClassName(className);

        for (Student student : students) {
            assignAcademicPerformance(student); // Gán học lực trước khi trả về
        }

        return students;
    }



    @Override
    public void removeById(Long id) {
        studentRepo.deleteById(id);
    }


    @Override
    public List<Student> getAllStudents() {
        List<Student> students = studentRepo.findAll();
        students.forEach(this::assignAcademicPerformance);
        return students;
    }


    private void assignAcademicPerformance(Student student) {
        System.out.println("Tính học lực cho student: " + student.getFirstName() + " " + student.getLastName());

        double total = 0;
        int count = 0;

        if (student.getMathScore() != null) {
            total += student.getMathScore();
            count++;
        }
        if (student.getPhysicsScore() != null) {
            total += student.getPhysicsScore();
            count++;
        }
        if (student.getChemistryScore() != null) {
            total += student.getChemistryScore();
            count++;
        }
        if (student.getLiteratureScore() != null) {
            total += student.getLiteratureScore();
            count++;
        }
        if (student.getEnglishScore() != null) {
            total += student.getEnglishScore();
            count++;
        }

        double avg = count > 0 ? total / count : 0;

        String performance;
        if (avg >= 8.0) performance = "Giỏi";
        else if (avg >= 6.5) performance = "Khá";
        else if (avg >= 5.0) performance = "Trung Bình";
        else performance = "Yếu";

        System.out.println("AVG = " + avg + ", Performance = " + performance);

        student.setAcademicPerformance(performance);
    }


    @Override
    public Map<String, Map<String, Long>> getPerformanceStatisticsByClass() {
        List<Student> all = studentRepo.findAll();

        return all.stream()
                .collect(Collectors.groupingBy(
                        Student::getClassName,
                        Collectors.groupingBy(
                                Student::getAcademicPerformance,
                                Collectors.counting()
                        )
                ));
    }


}
