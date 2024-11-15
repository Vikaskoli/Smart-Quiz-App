package com.genie.quiz.controller;

import com.genie.quiz.entity.JavaQuestion;
import com.genie.quiz.service.JavaQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/java")
public class JavaController {

    @Autowired
    private JavaQuestionService questionService;

    @GetMapping("/questions")
    public List<JavaQuestion> getQuestions() {
        return questionService.getAllQuestions();
    }

    @PostMapping("/save")
    public JavaQuestion saveQuestion(@RequestBody JavaQuestion question) {
        return questionService.saveQuestion(question);
    }
}