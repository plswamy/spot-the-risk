package com.cmsedge.sos.dao;

import java.util.List;

import com.cmsedge.sos.model.Site;

public interface ISiteDAO {
	List<Site> getAllSites();

	Site getSiteById(int siteId);

	int addSite(Site site);

	void updateSite(Site site);

	void deleteSite(int siteId);

	boolean isSiteExists(String siteName);

	List<String> getAllLocale();

}
