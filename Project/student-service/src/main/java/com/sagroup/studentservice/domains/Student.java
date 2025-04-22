package com.sagroup.studentservice.domains;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "students")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studentNumber;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    private Double mathScore;
    private Double physicsScore;
    private Double chemistryScore;
    private Double literatureScore;
    private Double englishScore;
    private String academicPerformance;


    private String behaviorScore;
    private String className;
}
