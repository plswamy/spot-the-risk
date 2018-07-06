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
@Transactional
@Repository
public class AnswerDAO extends JdbcDaoSupport implements IAnswerDAO {

	public JdbcTemplate jdbcTemplate;
	@Autowired
	private DataSource dataSource;

	@PostConstruct
	private void initialize() {
		setDataSource(dataSource);
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}

	@Override
	public List<Answer> getAllAnswers(int siteId) {
		List<Answer> answerList = new ArrayList<Answer>();
		String sql = "select * from answers where site_id = " + siteId + " order by id";
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);
		answerList = getAnswerList(rows, answerList);
		return answerList;
	}

	@SuppressWarnings("rawtypes")
	private List<Answer> getAnswerList(List<Map<String, Object>> rows, List<Answer> answerList) {
		for (Map row : rows) {
			Answer answer = new Answer();
			answer.setId((int) row.get("id"));
			answer.setContent((String) row.get("content"));
			answer.setResponse((String) row.get("response"));
			answer.setQuestion_id((int) row.get("question_id"));
			answer.setIs_correct((Boolean) row.get("is_correct") == true ? "1" : "0");
			answer.setSiteId((int) row.get("site_id"));
			answerList.add(answer);
		}
		return answerList;
	}

	@Override
	public List<Answer> getAllAnswersByQuestionId(int siteId, int questionId) {
		List<Answer> answerList = new ArrayList<Answer>();
		String sql = "select * from answers where site_id = " + siteId + " and question_id = " + questionId + " order by id";
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);
		answerList = getAnswerList(rows, answerList);
		System.out.println(answerList);
		return answerList;
	}

	@Override
	public Answer getAnswerById(int answerId) {
		List<Answer> answerList = new ArrayList<Answer>();
		String sql = "select * from answers where id = " + answerId;
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);
		answerList = getAnswerList(rows, answerList);
		if (answerList.size() > 0)
			return answerList.get(0);
		else
			return null;
	}

	@Override
	public void addAnswer(Answer answer) {
		if (!isAnswerExists(answer.getSiteId(), answer.getContent())) {
			String sql = "insert into answers (content, response, is_correct, question_id, site_id) values (?,?,?,?,?,?)";
			int[] types = { Types.VARCHAR, Types.VARCHAR, Types.BOOLEAN, Types.INTEGER, Types.INTEGER };
			jdbcTemplate.update(sql,
					new Object[] { answer.getContent(), answer.getResponse(), answer.getIs_correct(),
							answer.getQuestion_id(), answer.getSiteId() },
					types);
		}
	}

	@Override
	public void updateAnswer(Answer answer) {
		if (!isAnswerExists(answer.getSiteId(), answer.getContent())) {
			String sql = "update answers set content = ?, response = ?, is_correct = ?, question_id = ?, site_id = ? where id = ?";
			int[] types = { Types.VARCHAR, Types.VARCHAR, Types.BOOLEAN, Types.INTEGER, Types.INTEGER, Types.INTEGER };
			jdbcTemplate.update(sql,
					new Object[] { answer.getContent(), answer.getResponse(), answer.getIs_correct(),
							answer.getQuestion_id(), answer.getSiteId(), answer.getId() },
					types);
		}
	}

	@Override
	public void deleteAnswer(int answerId) {
		String sql = "delete from answers where id in (" + answerId + ")";
		jdbcTemplate.update(sql);
	}

	@Override
	public boolean isAnswerExists(int siteId, String content) {
		String sql = "select * from answers where site_id = ? and content = ?";
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql, new Object[] { siteId, content });
		if (rows.size() > 0)
			return true;
		else
			return false;
	}

}
