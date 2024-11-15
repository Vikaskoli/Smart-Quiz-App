package com.genie.quiz.controller;

import com.genie.quiz.entity.JavaScriptQuestion;
import com.genie.quiz.service.JavaScriptQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/javascript")
public class JavaScriptController {

    @Autowired
    private JavaScriptQuestionService questionService;

    @GetMapping("/questions")
    public List<JavaScriptQuestion> getQuestions() {
        return questionService.getAllQuestions();
    }

    @PostMapping("/save")
    public JavaScriptQuestion saveQuestion(@RequestBody JavaScriptQuestion question) {
        return questionService.saveQuestion(question);
    }
}
