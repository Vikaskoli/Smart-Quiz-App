package com.genie.quiz.controller;

import com.genie.quiz.entity.PythonQuestion;
import com.genie.quiz.service.PythonQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/python")
public class PythonController {

    @Autowired
    private PythonQuestionService questionService;

    @GetMapping("/questions")
    public List<PythonQuestion> getQuestions() {
        return questionService.getAllQuestions();
    }

    @PostMapping("/save")
    public PythonQuestion saveQuestion(@RequestBody PythonQuestion question) {
        return questionService.saveQuestion(question);
    }
}
