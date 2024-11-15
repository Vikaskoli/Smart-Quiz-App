package com.genie.quiz.repo;

import com.genie.quiz.entity.JavaScriptQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JavaScriptRepo extends JpaRepository<JavaScriptQuestion, Long> {
}
