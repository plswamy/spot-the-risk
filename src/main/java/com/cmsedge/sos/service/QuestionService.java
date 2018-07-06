package com.cmsedge.sos.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cmsedge.sos.dao.IQuestionDAO;
import com.cmsedge.sos.model.Question;

@Service
public class QuestionService implements IQuestionService {

	@Autowired
	private IQuestionDAO questionDao;

	@Override
	public List<Question> getAllQuestions(int siteId) {
		List<Question> questionsList = questionDao.getAllQuestions(siteId);
		return questionsList;
	}

	@Override
	public Question getQuestionById(int questionId) {
		return questionDao.getQuestionById(questionId);
	}

	@Override
	public synchronized boolean addQuestion(Question question) {
		if (questionDao.isQuestionExists(question.getSiteId(), question.getContent())) {
			return false;
		} else {
			questionDao.addQuestion(question);
			return true;
		}
	}

	@Override
	public void updateQuestion(Question question) {
		questionDao.updateQuestion(question);
	}

	@Override
	public void deleteQuestion(int questionId) {
		questionDao.deleteQuestion(questionId);
	}

}
