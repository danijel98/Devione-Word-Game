package com.spring.devione.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Errors {

	public static final String BadRequest = "badRequest";
	public static final String BadCredentials = "badCredentials";
	public static final String Unauthorized = "unauthorized";
	public static final String EmailAlreadyExists = "emailAlreadyExists";
	public static final String UsernameAlreadyExists = "usernameAlreadyExists";
	public static final String WordAlreadyExists = "wordAlreadyExists";


	
	private static Map<String, String> errorMessage = new HashMap<String, String>() {

		private static final long serialVersionUID = 1L;

		{
			put("badRequest", "bad request");
			put("badCredentials", "bad credentials");
			put( "unauthorized", "an unauthorized access" );
			put( "emailAlreadyExists", "email already exists" );
			put( "usernameAlreadyExists", "username already exists" );
			put( "wordAlreadyExists", "word already exists" );
		}
	};

	/** NewHTTPError creates error model that will send as http response */

	public static Map<String, String> NewHttpError(String errorCode, int statusCode) {
		Map<String, String> m = new HashMap<String, String>();
		m.put("error", errorCode);
		m.put("error_description", errorMessage.get(errorCode));
		m.put("code", String.valueOf(statusCode));

		return m;
	}

	public static Map<String, String> NewHTTPCustomError(String errorCode, String errorMsg, int statusCode) {
		Map<String, String> m = new HashMap<String, String>();
		m.put("error", errorCode);
		m.put("error_description", errorMsg);
		m.put("code", String.valueOf(statusCode));

		return m;
	}

	/**
	 * ValidateRequireAndLengthAndRegex is used to validate any input data but in string type
	 */
	public static String ValidateRequireAndLengthAndRegex(String value, boolean isRequired, int minLength,
			int maxLength, String regex, String fieldName) {
		String msg = "";
		int length = value.length();
		Pattern pattern = Pattern.compile(regex);
		Matcher matcher = pattern.matcher(value);

		if (isRequired && length < 1) {
			return msg = fieldName + " is Required";
		}

		if (minLength != 0 && length > 0 && length < minLength) {
			return msg = fieldName + " must be min " + minLength;
		}

		if (maxLength != 0 && length > 0 && length > maxLength) {
			return msg = fieldName + " must be max " + maxLength;
		}

		if (!regex.isEmpty() && !matcher.matches()) {
			return msg = "Invalid " + fieldName;
		}
		return msg;
	}


	
		
}
