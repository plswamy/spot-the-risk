package com.cmsedge.sos.dao;

import java.sql.Types;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.cmsedge.sos.model.Site;
@Transactional
@Repository
public class SiteDAO extends JdbcDaoSupport implements ISiteDAO {
	public JdbcTemplate jdbcTemplate;
	@Autowired
	private DataSource dataSource;

	@PostConstruct
	private void initialize() {
		setDataSource(dataSource);
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}

	@Override
	public List<Site> getAllSites() {
		List<Site> siteList = new ArrayList<Site>();
		String sql = "select * from site where status = 'active' order by site_id";
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);
		siteList = getSiteList(rows, siteList);
		return siteList;
	}


	@SuppressWarnings("rawtypes")
	private List<Site> getSiteList(List<Map<String, Object>> rows, List<Site> siteList) {
		for (Map row : rows) {
			Site site = new Site();
			site.setSiteId((int) row.get("site_id"));
			site.setSiteName((String) row.get("site_name"));
			site.setLocale((String) row.get("locale"));
			site.setStatus((String) row.get("status"));
			siteList.add(site);
		}
		return siteList;
	}

	@Override
	public Site getSiteById(int siteId) {
		List<Site> siteList = new ArrayList<Site>();
		String sql = "select * from site where status = 'active' and site_id = " + siteId + " order by site_id";
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);
		siteList = getSiteList(rows, siteList);
		if (siteList.size() > 0)
			return siteList.get(0);
		else
			return null;
	}

	@Override
	public void addSite(Site site) {
		//if (!isSiteExists(site.getSiteName())) {
			String sql = "insert into site (site_name, locale, created_at, status) values (?,?,?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR, Types.TIMESTAMP, Types.VARCHAR };
			jdbcTemplate.update(sql,
					new Object[] { site.getSiteName(), site.getLocale(), new Date(), site.getStatus() },
				types);
		// }new Object[] { Types.VARCHAR, Types.VARCHAR, Types.TIMESTAMP,
		// Types.VARCHAR }
	}

	@Override
	public void updateSite(Site site) {
		//if (!isSiteExists(site.getSiteName())) {
			String sql = "update site set site_name = ? , locale = ? , status = ? where site_id = ?";
		int[] types = { Types.VARCHAR, Types.VARCHAR, Types.VARCHAR, Types.INTEGER };
			jdbcTemplate.update(sql,
					new Object[] { site.getSiteName(), site.getLocale(), site.getStatus(), site.getSiteId() },
				types);
		//}
	}

	@Override
	public void deleteSite(int siteId) {
		String sql = "delete from questions where id in (" + siteId + ")";
		jdbcTemplate.update(sql);
	}

	@Override
	public boolean isSiteExists(String siteName) {
		String sql = "select * from site where status = 'active' and site_name = '" + siteName + "' order by site_id";
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);
		if (rows.size() > 0) {
			return false;
		} else {
			return true;
		}
	}

	@Override
	public List<String> getAllLocale() {

		List<String> siteList = new ArrayList<>();
		String sql = "select locale from site where status = 'active' order by site_id";
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);
		for (Map row : rows) {
			siteList.add((String) row.get("locale"));
		}
		return siteList;
	}

}
