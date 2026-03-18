package com.bookstore.product.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "addtocard")
@Data
public class AddToCard {
	
	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)	
	private long id;
	
	@Column(name="quantity",length =2,nullable = false)
	private int quntity;
	
	@Column(name = "user_id",nullable = false)
	private Long userId;
	
	@OneToOne
	@JoinColumn(name = "product_id",nullable = false)
	private Product product;


}
