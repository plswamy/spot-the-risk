package com.cmsedge.sos.model;

import java.io.Serializable;

public class Site implements Serializable {

	private static final long serialVersionUID = 1L;
	private Integer siteId;
	private String siteName;
	private String locale;
	private String status;

	public Integer getSiteId() {
		return siteId;
	}

	public void setSiteId(Integer siteId) {
		this.siteId = siteId;
	}

	public String getSiteName() {
		return siteName;
	}

	public void setSiteName(String siteName) {
		this.siteName = siteName;
	}

	public String getLocale() {
		return locale;
	}

	public void setLocale(String locale) {
		this.locale = locale;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}
