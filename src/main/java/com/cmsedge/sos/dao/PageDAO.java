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

import com.cmsedge.sos.model.Page;
import com.cmsedge.sos.model.Question;

@Transactional
@Repository
public class PageDAO extends JdbcDaoSupport implements IPageDAO {

	public JdbcTemplate jdbcTemplate;

	@Autowired
	private DataSource dataSource;

	@Autowired
	private ILinkDAO linkDAO;

	@Autowired
	private ILeaderboardDAO leaderboardDAO;

	@Autowired
	private IInfoDAO infoDAO;

	@PostConstruct
	private void initialize() {
		setDataSource(dataSource);
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}

	@Override
	public List<Page> getPageData(int siteId) {
		List<Page> pageList = new ArrayList<Page>();
		String sql = "select * from page where site_id = " + siteId;
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);
		pageList = getPageList(rows, pageList);
		if (pageList.size() > 0) {
			return pageList;
		} else {
			return null;
		}
	}

	@SuppressWarnings("rawtypes")
	private List<Page> getPageList(List<Map<String, Object>> rows, List<Page> pageList) {
		if (rows.size() > 0) {
			for (Map row : rows) {
				String lb = "leaderboard";
				Page page = new Page();
				page.setId((Integer) row.get("id"));
				page.setSiteId((Integer) row.get("site_id"));
				page.setPageName((String) row.get("pageName"));
				page.setTitle((String) row.get("title"));
				page.setPageTitle((String) row.get("page_title"));
				page.setHeading1((String) row.get("heading1"));
				page.setHeading2Black((String) row.get("heading2_black"));
				page.setHeading2White((String) row.get("heading2_white"));
				page.setHeading3((String) row.get("heading3"));
				page.setInfo(infoDAO.getInfo(page.getId(), page.getSiteId()));
				if (page.getPageName().equals(lb)) {
					page.setLeaderboardTable(leaderboardDAO.getTop10Records());
				}
				page.setStatus((String) row.get("status"));
				page.setLinks(linkDAO.getAllLinksByPageId(page.getId()));
				pageList.add(page);
			}
			return pageList;
		} else {
			return null;
		}
	}
	@Override
	public Page getPageById(int pageId) {
		List<Page> pageList = new ArrayList<Page>();
		String sql = "select * from page where id = " + pageId;
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);
		if(rows.size() > 0) {
			for (Map row : rows) {
				Page page = new Page();
				page.setId((Integer) row.get("id"));
				page.setSiteId((Integer) row.get("site_id"));
				page.setPageName((String) row.get("pageName"));
				page.setTitle((String) row.get("title"));
				page.setPageTitle((String) row.get("page_title"));
				page.setHeading1((String) row.get("heading1"));
				page.setHeading2Black((String) row.get("heading2_black"));
				page.setHeading2White((String) row.get("heading2_white"));
				page.setHeading3((String) row.get("heading3"));
				page.setInfo(infoDAO.getInfo(page.getId(), page.getSiteId()));
				page.setStatus((String) row.get("status"));
				page.setLinks(linkDAO.getAllLinksByPageId(page.getId()));
				pageList.add(page);
			}
			return pageList.get(0);
		} else {
			return null;
		}
	}
	@Override
	public int addPage(Page page) {
		String sql = "insert into page (pageName, page_title, title, heading1, heading2_black, heading2_white, heading3, site_id, status) values (?,?,?,?,?,?,?,?,?)";
//		int[] types = { Types.VARCHAR, Types.VARCHAR, Types.VARCHAR, Types.VARCHAR, Types.VARCHAR, Types.VARCHAR, Types.VARCHAR, Types.INTEGER, Types.VARCHAR};
//		int rows = jdbcTemplate.update(sql, new Object[] {page.getPageName(), page.getPageTitle(), page.getHeading1(), page.getHeading2Black(), page.getHeading2White(), page.getHeading3(), page.getSiteId(), page.getStatus()}, types);
		
		KeyHolder holder = new GeneratedKeyHolder();
		int rows = jdbcTemplate.update(new PreparedStatementCreator() {
			@Override
			public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
				PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
				ps.setString(1, page.getPageName());
				ps.setString(2, page.getPageTitle());
				ps.setString(3, page.getTitle());
				ps.setString(4, page.getHeading1());
				ps.setString(5, page.getHeading2Black());
				ps.setString(6, page.getHeading2White());
				ps.setString(7, page.getHeading3());
				ps.setInt(8, page.getSiteId());
				ps.setString(9, page.getStatus());
				return ps;
			}
		}, holder);
		if(rows>0) return holder.getKey().intValue();
		else return 0;
	}

	@Override
	public void updatePage(Page page) {
		String sql = "update page set pageName = ?, page_title = ?, title = ?, heading1 = ?, heading2_black = ?, heading2_white = ?, heading3 = ?, site_id = ?, status = ? where id = ?";
		int[] types = { Types.VARCHAR, Types.VARCHAR, Types.VARCHAR, Types.VARCHAR, Types.VARCHAR, Types.VARCHAR, Types.VARCHAR, Types.INTEGER, Types.VARCHAR, Types.INTEGER};
		jdbcTemplate.update(sql, new Object[] {page.getPageName(), page.getPageTitle(), page.getTitle() , page.getHeading1(), page.getHeading2Black(), page.getHeading2White(), page.getHeading3(), page.getSiteId(), page.getStatus(), page.getId()}, types);
	}

	@Override
	public void deletePage(int pageId) {
		String sql = "update page set status = 'disabled' where id = " + pageId;
		jdbcTemplate.update(sql);
	}

}
