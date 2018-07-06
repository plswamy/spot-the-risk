package com.cmsedge.sos.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;

public class Question implements Serializable {

	private static final long serialVersionUID = 1L;
	private Integer id;
	private String content;
	private String response;
	private Integer siteId;
	private List<Answer> answers;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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

	public Integer getSiteId() {
		return siteId;
	}

	public void setSiteId(Integer siteId) {
		this.siteId = siteId;
	}

	public List<Answer> getAnswers() {
		if (answers == null) {
			answers = new ArrayList<Answer>();
		}
		return answers;
	}

	public void setAnswers(List<Answer> answers) {
		this.answers = answers;
	}

	public String toJsonStr() {
		  Gson gson = new Gson();
		String jsonString = gson.toJson(this);
		System.out.println(jsonString);
		return jsonString;

	}

}
