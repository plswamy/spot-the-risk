package com.cmsedge.sos.service;


import java.util.List;

import com.cmsedge.sos.model.Page;
import com.fasterxml.jackson.databind.node.ObjectNode;

public interface IPageService {
	ObjectNode getPageData(int siteId);

	List<Page> getAllPages(int siteId);
	
	int addPage(Page page);

	void updatePage(Page page);

	void deletePage(int pageId);
}
