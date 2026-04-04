//package com.hackthone.configurations;
//
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//import com.hackthone.domain.UserRole;
//import com.hackthone.entity.User;
//import com.hackthone.repository.UserRepository;
//
//@Configuration
//public class AdminInitializer {
//
//    @Bean
//    CommandLineRunner createAdmin(
//            UserRepository userRepository,
//            PasswordEncoder passwordEncoder
//    ) {
//        return args -> {
//               
//            String adminEmail = "golusiddharth88@gmail.com";
//
//            // already admin hai to kuch mat karo
//            if (userRepository.existsByEmail(adminEmail)) {
//                return;
//            }
//
//            User admin = new User();
//            admin.setFullName("Super Admin");
//            admin.setPhoneNumber("7782949175");
//            admin.setEmail(adminEmail);
//            admin.setPassword(passwordEncoder.encode("admin@123"));
//            admin.setRole(UserRole.ADMIN);
//            admin.setEmailVerified(true);
//            userRepository.save(admin);
//
//            System.out.println("ADMIN CREATED SUCCESSFULLY");
//        };
//    }
//}
