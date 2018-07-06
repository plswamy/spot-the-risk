package com.cmsedge.sos.dao;

import java.util.List;

import com.cmsedge.sos.model.Leaderboard;

public interface ILeaderboardDAO {
	List<Leaderboard> getTop10Records();
	
	List<Leaderboard> loadQuizLeaderboard(int id);
	
	int addResult(Leaderboard leaderboard);
	Leaderboard getLeaderboardById(int userId);
	int addLeaderboard(Leaderboard leaderboard);
	void updateLeaderboard(Leaderboard leaderboard);
	void deleteLeaderboard(int leaderboardId);
}
