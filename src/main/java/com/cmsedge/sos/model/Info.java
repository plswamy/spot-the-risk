package com.cmsedge.sos.model;

import java.io.Serializable;

public class Info implements Serializable {

	private static final long serialVersionUID = 1L;
	private int id;
	private int textId;
	private String text;
	private int siteId;
	private int pageId;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getTextId() {
		return textId;
	}

	public void setTextId(int textId) {
		this.textId = textId;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public int getSiteId() {
		return siteId;
	}

	public void setSiteId(int siteId) {
		this.siteId = siteId;
	}

	public int getPageId() {
		return pageId;
	}

	public void setPageId(int pageId) {
		this.pageId = pageId;
	}

}
