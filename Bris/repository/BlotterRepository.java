package com.BRIS.Login.repository;

import com.BRIS.Login.entity.Blotter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlotterRepository extends JpaRepository<Blotter, Long> {

    @Query("""
        SELECT r FROM Blotter r 
        WHERE LOWER(CONCAT(r.blotteredFirstName, ' ', r.blotteredLastName)) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(r.blotteredFirstName) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(r.blotteredLastName) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(r.blotterStatus) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(r.caseNo) LIKE LOWER(CONCAT('%', :keyword, '%'))
        ORDER BY r.dateOfComplain DESC, r.id DESC
    """)
    List<Blotter> findAllByKeyword(@Param("keyword") String keyword);

    List<Blotter> findAllByOrderByDateOfComplainDescIdDesc();
}
