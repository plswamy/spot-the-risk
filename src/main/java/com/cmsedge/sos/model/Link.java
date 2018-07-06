package com.cmsedge.sos.model;

import java.io.Serializable;

public class Link implements Serializable {

	private static final long serialVersionUID = 1L;
	private Integer id;
	private String title;
	private String linkText;
	private String linkSrc;
	private String target;
	private Integer pageId;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getLinkText() {
		return linkText;
	}

	public void setLinkText(String linkText) {
		this.linkText = linkText;
	}

	public String getLinkSrc() {
		return linkSrc;
	}

	public void setLinkSrc(String linkSrc) {
		this.linkSrc = linkSrc;
	}

	public String getTarget() {
		return target;
	}

	public void setTarget(String target) {
		this.target = target;
	}

	public Integer getPageId() {
		return pageId;
	}

	public void setPageId(Integer pageId) {
		this.pageId = pageId;
	}

}
