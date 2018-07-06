package com.cmsedge.sos.service;

import java.util.List;

import com.cmsedge.sos.model.Question;

public interface IQuestionService {
	List<Question> getAllQuestions(int siteId);

	Question getQuestionById(int questionId);

	boolean addQuestion(Question question);

	void updateQuestion(Question question);

	void deleteQuestion(int questionId);
}
