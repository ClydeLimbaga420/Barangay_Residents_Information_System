package com.BRIS.Login.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "residents_details")
public class Resident {

    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "residents_id")
    private Long id;

    @Getter
    @Setter
    @Column(name = "first_name")
    private String firstname;

    @Getter
    @Setter
    @Column(name = "middle_name")
    private String middlename;

    @Getter
    @Setter
    @Column(name = "last_name")
    private String lastname;

    @Getter
    @Setter
    @Column(name = "suffix")
    private String suffix;

    @Getter
    @Setter
    @Column(name = "birthdate")
    private LocalDate birthdate;

    @Getter
    @Setter
    @Column(name = "age")
    private int age;

    @Getter
    @Setter
    @Column(name = "sex")
    private String sex;

    @Getter
    @Setter
    @Column(name = "civil_status")
    private String civilstatus;

    @Getter
    @Setter
    @Column(name = "occupation")
    private String occupation;

    @Getter
    @Setter
    @Column(name = "educational_attainment")
    private String education;

    @Getter
    @Setter
    @Column(name = "no_household")
    private String household;

    @Getter
    @Setter
    @Column(name = "contact_number")
    private String contactnumber;

    @Getter
    @Setter
    @Column(name = "email_address")
    private String email;

    @Getter
    @Setter
    @Column(name = "religion")
    private String religion;

    @Getter
    @Setter
    @Column(name = "sitio")
    private String sitio;

    @Getter
    @Setter
    @Column(name = "voter_status")
    private String voterstatus;

    @Getter
    @Setter
    @Column(name = "PWD")
    private boolean pwd;

    @Getter
    @Setter
    @Column(name = "blood_type")
    private String bloodtype;

    @Getter
    @Setter
    @Column(name = "senior")
    private Boolean senior;

    @Getter
    @Setter
    @Lob
    @Column(name = "residents_photo")
    private byte[] photo;

    @Getter
    @Setter
    @Column(name = "conditions")
    private String condition;


}