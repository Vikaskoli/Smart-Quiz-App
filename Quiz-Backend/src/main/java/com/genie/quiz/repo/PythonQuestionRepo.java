package com.genie.quiz.repo;

import com.genie.quiz.entity.PythonQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PythonQuestionRepo extends JpaRepository<PythonQuestion, Long> {
}
