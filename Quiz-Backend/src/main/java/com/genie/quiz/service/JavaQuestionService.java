package com.genie.quiz.service;

import com.genie.quiz.entity.JavaQuestion;
import com.genie.quiz.repo.JavaQuestionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JavaQuestionService {

    @Autowired
    private JavaQuestionRepo questionRepo;

    public List<JavaQuestion> getAllQuestions() {
        return questionRepo.findAll();
    }

    public JavaQuestion saveQuestion(JavaQuestion question) {
        return questionRepo.save(question);
    }

    public List<JavaQuestion> saveQuestions(List<JavaQuestion> questions) {
        return questionRepo.saveAll(questions);
    }
}