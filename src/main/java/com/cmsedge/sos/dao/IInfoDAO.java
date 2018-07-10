package com.cmsedge.sos.dao;

import java.util.List;

import com.cmsedge.sos.model.Info;

public interface IInfoDAO {
	
	List<Info> getInfo(int pageId, int siteId);
	
	boolean addInfo(Info info);

	void updateInfo(Info info);

	void deleteInfo(int infoId);
}
