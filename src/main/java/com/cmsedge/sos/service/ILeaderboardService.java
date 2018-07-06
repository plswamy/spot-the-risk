package com.cmsedge.sos.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.cmsedge.sos.model.Leaderboard;

public interface ILeaderboardService {

	Map<String, String> submitScore(HttpServletRequest request);

	List<Leaderboard> loadQuizLeaderboard(int id);
}
