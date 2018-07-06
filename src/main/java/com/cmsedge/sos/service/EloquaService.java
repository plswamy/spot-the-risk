package com.cmsedge.sos.service;

import java.io.IOException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import org.apache.commons.codec.binary.Base64;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.stereotype.Service;

import com.cmsedge.sos.dao.ILeaderboardDAO;
import com.cmsedge.sos.model.Leaderboard;
import com.cmsedge.sos.util.SOSConstants;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;

@Service
public class EloquaService implements IEloquaService {
	private static final Logger LOGGER = LoggerFactory.getLogger(EloquaService.class);
	@Autowired
	private ILeaderboardDAO leaderboardDAO;

	@Override
	public void postEloqua(int userId) {
		try {
			Resource resource = new ClassPathResource("/application.properties");
			Properties properties = PropertiesLoaderUtils.loadProperties(resource);
			String token = properties.getProperty(SOSConstants.COMPANY_NAME) + "\\"
					+ properties.getProperty(SOSConstants.ELOQUA_USER) + ":"
					+ properties.getProperty(SOSConstants.ELOQUA_PWD);
			byte[] encodedBytes = Base64.encodeBase64(token.getBytes());
			String encodedToken = "Basic " + new String(encodedBytes);
			// String eloquaUrl =
			// properties.getProperty(SASConstants.ELOQUA_URL_CUSTOM_OBJECT);
			String eloquaUrl = properties.getProperty(SOSConstants.ELOQUA_URL_FORM);
			Leaderboard leaderboard = leaderboardDAO.getLeaderboardById(userId);
			String jsonStr = generateJsonNew(properties, convertLeaderboardMap(properties, leaderboard));
			LOGGER.info("eloqua url = " + SOSConstants.ELOQUA_URL_FORM);
			LOGGER.info("eloqua json = " + jsonStr);
			com.mashape.unirest.http.HttpResponse<String> response = Unirest.post(eloquaUrl)
					.header("authorization", encodedToken).header("content-type", "application/json")
					.header("cache-control", "no-cache").header("postman-token", "6c51d19d-2327-fc92-8218-c8dd22ac35ee")
					.body(jsonStr).asString();
			LOGGER.info(response.getBody());
		} catch (UnirestException e) {
			LOGGER.error("cannot able to send data to eloqua:", e);
			e.printStackTrace();
		} catch (IOException e) {
			LOGGER.error("cannot able to get properties for eloqua:", e);
			e.printStackTrace();
		}
	}

	private Map<String, String> convertLeaderboardMap(Properties properties, Leaderboard leaderboard) {
		Map<String, String> leaderboardMap = new HashMap<String, String>();
		leaderboardMap.put(properties.getProperty(SOSConstants.ELOQUA_MAIL), leaderboard.getEmail());
		leaderboardMap.put(properties.getProperty(SOSConstants.ELOQUA_NAME), leaderboard.getName());
		leaderboardMap.put(properties.getProperty(SOSConstants.ELOQUA_COUNTRY), leaderboard.getCountry());
		leaderboardMap.put(properties.getProperty(SOSConstants.ELOQUA_COMPANY), leaderboard.getCompany());
		leaderboardMap.put(properties.getProperty(SOSConstants.ELOQUA_SCORE), "" + leaderboard.getScore());
		leaderboardMap.put(properties.getProperty(SOSConstants.ELOQUA_TOTAL_QUESTIONS), "" + leaderboard.getTotalQuestions());
		leaderboardMap.put(properties.getProperty(SOSConstants.ELOQUA_CORRECT_QUESTIONS), "" + leaderboard.getTrueQuestions());
		leaderboardMap.put(properties.getProperty(SOSConstants.ELOQUA_COMPLETION_TIME), "" + leaderboard.getTime());
		leaderboardMap.put(properties.getProperty(SOSConstants.ELOQUA_AGREED_COMMS), leaderboard.isAgreedComms() ? "1" : "0");
		leaderboardMap.put(properties.getProperty(SOSConstants.ELOQUA_TERMS_CONDITIONS), leaderboard.isTncAcceptance() ? "1" : "0");
		return leaderboardMap;
	}

	public String generateJsonNew(Properties properties, Map<String, String> hs) {
		JSONObject dataset = new JSONObject();
		JSONArray fieldset = new JSONArray();
		try {
			for (String key : hs.keySet()) {
				JSONObject field = new JSONObject();

				field.put("type", "FieldValue");
				field.put("id", key);
				field.put("value", hs.get(key));
				field.put("iref", properties.getProperty(getProperty(properties, key) + ".ref"));
				fieldset.put(field);

			}
			dataset.put("fieldValues", fieldset);

			LOGGER.info(JSONObject.quote(dataset.toString()));
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return dataset.toString();
	}

	private String getProperty(Properties properties, String value) {
		String key = "";
		Enumeration<Object> keys = properties.keys();
		while (keys.hasMoreElements()) {
			key = keys.nextElement().toString();
			if (properties.getProperty(key).equals(value)) {
				break;
			}
		}
		return key;
	}
}
