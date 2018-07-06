package com.cmsedge.sos.service;

import java.util.List;

import com.cmsedge.sos.model.Site;

public interface ISiteService {
	List<Site> getAllSites();

	Site getSiteById(int siteId);

	boolean addSite(Site site);

	void updateSite(Site site);

	void deleteSite(int siteId);

	List<String> getAllLocale();

}
