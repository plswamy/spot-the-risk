package com.cmsedge.sos.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cmsedge.sos.model.Link;

@Service
public class LinkService implements ILinkService {

	@Override
	public List<Link> getAllLinksByPageId(int pageId) {
		return null;
	}

	@Override
	public Link getLinkById(int linkId) {
		return null;
	}

	@Override
	public boolean addLink(Link link) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void updateLink(Link link) {
		// TODO Auto-generated method stub

	}

	@Override
	public void deleteLink(int linkId) {
		// TODO Auto-generated method stub

	}

}
