package com.hackthone.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hackthone.entity.User;
public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email);

    User findByEmail(String email);
}