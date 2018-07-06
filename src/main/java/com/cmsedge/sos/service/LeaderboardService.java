package com.cmsedge.sos.service;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cmsedge.sos.dao.ILeaderboardDAO;
import com.cmsedge.sos.model.Leaderboard;

@Service
public class LeaderboardService implements ILeaderboardService {

	@Autowired
	private ILeaderboardDAO leaderboardDAO;
	

	@Override
	public Map<String, String> submitScore(HttpServletRequest request) {
		System.out.println();
		System.out.println();
		Leaderboard leaderboard = new Leaderboard();
		leaderboard.setName(request.getParameter("name"));
		leaderboard.setCountry(request.getParameter("country"));
		leaderboard.setCompany(request.getParameter("company"));
		leaderboard.setEmail(request.getParameter("email"));
		leaderboard.setScore(Integer.parseInt(request.getParameter("score")));
		leaderboard.setTrueQuestions(Integer.parseInt(request.getParameter("answered")));
		leaderboard.setTotalQuestions(Integer.parseInt(request.getParameter("totalquestions")));
		leaderboard.setAgreedComms(new Boolean(request.getParameter("commsAccepted").equals("1")?"true" : "false").booleanValue());
		leaderboard.setTncAcceptance(new Boolean(request.getParameter("tnc").equals("1")?"true" : "false").booleanValue());
		leaderboard.setTime(Integer.parseInt(request.getParameter("time")));
		//System.out.println(leaderboard.getName()+" "+leaderboard.getTime());
		int userId=leaderboardDAO.addResult(leaderboard);
		String id=String.valueOf(userId);
		Map<String,String> result=new HashMap<String,String>();
		if(userId!=0) {		
			result.put("success", "true");
			result.put("counti", id);
		}
		else {
			result.put("success", "false");
		}
		return result;
	}


	@Override
	public List<Leaderboard> loadQuizLeaderboard(int id) {
		return leaderboardDAO.loadQuizLeaderboard(id);
	}


}
