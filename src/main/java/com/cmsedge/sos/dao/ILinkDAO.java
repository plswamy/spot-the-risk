package com.cmsedge.sos.dao;

import java.util.List;

import com.cmsedge.sos.model.Link;

public interface ILinkDAO {

	List<Link> getAllLinksByPageId(int pageId);

	Link getLinkById(int linkId);

	boolean addLink(Link link);

	void updateLink(Link link);

	void deleteLink(int linkId);
}
