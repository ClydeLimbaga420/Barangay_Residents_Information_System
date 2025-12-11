package com.BRIS.Login.repository;

import com.BRIS.Login.entity.Resident;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewResidentRepository extends JpaRepository<Resident, Long> {

    Resident findByFirstnameAndMiddlenameAndLastnameAndSuffix(String firstname, String middlename, String lastname, String suffix);
}