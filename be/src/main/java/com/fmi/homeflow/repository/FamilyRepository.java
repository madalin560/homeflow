package com.fmi.homeflow.repository;

import com.fmi.homeflow.model.Family;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface FamilyRepository extends JpaRepository<Family, UUID> {
}
