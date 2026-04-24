package com.bookstore.product.contoller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.bookstore.product.controller.Product;
import com.bookstore.product.entity.util.ApiResponse;
import com.bookstore.product.service.IProductService;


@WebMvcTest(Product.class)      // Loads only controller layer for testing.
public class ProductController {
	
	@Autowired MockMvc mockMvc;  // call only for API with out running server
	
	@MockitoBean IProductService  productService;
	
	@MockitoBean
    private ApiResponse apiResponse;

	
	@Test
	public void getProd() throws Exception {
		mockMvc.perform(get("/api/product/getall"))
		   .andDo(print())
	       .andExpect(status().isOk())
	       .andExpect(jsonPath("$.message")
	       .value("Wellcome Product service"));
	}
	
}
