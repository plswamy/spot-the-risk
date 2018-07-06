package com.cmsedge.sos.model;

import java.io.Serializable;
import java.util.List;

public class Page implements Serializable {

	private static final long serialVersionUID = 1L;
	private Integer id;
	private String pageName;
	private String title;
	private String pageTitle;
	private String heading1;
	private String heading2Black;
	private String heading2White;
	private String heading3;
	private List<Info> info;
	private List<Country> countryList;
	private List<Leaderboard> leaderboardTable;
	private Integer siteId;
	private String status;
	private List<Link> links;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getPageName() {
		return pageName;
	}

	public void setPageName(String pageName) {
		this.pageName = pageName;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getPageTitle() {
		return pageTitle;
	}

	public void setPageTitle(String pageTitle) {
		this.pageTitle = pageTitle;
	}

	public String getHeading1() {
		return heading1;
	}

	public void setHeading1(String heading1) {
		this.heading1 = heading1;
	}

	public String getHeading2Black() {
		return heading2Black;
	}

	public void setHeading2Black(String heading2Black) {
		this.heading2Black = heading2Black;
	}

	public String getHeading2White() {
		return heading2White;
	}

	public void setHeading2White(String heading2White) {
		this.heading2White = heading2White;
	}

	public String getHeading3() {
		return heading3;
	}

	public void setHeading3(String heading3) {
		this.heading3 = heading3;
	}

	public List<Info> getInfo() {
		return info;
	}

	public void setInfo(List<Info> info) {
		this.info = info;
	}
	
	public List<Country> getCountryList() {
		return countryList;
	}

	public void setCountryList(List<Country> countryList) {
		this.countryList = countryList;
	}

	public List<Leaderboard> getLeaderboardTable() {
		return leaderboardTable;
	}

	public void setLeaderboardTable(List<Leaderboard> leaderboardTable) {
		this.leaderboardTable = leaderboardTable;
	}

	public Integer getSiteId() {
		return siteId;
	}

	public void setSiteId(Integer siteId) {
		this.siteId = siteId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<Link> getLinks() {
		return links;
	}

	public void setLinks(List<Link> links) {
		this.links = links;
	}

}
