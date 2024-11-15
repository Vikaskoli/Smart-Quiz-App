package com.genie.quiz.service;

import com.genie.quiz.entity.PythonQuestion;
import com.genie.quiz.repo.PythonQuestionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PythonQuestionService {

    @Autowired
    private PythonQuestionRepo questionRepo;

    public List<PythonQuestion> getAllQuestions() {
        return questionRepo.findAll();
    }

    public PythonQuestion saveQuestion(PythonQuestion question) {
        return questionRepo.save(question);
    }

    public List<PythonQuestion> saveQuestions(List<PythonQuestion> questions) {
        return questionRepo.saveAll(questions);
    }
}
