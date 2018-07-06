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

import com.cmsedge.sos.model.Page;

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

}
