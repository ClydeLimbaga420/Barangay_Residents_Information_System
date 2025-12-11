package com.BRIS.Login.service;

import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

@Service
public class UpdateService {

    private Connection sql() throws Exception {

        String url = "jdbc:mysql://localhost:3307/systemdb";
        String username = "root";
        String password = "clydelimbaga123";
        return DriverManager.getConnection(url, username, password);
    }

    public void updateData() {
        try (Connection con = sql();
             Statement stmt = con.createStatement()) {

            int updated = stmt.executeUpdate(
                    "UPDATE residents_details SET age = TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) WHERE conditions = 'alive'"
            );
            updated += stmt.executeUpdate(
                    "UPDATE residents_details SET senior = 'yes' WHERE age >= 60"
            );

            if (updated > 0) {
                System.out.println("Residents data updated successfully.");
            } else {
                System.out.println("No updates were made.");
            }

        } catch (Exception e) {
            System.out.println("Error updating residents: " + e.getMessage());
        }
    }
}
