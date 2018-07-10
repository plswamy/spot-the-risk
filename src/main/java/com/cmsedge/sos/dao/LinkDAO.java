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
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.cmsedge.sos.model.Link;

@Transactional
@Repository
public class LinkDAO extends JdbcDaoSupport implements ILinkDAO {

	public JdbcTemplate jdbcTemplate;

	@Autowired
	private DataSource dataSource;

	@PostConstruct
	private void initialize() {
		setDataSource(dataSource);
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}

	@Override
	public List<Link> getAllLinksByPageId(int pageId) {
		List<Link> linksList = new ArrayList<Link>();
		String sql = "select * from link where pageid = " + pageId + " order by id";
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);
		linksList = getLinksList(rows, linksList);
		return linksList;
	}

	@SuppressWarnings("rawtypes")
	private List<Link> getLinksList(List<Map<String, Object>> rows, List<Link> linksList) {
		for (Map row : rows) {
			Link link = new Link();
			link.setId((int) row.get("id"));
			link.setLinkText((String) row.get("linktext"));
			link.setTitle((String) row.get("title"));
			link.setLinkSrc((String) row.get("linksrc"));
			link.setTarget((String) row.get("target"));
			link.setPageId((Integer) row.get("pageid"));
			linksList.add(link);
		}
		return linksList;
	}

	@Override
	public Link getLinkById(int linkId) {
		List<Link> linksList = new ArrayList<Link>();
		String sql = "select * from link where id = " + linkId;
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);
		linksList = getLinksList(rows, linksList);
		if (linksList.size() > 0) {
			return linksList.get(0);
		}
		else {
		return null;
		}
	}

	@Override
	public int addLink(Link link) {
		String sql = "insert into link (title, linkText, linkSrc, target, pageid) values (?,?,?,?,?)";
//		int[] types = { Types.VARCHAR, Types.VARCHAR, Types.VARCHAR, Types.VARCHAR, Types.INTEGER };
//		int rows = jdbcTemplate.update(sql,new Object[] { link.getTitle(), link.getLinkText(), link.getLinkSrc(), link.getTarget(),link.getPageId()},types);
		KeyHolder holder = new GeneratedKeyHolder();
		int rows = jdbcTemplate.update(new PreparedStatementCreator() {
			@Override
			public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
				PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
				ps.setString(1, link.getTitle());
				ps.setString(2, link.getLinkText());
				ps.setString(3, link.getLinkSrc());
				ps.setString(4, link.getTarget());
				ps.setInt(5, link.getPageId());
				return ps;
			}
		}, holder);
		if(rows>0) return holder.getKey().intValue();
		else return 0;
	}

	@Override
	public void updateLink(Link link) {
		String sql = "update link set title = ?, linkText = ?, linkSrc = ?, target = ?, pageid = ? where id = ?";
		int[] types = { Types.VARCHAR, Types.VARCHAR, Types.VARCHAR, Types.VARCHAR, Types.INTEGER, Types.INTEGER };
		jdbcTemplate.update(sql,
				new Object[] { link.getTitle(), link.getLinkText(), link.getLinkSrc(), link.getTarget(),link.getPageId(), link.getId()},
				types);

	}

	@Override
	public void deleteLink(int linkId) {
		String sql = "delete from link where id in (" + linkId + ")";
		jdbcTemplate.update(sql);
	}

}
