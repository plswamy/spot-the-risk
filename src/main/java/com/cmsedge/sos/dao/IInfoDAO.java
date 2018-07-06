package com.cmsedge.sos.dao;

import java.util.List;

import com.cmsedge.sos.model.Info;

public interface IInfoDAO {
	List<Info> getInfo(int pageId, int siteId);
}
