package com.cmsedge.sos.dao;

import java.util.List;

import com.cmsedge.sos.model.Answer;

public interface IAnswerDAO {
	List<Answer> getAllAnswers(int siteId);

	List<Answer> getAllAnswersByQuestionId(int siteId, int questionId);

	Answer getAnswerById(int answerId);

	int addAnswer(Answer answer);

	void updateAnswer(Answer answer);

	void deleteAnswer(int answerId);

	boolean isAnswerExists(int siteId, String content);
}
