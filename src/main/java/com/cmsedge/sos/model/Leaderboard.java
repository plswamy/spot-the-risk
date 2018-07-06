package com.cmsedge.sos.model;

import java.io.Serializable;
import java.sql.Time;

public class Leaderboard implements Serializable {

	private static final long serialVersionUID = 1L;
	private String id;
	private String name;
	private String country;
	private String company;
	private String email;
	private int score;
	private int totalQuestions;
	private int trueQuestions;
	private int time;
	private boolean agreedComms;
	private boolean tncAcceptance;
	private int siteId;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}
	
	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public int getTotalQuestions() {
		return totalQuestions;
	}

	public void setTotalQuestions(int totalQuestions) {
		this.totalQuestions = totalQuestions;
	}

	public int getTrueQuestions() {
		return trueQuestions;
	}

	public void setTrueQuestions(int trueQuestions) {
		this.trueQuestions = trueQuestions;
	}

	public int getTime() {
		return time;
	}

	public void setTime(int time) {
		this.time = time;
	}
	
	public boolean isAgreedComms() {
		return agreedComms;
	}

	public void setAgreedComms(boolean agreedComms) {
		this.agreedComms = agreedComms;
	}

	public boolean isTncAcceptance() {
		return tncAcceptance;
	}

	public void setTncAcceptance(boolean tncAcceptance) {
		this.tncAcceptance = tncAcceptance;
	}

	public int getSiteId() {
		return siteId;
	}

	public void setSiteId(int siteId) {
		this.siteId = siteId;
	}

}
