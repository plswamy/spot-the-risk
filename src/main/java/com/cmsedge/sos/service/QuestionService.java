package com.cmsedge.sos.service;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.nio.file.StandardOpenOption;
import java.util.List;
import java.util.Map;

import org.apache.tomcat.util.http.fileupload.servlet.ServletFileUpload;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.cmsedge.sos.dao.IAnswerDAO;
import com.cmsedge.sos.dao.IQuestionDAO;
import com.cmsedge.sos.model.Answer;
import com.cmsedge.sos.model.Question;

@Service
public class QuestionService implements IQuestionService {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(QuestionService.class);

	@Autowired
	private IQuestionDAO questionDao;
	
	@Autowired
	private IAnswerDAO answerDao;

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
	@Transactional(readOnly=false)
	public synchronized int addQuestion(Question question) {
		int questionId = questionDao.addQuestion(question);
		for(Answer answer : question.getAnswers()) {
			answerDao.addAnswer(answer);
		}
		return questionId;
	}

//	@Override
//	@Transactional(readOnly=false)
//	public void updateQuestion(Question question) {
//		questionDao.updateQuestion(question);
//		for(Answer answer : question.getAnswers()) {
//			answerDao.updateAnswer(answer);
//		}
//	}

	@Override
	@Transactional(readOnly=false)
	public void deleteQuestion(int questionId) {
		Question question = questionDao.getQuestionById(questionId);
		List<Answer> answerList = question.getAnswers();
		questionDao.deleteQuestion(questionId);
		for(Answer answer : answerList) {
			answerDao.deleteAnswer(answer.getId());
		}
	}

	@Override
	@Transactional(readOnly=false)
	public void updateQuestion(Map<String, MultipartFile> fileMap, MultipartHttpServletRequest request,Question question) {
		for(String key: fileMap.keySet()) {
			LOGGER.info("key : " + key);
			MultipartFile file = fileMap.get(key);
			String filePath = null;
			if(file!=null) {
				//String fileName = key.substring(key.indexOf("_") + 1, key.lastIndexOf("_")) + "-" + lang + "-" + id;
				String fileName = "q" + question.getId() + file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".")).toLowerCase();
				filePath =  uploadFiles(file, request, true, fileName);
			}
			question.setImage_name(filePath);
			questionDao.updateQuestion(question);
			for(Answer answer : question.getAnswers()) {
				answerDao.updateAnswer(answer);
			}
//			if(key.endsWith("-1")) { // create new images for new questions
//				MultipartFile file = fileMap.get(key);
//				if(file!=null) {
//					uploadFiles(file, request, false,null);
//				}
//			} else { // // create new images for edited questions
//				String id = key.substring(key.lastIndexOf("_") + 1);
//				
//				if(editedquestions != null) {
//					String[] editedQuestionIds = editedquestions.split("[,]");
//					for(String edidtedQuestionId : editedQuestionIds) {
//						if(id.equals(edidtedQuestionId)) {
//							MultipartFile file = fileMap.get(key);
//							if(file!=null) {
//								//String fileName = key.substring(key.indexOf("_") + 1, key.lastIndexOf("_")) + "-" + lang + "-" + id;
//								String fileName = "q" + question.getId() + file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".")).toLowerCase();
//								uploadFiles(file, request, true, null);
//							}
//						}
//					}
//				}
//			}
		}
	}

	private String uploadFiles(MultipartFile file, MultipartHttpServletRequest request, boolean isEdited, String fileName) {
		String uploadPath = null;
		try {
			String UPLOAD_DIRECTORY = "assets" + File.separator + "img" + File.separator + "question_images";
	    	String realPath = request.getRealPath("/");
	    	uploadPath = UPLOAD_DIRECTORY + File.separator + fileName;
				if (file.isEmpty()) {
					LOGGER.info("file.isEmpty");
	        }else{
	        	LOGGER.info("UPLOAD_DIRECTORY"+uploadPath);
	        	LOGGER.info("file.getOriginalFilename()"+file.getOriginalFilename());
	            byte[] bytes = file.getBytes();
	            //Path path = Paths.get(uploadPath + File.separator + fileName+file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".")).toLowerCase());
	            Path path = Paths.get(realPath + File.separator + uploadPath);
	            LOGGER.info(path.toString());
	            LOGGER.info(fileName);
	            //Path path = Paths.get(uploadPath + File.separator + fileName);
	            if(isEdited) {
	            	//Files.copy(path, path, StandardCopyOption.REPLACE_EXISTING);
	            	Files.write(path, bytes);
	            } else {
	            	Files.write(path, bytes);
	            }
	        }
			// checks if the request actually contains upload file
			if (!ServletFileUpload.isMultipartContent(request)) {
				// if not, we stop here
				LOGGER.error("Error: Form must has enctype=multipart/form-data.");
				return null;
			}
		} catch(Exception ex) {
			LOGGER.error("Error at file upload", ex);
			ex.printStackTrace();
		}
		return uploadPath;
	}
}
