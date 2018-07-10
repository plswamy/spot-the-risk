package com.cmsedge.sos.dao;

import java.util.List;

import com.cmsedge.sos.model.Page;

public interface IPageDAO {
	List<Page> getPageData(int siteId);
	
	int addPage(Page page);

	void updatePage(Page page);

	void deletePage(int pageId);
	
	Page getPageById(int pageId);
}
