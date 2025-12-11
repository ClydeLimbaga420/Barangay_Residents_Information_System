package com.BRIS.Login.repository;

import com.BRIS.Login.entity.History;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HistoryRepository extends JpaRepository<History, Long> {
    List<History> findAllByOrderByIdDesc();
}
