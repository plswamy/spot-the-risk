package com.cmsedge.sos.dao;

import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.cmsedge.sos.model.Answer;
import com.cmsedge.sos.model.Question;
@Transactional
@Repository
public class QuestionDAO extends JdbcDaoSupport implements IQuestionDAO{
	public JdbcTemplate jdbcTemplate;
	@Autowired
	private DataSource dataSource;

	@Autowired
	private IAnswerDAO answerDAO;

	@PostConstruct
	private void initialize() {
		setDataSource(dataSource);
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}

	@Override
	public List<Question> getAllQuestions(int siteId) {
		List<Question> questionList = new ArrayList<Question>();
		List<Answer> answerList = answerDAO.getAllAnswers(siteId);
		String sql = "select * from questions where site_id = " + siteId + " order by id";
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);
		questionList = getQuestionList(rows, questionList, answerList);
		return questionList;
	}

	@SuppressWarnings("rawtypes")
	private List<Question> getQuestionList(List<Map<String, Object>> rows, List<Question> questionList, List<Answer> answerList) {
		for (Map row : rows) {
			Question question = new Question();
			question.setId((int)row.get("id"));
			question.setContent((String)row.get("content"));
			question.setResponse((String)row.get("response"));
			question.setSiteId((int)row.get("site_id"));
			question.setAnswers(getAnswerListByQuestionId(answerList, question.getId()));
			questionList.add(question);
		}
		return questionList;
	}

	private List<Answer> getAnswerListByQuestionId(List<Answer> answerList, int questionId) {
		List<Answer> answers = new ArrayList<Answer>();
		for(Answer answer : answerList) {
			if (answer.getQuestion_id() == questionId) {
				answers.add(answer);
			}
		}
		return answers;
	}

	@SuppressWarnings("rawtypes")
	@Override
	public Question getQuestionById(int questionId) {
		List<Question> questionList = new ArrayList<Question>();
		String sql = "select * from questions where id = " + questionId;
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);
		if(rows.size() > 0) {
			for (Map row : rows) {
				Question question = new Question();
				question.setId((int)row.get("id"));
				question.setContent((String)row.get("content"));
				question.setResponse((String)row.get("response"));
				question.setSiteId((int)row.get("site_id"));
				question.setAnswers(answerDAO.getAllAnswersByQuestionId(question.getSiteId(), question.getId()));
				questionList.add(question);
			}
			return questionList.get(0);
		} else {
			return null;
		}

	}

	@Override
	public void addQuestion(Question question) {
		if (!isQuestionExists(question.getId(), question.getContent())) {
			String sql = "insert into questions (content, response, site_id) values (?,?,?)";
			int[] types = { Types.VARCHAR, Types.VARCHAR, Types.INTEGER };
			jdbcTemplate.update(sql,
					new Object[] { question.getContent(), question.getResponse(), question.getSiteId()},
					types);
		}
	}

	@Override
	public void updateQuestion(Question question) {
		if (!isQuestionExists(question.getId(), question.getContent())) {
			String sql = "update questions set content = ?, response = ?, site_id = ? where id = ?";
			int[] types = { Types.VARCHAR, Types.VARCHAR, Types.INTEGER, Types.INTEGER };
			jdbcTemplate.update(sql,
					new Object[] { question.getContent(), question.getResponse(), question.getSiteId(), question.getId()},
					types);
		}
	}

	@Override
	public void deleteQuestion(int questionId) {
		String sql = "delete from questions where id in (" + questionId + ")";
		jdbcTemplate.update(sql);
	}

	@Override
	public boolean isQuestionExists(int siteId, String content) {
		String sql = "select * from questions where site_id = ? and content = ?";
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql, new Object[] { siteId, content });
		if (rows.size() > 0)
			return true;
		else
			return false;
	}

}
