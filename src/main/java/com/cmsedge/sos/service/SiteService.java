package com.cmsedge.sos.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cmsedge.sos.dao.ISiteDAO;
import com.cmsedge.sos.model.Site;
@Service
public class SiteService implements ISiteService{

	@Autowired
	private ISiteDAO siteDAO;
	@Override
	public List<Site> getAllSites() {
		return siteDAO.getAllSites();
	}

	@Override
	public Site getSiteById(int siteId) {
		return siteDAO.getSiteById(siteId);
	}

	@Override
	public synchronized boolean addSite(Site site) {
		if(siteDAO.isSiteExists(site.getSiteName())) {
			return false;
		} else {
			siteDAO.addSite(site);
			return true;
		}
	}

	@Override
	public void updateSite(Site site) {
		siteDAO.updateSite(site);
	}

	@Override
	public void deleteSite(int siteId) {
		siteDAO.deleteSite(siteId);
	}

	@Override
	public List<String> getAllLocale() {
		return siteDAO.getAllLocale();
	}

}
