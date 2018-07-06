package com.cmsedge.sos.dao;

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
	public boolean addLink(Link link) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void updateLink(Link link) {
		// TODO Auto-generated method stub

	}

	@Override
	public void deleteLink(int linkId) {
		// TODO Auto-generated method stub

	}

}
