package com.bookstore.product.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "product") 
public class Product {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // use wrapper Long (nullable safe)
    
 // 1️⃣ Basic Book Information
    private String title;
    private String category;
    private String subtitle;
    private String isbn10;
    private String isbn13;
    private String language;
    private String edition;
    private String format;
    private Integer pageCount;

    // 2️⃣ Author & Publisher Information
    private String author;
    private String contributor;
    private String publisher;
    private String publishedDate;
    private String countryOfOrigin;

    // 3️⃣ Descriptive Metadata
    private String description;
    private String genre;
    private String keywords;
    private String seriesName;
    private Integer volumeNumber;

    // 4️⃣ Commerce-Related Data
    private Double price;
    private Double discountPrice;
    private String currency;
    private Integer stockCount;
    private String sku;
    private Double weight;        // in kg
    private String dimensions;    // e.g., "20 x 13 x 2 cm"

    // 5️⃣ Web / Digital Metadata
    private String coverImage;
    private String backImage;
    private String samplePdfUrl;
    private String productUrl;
    private Double rating;
    private Integer reviewsCount;

    // 6️⃣ Extra Details
    private String ageGroup;
    private String readingLevel;
    private String awards;
    private String translator;
    private Boolean illustrations;
    private String bindingType;

}
