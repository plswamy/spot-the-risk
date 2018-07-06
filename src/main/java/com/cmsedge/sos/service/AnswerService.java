package com.cmsedge.sos.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cmsedge.sos.dao.IAnswerDAO;
import com.cmsedge.sos.model.Answer;

@Service
public class AnswerService implements IAnswerService {

	@Autowired
	private IAnswerDAO answerDao;

	@Override
	public List<Answer> getAllAnswers(int siteId) {
		return answerDao.getAllAnswers(siteId);
	}

	@Override
	public List<Answer> getAllAnswersByQuestionId(int siteId, int questionId) {
		return answerDao.getAllAnswersByQuestionId(siteId, questionId);
	}

	@Override
	public Answer getAnswerById(int answerId) {
		return answerDao.getAnswerById(answerId);
	}

	@Override
	public synchronized boolean addAnswer(Answer answer) {
		if (answerDao.isAnswerExists(answer.getSiteId(), answer.getContent())) {
			return false;
		} else {
			answerDao.addAnswer(answer);
			return true;
		}
	}

	@Override
	public void updateAnswer(Answer answer) {
		answerDao.updateAnswer(answer);
	}

	@Override
	public void deleteAnswer(int answerId) {
		answerDao.deleteAnswer(answerId);
	}
}
