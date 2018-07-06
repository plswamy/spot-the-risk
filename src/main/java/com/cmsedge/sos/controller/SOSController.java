package com.cmsedge.sos.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.cmsedge.sos.model.Leaderboard;
import com.cmsedge.sos.model.Page;
import com.cmsedge.sos.model.Question;
import com.cmsedge.sos.service.IEloquaService;
import com.cmsedge.sos.service.ILeaderboardService;
import com.cmsedge.sos.service.IPageService;
import com.cmsedge.sos.service.IQuestionService;
import com.cmsedge.sos.util.SOSConstants;
import com.fasterxml.jackson.databind.node.ObjectNode;

@Controller
public class SOSController {

	@Autowired
	private IQuestionService questionService;

	@Autowired
	private IPageService pageService;

	@Autowired
	private ILeaderboardService leaderboardService;

	@Autowired
	private IEloquaService eloquaService;
	@Autowired
	private HttpServletRequest req;

//	@Autowired
//	private HttpServletResponse res;

	private static final Logger LOGGER = LoggerFactory.getLogger(SOSController.class);

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@RequestMapping("/admin")
	public ModelAndView getAdmin(ModelMap model, Principal principal) {
		String loggedInUserName = principal.getName();
		int siteId = 1;
		List<Question> questions = questionService.getAllQuestions(siteId);
		List<Page> pages = pageService.getAllPages(siteId);
		req.setAttribute("questions", questions);
		req.setAttribute("pages", pages);
		LOGGER.info("admin called with user " + loggedInUserName);
		return new ModelAndView("admin", "userName", loggedInUserName);
	}

	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login(ModelMap model) {
		LOGGER.info("login called");
		return "login";
	}

	@RequestMapping("/normal-user")
	public ModelAndView getNormalUser(ModelMap model, Principal principal) {
		LOGGER.info("normal-user called");
		String loggedInUserName = principal.getName();
		return new ModelAndView("normal_user", "userName", loggedInUserName);
	}

	@RequestMapping("/")
	public String getHome() {
		return "home";
	}
	
	@RequestMapping(value = "/questions/{id}", method = RequestMethod.GET, produces = { "application/json" })
	public List<Question> getQuestions(@PathVariable("id") int siteId) {
		List<Question> questions = questionService.getAllQuestions(siteId);
		return questions;

	}
	
	@ResponseBody
	@RequestMapping(value = "/ajax/submit_score", method = RequestMethod.POST, produces = { "application/json" })
	public Map<String,String> submitScore(HttpServletRequest request) {
		Map<String, String> response=leaderboardService.submitScore(request);
		if(response.containsKey(SOSConstants.USER_ID)) {
			eloquaService.postEloqua(Integer.parseInt(response.get(SOSConstants.USER_ID)));
		}
		//System.out.println(response);
		return response;
			
	}
	
	
	/*@RequestMapping(value = "/ajax/score_submit", method = RequestMethod.POST)
	public int submitScoreSecond(HttpServletRequest request) throws IllegalArgumentException{
		int userId=leaderboardService.submitScore(request);
		System.out.println("user id "+userId);
		return userId;
	}*/
	
	@ResponseBody
	@RequestMapping(value = "/quiz1/{id}", method = RequestMethod.GET, produces = { "application/json" })
	public List<Question> showQuiz(@PathVariable("id") int siteId ) {
		List<Question> questions = questionService.getAllQuestions(siteId);
		return questions;
	}

	@ResponseBody
	@RequestMapping(value = "/ajax/load_scores/{id}", produces = { "application/json" })
	public List<Leaderboard> loadLeaderboardScores(@PathVariable("id") int id ) {
		List<Leaderboard> leaderboardList = leaderboardService.loadQuizLeaderboard(id);
		return leaderboardList;
	}

	@RequestMapping(value = "/data", method = RequestMethod.GET, produces = { "application/json" })
	public ResponseEntity<ObjectNode> pageDemo() {
		ObjectNode siteData = pageService.getPageData(1);
		return new ResponseEntity<ObjectNode>(siteData, HttpStatus.OK);
	}
	
}
