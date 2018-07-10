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

import com.cmsedge.sos.model.Info;

@Transactional
@Repository
public class InfoDAO extends JdbcDaoSupport implements IInfoDAO {

	public JdbcTemplate jdbcTemplate;

	@Autowired
	private DataSource dataSource;

	@PostConstruct
	private void initialize() {
		setDataSource(dataSource);
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}

	@Override
	public List<Info> getInfo(int pageId, int siteId) {
		List<Info> infoList = new ArrayList<Info>();
		String sql = "select * from info where page_id = " + pageId + " and site_id= " + siteId;
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);
		infoList = getInfoList(rows, infoList);
		return infoList;
	}

	@SuppressWarnings("rawtypes")
	private List<Info> getInfoList(List<Map<String, Object>> rows, List<Info> infoList) {
		for (Map row : rows) {
			Info info = new Info();
			info.setId((int) row.get("id"));
			info.setTextId((int) row.get("text_id"));
			info.setText((String) row.get("text"));
			info.setPageId((int) row.get("page_id"));
			info.setSiteId((int) row.get("site_id"));
			infoList.add(info);
		}
		return infoList;
	}

	@Override
	public boolean addInfo(Info info) {
		String sql = "insert into info (text_id, text, page_id, site_id) values (?,?,?,?)";
		int[] types = { Types.INTEGER, Types.VARCHAR, Types.INTEGER, Types.INTEGER};
		int rows = jdbcTemplate.update(sql, new Object[] { info.getTextId(), info.getText(), info.getPageId(), info.getSiteId()}, types);
		if(rows>0) return true;
		else return false;
	}

	@Override
	public void updateInfo(Info info) {
		String sql = "update info set text_id = ?, text = ?, page_id = ?, site_id = ? where id = ?";
		int[] types = { Types.INTEGER, Types.VARCHAR, Types.INTEGER, Types.INTEGER, Types.INTEGER};
		jdbcTemplate.update(sql, new Object[] { info.getTextId(), info.getText(), info.getPageId(), info.getSiteId(), info.getId()}, types);
	}

	@Override
	public void deleteInfo(int infoId) {
		String sql = "delete from info where id in (" + infoId + ")";
		jdbcTemplate.update(sql);
		
	}

}
