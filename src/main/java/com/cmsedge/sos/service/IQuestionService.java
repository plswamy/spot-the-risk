package com.cmsedge.sos.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.cmsedge.sos.model.Question;

public interface IQuestionService {
	List<Question> getAllQuestions(int siteId);

	Question getQuestionById(int questionId);

	int addQuestion(Question question);

	//void updateQuestion(Question question);

	void deleteQuestion(int questionId);

	void updateQuestion(Map<String, MultipartFile> fileMap, MultipartHttpServletRequest request, Question question);
}
