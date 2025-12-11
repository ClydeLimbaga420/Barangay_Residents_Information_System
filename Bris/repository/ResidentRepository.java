package com.BRIS.Login.repository;

import com.BRIS.Login.entity.Resident;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public interface ResidentRepository extends JpaRepository<Resident, Long> {


    @Query("SELECT r FROM Resident r " +
            "WHERE LOWER(CONCAT(r.firstname, ' ', r.lastname)) LIKE LOWER(CONCAT('%', :keyword, '%'))" +
            "OR LOWER(r.firstname) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(r.lastname) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(r.sitio) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(r.sex) = LOWER(:keyword) " +
            "OR CAST(r.id AS string) LIKE CONCAT('%', :keyword, '%')")
    List<Resident> searchByKeyword(@Param("keyword") String keyword);

    @Query("SELECT r.sitio, COUNT(r) AS total FROM Resident r GROUP BY r.sitio ORDER BY total DESC")
    List<Object[]> getSitioPopulation();

}