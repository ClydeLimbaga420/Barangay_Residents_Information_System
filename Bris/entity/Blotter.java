package com.BRIS.Login.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "blotter")
public class Blotter {

    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "record_num")
    private Long id;

    @Getter
    @Setter
    @Column(name = "complainant_first_name")
    private String complainantFirstName;

    @Getter
    @Setter
    @Column(name = "complainant_middle_name")
    private String complainantMiddleName;

    @Getter
    @Setter
    @Column(name = "complainant_last_name")
    private String complainantLastName;

    @Getter
    @Setter
    @Column(name = "complainant_contact")
    private String complainantContact;

    @Getter
    @Setter
    @Column(name = "complainant_age")
    private String complainantAge;

    @Getter
    @Setter
    @Column(name = "complainant_address")
    private String complainantAddress;

    @Getter
    @Setter
    @Column(name = "blottered_first_name")
    private String blotteredFirstName;

    @Getter
    @Setter
    @Column(name = "blottered_middle_name")
    private String blotteredMiddleName;

    @Getter
    @Setter
    @Column(name = "blottered_last_name")
    private String blotteredLastName;

    @Getter
    @Setter
    @Column(name = "complained_contact")
    private String complainedContact;

    @Getter
    @Setter
    @Column(name = "complained_age")
    private String complainedAge;

    @Getter
    @Setter
    @Column(name = "complained_address")
    private String complainedAddress;

    @Getter
    @Setter
    @Column(name = "case_no")
    private String caseNo;

    @Getter
    @Setter
    @Column(name = "date_of_complain")
    private LocalDate dateOfComplain;

    @Getter
    @Setter
    @Column(name = "blotter_status")
    private String blotterStatus;

    @Getter
    @Setter
    @Column(name = "location_of_incidence")
    private String locationOfIncidence;

    @Getter
    @Setter
    @Column(name = "officer_in_charge")
    private String officerInCharge;

    @Getter
    @Setter
    @Column(name = "statement_of_complain")
    private String statementOfComplain;

    @Getter
    @Setter
    @Column(name = "action_taken")
    private String actionTaken;

    @Getter
    @Setter
    @Column(name = "case_level")
    private String caseLevel;
}
