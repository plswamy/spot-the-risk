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

import com.cmsedge.sos.model.Country;

@Transactional
@Repository
public class CountryDAO extends JdbcDaoSupport implements ICountryDAo {
	
	public JdbcTemplate jdbcTemplate;

	@Autowired
	private DataSource dataSource;

	@PostConstruct
	private void initialize() {
		setDataSource(dataSource);
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}
	
	@Override
	public List<Country> getCountriesList() {
		List<Country> countriesList = new ArrayList<Country>();
		String sql = "select * from country";
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);
		countriesList = getcountryList(rows, countriesList);
		return countriesList;
	}

	private List<Country> getcountryList(List<Map<String, Object>> rows, List<Country> countriesList) {
		for(Map row: rows ) {
			Country country = new Country();
			country.setId((int) row.get("id"));
			country.setOptionKey((String) row.get("optkey"));
			country.setOptionValue((String) row.get("optvalue"));
			countriesList.add(country);
		}
		return countriesList;
	}

}
