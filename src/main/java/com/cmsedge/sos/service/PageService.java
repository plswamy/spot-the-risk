package com.cmsedge.sos.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.cmsedge.sos.dao.ICountryDAo;
import com.cmsedge.sos.dao.IInfoDAO;
import com.cmsedge.sos.dao.ILeaderboardDAO;
import com.cmsedge.sos.dao.ILinkDAO;
import com.cmsedge.sos.dao.IPageDAO;
import com.cmsedge.sos.dao.ISiteDAO;
import com.cmsedge.sos.model.Info;
import com.cmsedge.sos.model.Leaderboard;
import com.cmsedge.sos.model.Link;
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
	
	@Autowired
	private IInfoDAO infoDao;

	@Autowired
	private ILeaderboardDAO leaderboardDao;

	@Autowired
	private ILinkDAO linkDao;

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

	@Override
	@Transactional(readOnly=false)
	public int addPage(Page page) {
		for (Info info : page.getInfo()) {
			infoDao.addInfo(info);
		}
		for (Leaderboard leaderboard : page.getLeaderboardTable()) {
			leaderboardDao.addLeaderboard(leaderboard);
		}
		for (Link link : page.getLinks()) {
			linkDao.addLink(link);
		}
		return pageDAO.addPage(page);
	}

	@Override
	@Transactional(readOnly=false)
	public void updatePage(Page page) {
		Page oPage = pageDAO.getPageById(page.getId());
		for (Info oInfo : oPage.getInfo()) {
			boolean oinfoIdExist =false;
			
			for (Info info : page.getInfo()) {
				if(info.getId()==-1) {
					infoDao.addInfo(info);
				}
				if(info.getId() == oInfo.getId()) {
					infoDao.updateInfo(info);
					oinfoIdExist =true;
				}
			}
			if(!oinfoIdExist) {
				infoDao.deleteInfo(oInfo.getId());
			}
		}
		if(oPage.getInfo().size() == 0 && page.getInfo().size() > 0 ) {
			for (Info info : page.getInfo()) {
				if(info.getId()==-1) {
					infoDao.addInfo(info);
				}
			}
		}
		for (Link oLink : oPage.getLinks()) {
			boolean oLinkIdExist =false;
			for (Link link : page.getLinks()) {
				if(link.getId()==-1) {
					linkDao.addLink(link);
				}
				if(link.getId() == oLink.getId()) {
					linkDao.updateLink(link);
					oLinkIdExist =true;
				}
			}
			if(!oLinkIdExist) {
				linkDao.deleteLink(oLink.getId());
			}
		}
		if(oPage.getLinks().size() == 0 && page.getLinks().size() > 0) {
			for (Link link : page.getLinks()) {
				if(link.getId()==-1) {
					linkDao.addLink(link);
				}
			}
		}
		pageDAO.updatePage(page);
	}

	@Override
	@Transactional(readOnly=false)
	public void deletePage(int pageId) {
		Page page = pageDAO.getPageById(pageId);
		
		for (Info info : page.getInfo()) {
			infoDao.deleteInfo(info.getId());
		}
		for (Link link : page.getLinks()) {
			linkDao.deleteLink(link.getId());
		}
		pageDAO.deletePage(pageId);
	}

	/*
	 * private String convertToJsonNav(String name, Object object) { JsonElement
	 * navJsonData = gson.toJsonTree(object); JsonObject navJson = new
	 * JsonObject(); navJson.add(name, navJsonData); return navJson.toString();
	 *
	 * }
	 */


}
