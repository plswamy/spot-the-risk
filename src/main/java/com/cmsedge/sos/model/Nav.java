package com.cmsedge.sos.model;

import java.io.Serializable;

import com.google.gson.annotations.SerializedName;

public class Nav implements Serializable {

	private static final long serialVersionUID = 1L;

	@SerializedName("pageName")
	private String name;

	@SerializedName("data")
	private Page data;


	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Page getData() {
		return data;
	}

	public void setData(Page data) {
		this.data = data;
	}




}
