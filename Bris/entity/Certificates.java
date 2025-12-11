package com.BRIS.Login.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "certificates")
public class Certificates {

    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "certificate_id")
    private Long id;

    @Getter
    @Setter
    @Column(name = "issue_date")
    private LocalDate issueDate;

    @Getter
    @Setter
    @Column(name = "certificates_choice")
    private String certificate;

    @Getter
    @Setter
    @Column(name = "purpose")
    private String purpose;

    @Getter
    @Setter
    @Column(name = "full_name")
    private String fullname;

    @Getter
    @Setter
    @Column(name = "age")
    private String age;

    @Getter
    @Setter
    @Column(name = "sitio")
    private String sitio;



}
