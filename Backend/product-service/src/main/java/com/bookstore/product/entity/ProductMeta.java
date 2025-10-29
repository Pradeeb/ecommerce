package com.bookstore.product.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product_meta")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductMeta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "product_id", nullable = false, foreignKey = @ForeignKey(name = "fk_meta_product"))
    @JsonBackReference
    private Product product;

    private Double rating;
    private Integer reviewsCount;
    private Double weight;
    private String dimensions;
    private String genre;
    private String keywords;
    private String countryOfOrigin;
    private String readingLevel;
    private String ageGroup;
    private String awards;

    private Boolean illustrations;
    private String samplePdfUrl;
    private String contributor;
}
