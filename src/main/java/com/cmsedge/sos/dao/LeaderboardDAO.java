package com.cmsedge.sos.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import javax.annotation.PostConstruct;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.cmsedge.sos.model.Leaderboard;

@Transactional
@Repository
public class LeaderboardDAO extends JdbcDaoSupport implements ILeaderboardDAO {

	public JdbcTemplate jdbcTemplate;

	@Autowired
	private DataSource dataSource;

	@PostConstruct
	private void initialize() {
		setDataSource(dataSource);
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}

	/*@Override
	public List<Leaderboard> getTop10Records() {
		List<Leaderboard> leaderboardList = new ArrayList<Leaderboard>();
		String sql = "select score,name from leaderboard order by score desc limit 10";
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);
		leaderboardList = getLeaderboardList(rows, leaderboardList);
		return leaderboardList;
	}*/
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Leaderboard> getTop10Records() {
		List<Leaderboard> leaderboardList = new ArrayList<Leaderboard>();
		SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withProcedureName("load_leaderboard");
		SqlParameterSource in=  new MapSqlParameterSource();
		Map<String, Object> result = jdbcCall.execute(in);
		List<Map<String,Object>> rows = (List<Map<String, Object>>) result.get("#result-set-1");
		leaderboardList = getLeaderboardList(rows, leaderboardList);
		return leaderboardList;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Leaderboard> loadQuizLeaderboard(int id) {
		List<Leaderboard> leaderboardList = new ArrayList<Leaderboard>();
		SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withProcedureName("load_scores");
		SqlParameterSource in=  new MapSqlParameterSource().addValue("user_id", id);
		Map<String, Object> result = jdbcCall.execute(in);
		List<Map<String,Object>> rows = (List<Map<String, Object>>) result.get("#result-set-1");
		leaderboardList = getLeaderboardList(rows, leaderboardList);
		return leaderboardList;
	}

	@SuppressWarnings("rawtypes")
	private List<Leaderboard> getLeaderboardList(List<Map<String, Object>> rows, List<Leaderboard> leaderboardList) {
		//int rank = 1;
		for (Map row : rows) {
			Object rank= row.get("rankof");
			
			String rankText = (rank.toString().length() < 2 ? "0" : "") + rank;
			 
			Leaderboard leaderboard = new Leaderboard();
			leaderboard.setId(rankText);
			leaderboard.setScore((int) row.get("score"));
			leaderboard.setName((String) row.get("name"));
			leaderboardList.add(leaderboard);
			//rank++;
		}
		return leaderboardList;
	}
	
	@SuppressWarnings("rawtypes")
	private int getList(List<Map<String, Object>> rows, List<Leaderboard> leaderboardList) {
		int userId = 0;
		for (Map row : rows) {
			userId =  (int) row.get("id");
			/*Leaderboard leaderboard = new Leaderboard();
			leaderboard.setId((String)id);
			leaderboard.setScore((int) row.get("score"));
			leaderboard.setName((String) row.get("name"));
			leaderboardList.add(leaderboard);*/
			
		}
		return userId;
	}
	@Override
	public int addResult(Leaderboard leaderboard) {
		String sql = "insert into leaderboard (name,country,company,email,score,total_questions,true_questions,time,agreed_comms,terms_conditions) values (?,?,?,?,?,?,?,?,?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR, Types.VARCHAR, Types.VARCHAR, Types.INTEGER, Types.INTEGER, Types.INTEGER,
				Types.INTEGER,Types.TINYINT,Types.TINYINT };
		int abc = jdbcTemplate.update(sql,
				new Object[] { leaderboard.getName(), leaderboard.getCountry(), leaderboard.getCompany(), leaderboard.getEmail(),
						leaderboard.getScore(), leaderboard.getTotalQuestions(), leaderboard.getTrueQuestions(),
						leaderboard.getTime(),leaderboard.isAgreedComms(),leaderboard.isTncAcceptance() },
				types);
		
		if(abc!=0) {
			String idSql="select * from leaderboard where name=? and country=? and email=? order by id desc limit 1";
			List<Map<String, Object>> rows = jdbcTemplate.queryForList(idSql,new Object[] {leaderboard.getName(),leaderboard.getCountry(),leaderboard.getEmail()});
			int userId=getList(rows, new ArrayList<Leaderboard>());
			return userId;
		}
		return 0;
	}
	@Override
	public Leaderboard getLeaderboardById(int userId) {
		List<Leaderboard> lList = new ArrayList<Leaderboard>();
		List<Map<String,Object>> leaderboardList = new ArrayList<Map<String,Object>>();
		String sql = "select * from leaderboard where id =" + userId;
		leaderboardList = jdbcTemplate.queryForList(sql);
		for(Map<String,Object> row : leaderboardList) {
			Leaderboard leaderboard = new Leaderboard();
			leaderboard.setId((((Integer) row.get("id"))).toString());
			leaderboard.setName((String) row.get("name"));
			leaderboard.setEmail((String) row.get("email"));
			leaderboard.setCountry((String) row.get("country"));
			leaderboard.setCompany((String) row.get("company"));
			leaderboard.setScore((int) row.get("score"));
			leaderboard.setTotalQuestions((int) row.get("total_questions"));
			leaderboard.setTrueQuestions((int) row.get("true_questions"));
			leaderboard.setTime((int) row.get("time"));
			leaderboard.setAgreedComms((boolean)row.get("agreed_comms"));
			leaderboard.setTncAcceptance((boolean)row.get("terms_conditions"));
			lList.add(leaderboard);
		}
		if (lList.size() > 0)
			return lList.get(0);
		else
			return null;
	}
	@Override
	public int addLeaderboard(Leaderboard leaderboard) {
		String sql = "insert into leaderboard (name, country, email, score, total_questions, true_questions, time, site_id) values (?,?,?,?,?,?,?,?)";
		KeyHolder holder = new GeneratedKeyHolder();
		int rows = jdbcTemplate.update(new PreparedStatementCreator() {
			@Override
			public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
				PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
				ps.setString(1, leaderboard.getName());
				ps.setString(2, leaderboard.getCountry());
				ps.setString(3, leaderboard.getEmail());
				ps.setLong(4, leaderboard.getScore()); 
				ps.setInt(5, leaderboard.getTotalQuestions());
				ps.setInt(6, leaderboard.getTrueQuestions()); 
				ps.setInt(7, leaderboard.getTime()); 
				ps.setInt(8, leaderboard.getSiteId());
				return ps;
			}
		}, holder);
		if(rows>0) return holder.getKey().intValue();
		else return 0;
	}

	@Override
	public void updateLeaderboard(Leaderboard leaderboard) {
		String sql = "update leaderboard set name = ?, country = ?, email = ?, score = ?, total_questions = ?, true_questions = ?, time = ?, site_id = ? where id = ?";
		int[] types = { Types.VARCHAR, Types.VARCHAR, Types.VARCHAR, Types.INTEGER, Types.INTEGER, Types.INTEGER, Types.INTEGER, Types.INTEGER, Types.INTEGER};
		jdbcTemplate.update(sql, new Object[] { leaderboard.getName(), leaderboard.getCountry(), leaderboard.getEmail(), leaderboard.getScore(), leaderboard.getTotalQuestions(),leaderboard.getTrueQuestions(), leaderboard.getTime(), leaderboard.getSiteId(), leaderboard.getId()}, types);
	}
	@Override
	public void deleteLeaderboard(int leaderboardId) {
		String sql = "delete from leaderboard where id in (" + leaderboardId + ")";
		jdbcTemplate.update(sql);
	}
	

}
