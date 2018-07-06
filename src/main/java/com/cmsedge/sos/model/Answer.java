package com.cmsedge.sos.model;

import java.io.Serializable;

public class Answer implements Serializable {

	private static final long serialVersionUID = 1L;
	private Integer id;
	private Integer question_id;
	private String content;
	private String response;
	private String is_correct;
	private Integer siteId;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getQuestion_id() {
		return question_id;
	}

	public void setQuestion_id(Integer question_id) {
		this.question_id = question_id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getResponse() {
		return response;
	}

	public void setResponse(String response) {
		this.response = response;
	}

	public String getIs_correct() {
		return is_correct;
	}

	public void setIs_correct(String is_correct) {
		this.is_correct = is_correct;
	}

	public Integer getSiteId() {
		return siteId;
	}

	public void setSiteId(Integer siteId) {
		this.siteId = siteId;
	}
}
