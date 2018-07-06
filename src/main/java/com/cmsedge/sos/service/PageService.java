package com.cmsedge.sos.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Service;

import com.cmsedge.sos.dao.ICountryDAo;
import com.cmsedge.sos.dao.IPageDAO;
import com.cmsedge.sos.dao.ISiteDAO;
import com.cmsedge.sos.model.Country;
import com.cmsedge.sos.model.Page;
import com.cmsedge.sos.model.Question;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.gson.Gson;

@Service
@EnableScheduling
public class PageService implements IPageService {

	@Autowired
	private IQuestionService questionService;

	@Autowired
	private IPageDAO pageDAO;

	@Autowired
	private ISiteDAO siteDAO;
	
	@Autowired
	private ICountryDAo countryDAO;

	Gson gson = new Gson();

	@SuppressWarnings("deprecation")
	@Override
	public ObjectNode getPageData(int siteId) {
		ObjectMapper mapper = new ObjectMapper();
		ObjectNode rootData = mapper.createObjectNode();
		ObjectNode data = mapper.createObjectNode();
		ArrayNode nav = data.putArray("nav");
		// ArrayNode quiz = data.putArray("quiz");
		List<Page> pageList = pageDAO.getPageData(siteId);
		List<String> localeList = siteDAO.getAllLocale();
		List<Country> countriesList = countryDAO.getCountriesList();
		// List<String> listOfNav = new ArrayList<String>();
		List<Question> questionsList = questionService.getAllQuestions(siteId);
		// System.out.println(convertToJsonNav("quiz", questionsList));
		// List<Nav> navList = new ArrayList<>();
		for (Page page : pageList ){
			ObjectNode pageNode = mapper.createObjectNode();
			pageNode.put(page.getPageName(), mapper.convertValue(page, ObjectNode.class));
			nav.add(pageNode);
		}
		data.put("quiz", mapper.convertValue(questionsList, ArrayNode.class));
		data.put("locale", mapper.convertValue(localeList, ArrayNode.class));
		data.put("countries", mapper.convertValue(countriesList, ArrayNode.class));
		rootData.put("data", data);
		// System.out.println(listOfNav);
		return rootData;
	}

	@Override
	public List<Page> getAllPages(int siteId) {
		return pageDAO.getPageData(siteId);
	}
	/*
	 * private String convertToJsonNav(String name, Object object) { JsonElement
	 * navJsonData = gson.toJsonTree(object); JsonObject navJson = new
	 * JsonObject(); navJson.add(name, navJsonData); return navJson.toString();
	 *
	 * }
	 */


}
