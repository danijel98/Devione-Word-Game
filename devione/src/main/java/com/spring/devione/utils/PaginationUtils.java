package com.spring.devione.utils;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;

public class PaginationUtils {

    public static HttpHeaders generatePaginationHttpHeaders(Page<?> page) {

        HttpHeaders headers = new HttpHeaders();
        headers.add("X-Total-Count", Long.toString(page.getTotalElements()));
        headers.add("X-Total-Page", Long.toString(page.getTotalPages()));
        return headers;
    }
}

