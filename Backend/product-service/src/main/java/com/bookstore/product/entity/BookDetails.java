package com.bookstore.product.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "book_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "product_id", nullable = false, foreignKey = @ForeignKey(name = "fk_book_product"))
    @JsonBackReference
    private Product product;

    private String isbn10;
    private String isbn13;
    private String author;
    private String publisher;
    private String publishedDate;
    private Integer pageCount;
    private String bindingType;
    private String format;
    private String edition;
    private String language;
    private String seriesName;
    private String subtitle;
    private String translator;
}
