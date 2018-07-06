package com.cmsedge.sos.model;

import java.io.Serializable;

public class Country implements Serializable {
	private static final long serialVersionUID = 1L;
	private int id;
	private String optionKey;
	private String optionValue;
	private int siteId;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getOptionKey() {
		return optionKey;
	}

	public void setOptionKey(String optionKey) {
		this.optionKey = optionKey;
	}

	public String getOptionValue() {
		return optionValue;
	}

	public void setOptionValue(String optionValue) {
		this.optionValue = optionValue;
	}

	public int getSiteId() {
		return siteId;
	}

	public void setSiteId(int siteId) {
		this.siteId = siteId;
	}

}
