package com.cmsedge.sos.service;

import java.util.List;

import com.cmsedge.sos.model.Answer;

public interface IAnswerService {
	List<Answer> getAllAnswers(int siteId);

	List<Answer> getAllAnswersByQuestionId(int siteId, int questionId);

	Answer getAnswerById(int answerId);

	boolean addAnswer(Answer answer);

	void updateAnswer(Answer answer);

	void deleteAnswer(int answerId);
}
