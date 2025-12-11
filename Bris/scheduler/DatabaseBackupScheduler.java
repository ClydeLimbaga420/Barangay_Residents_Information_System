package com.BRIS.Login.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDate;

@Component
public class DatabaseBackupScheduler {

    @Scheduled(cron = "0 0 0 */7 * ?")
    public void backupDatabase() {

        String dbUser = "root";
        String dbPassword = "clydelimbaga123";
        String dbName = "systemdb";

        String backupFolder = "C:/Users/Admin/";

        String filename = "systembackup" + LocalDate.now() + ".sql";

        String fullPath = backupFolder + filename;

        String command = String.format(
                "mysqldump -u%s -p%s -P3307 %s -r %s",
                dbUser, dbPassword, dbName, fullPath
        );

        try {
            Process process = Runtime.getRuntime().exec(command);

            int exitCode = process.waitFor();

            if (exitCode == 0) {
                System.out.println("Backup successful: " + fullPath);
            } else {
                System.out.println("Backup failed! Error code: " + exitCode);
            }

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}
