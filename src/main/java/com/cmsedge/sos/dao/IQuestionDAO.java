package com.cmsedge.sos.dao;

import java.util.List;

import com.cmsedge.sos.model.Question;

public interface IQuestionDAO {
	List<Question> getAllQuestions(int siteId);

	Question getQuestionById(int questionId);

	void addQuestion(Question question);

	void updateQuestion(Question question);

	void deleteQuestion(int questionId);

	boolean isQuestionExists(int siteId, String content);
}
