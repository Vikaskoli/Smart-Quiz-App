package com.genie.quiz.repo;

import com.genie.quiz.entity.JavaQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JavaQuestionRepo extends JpaRepository<JavaQuestion, Long> {
}