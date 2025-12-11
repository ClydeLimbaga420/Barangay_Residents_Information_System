package com.BRIS.Login.entity;

import jakarta.persistence.*;
import lombok.Setter;
import lombok.Getter;

import java.util.Date;


@Entity
@Table(name = "history")
public class History {


    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "history_no")
    private Long Id;


    @Getter
    @Setter
    @Column(name = "history_table", nullable = false)
    private String historyTable;

    @Getter
    @Setter
    @Column(name = "date", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    @PrePersist
    protected void onCreate() {
        this.date = new Date();
    }


    public History() {}

    public History(String historyTable) {
        this.historyTable = historyTable;

    }



}
