package com.genie.quiz.service;

import com.genie.quiz.entity.JavaScriptQuestion;
import com.genie.quiz.repo.JavaScriptRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JavaScriptQuestionService {

    @Autowired
    private JavaScriptRepo questionRepo;

    public List<JavaScriptQuestion> getAllQuestions() {
        return questionRepo.findAll();
    }

    public JavaScriptQuestion saveQuestion(JavaScriptQuestion question) {
        return questionRepo.save(question);
    }

    public List<JavaScriptQuestion> saveQuestions(List<JavaScriptQuestion> questions) {
        return questionRepo.saveAll(questions);
    }
}
