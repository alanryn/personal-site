---
title: "Custom Recommended Products Section"
date: 2022-03-04T09:08:00Z
summary: "Hand-choose your own recommended products"
backgroundColor: "var(--surface1)"
backgroundImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='70' height='46' viewBox='0 0 70 46'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffc078' fill-opacity='1'%3E%3Cpolygon points='68 44 62 44 62 46 56 46 56 44 52 44 52 46 46 46 46 44 40 44 40 46 38 46 38 44 32 44 32 46 26 46 26 44 22 44 22 46 16 46 16 44 12 44 12 46 6 46 6 44 0 44 0 42 8 42 8 28 6 28 6 0 12 0 12 28 10 28 10 42 18 42 18 28 16 28 16 0 22 0 22 28 20 28 20 42 28 42 28 28 26 28 26 0 32 0 32 28 30 28 30 42 38 42 38 0 40 0 40 42 48 42 48 28 46 28 46 0 52 0 52 28 50 28 50 42 58 42 58 28 56 28 56 0 62 0 62 28 60 28 60 42 68 42 68 0 70 0 70 46 68 46'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
---

To choose your own recommended products for a particular product.

- Create a new Product metafield (Settings -> Metafields) .

- Give the metafield a name like `recommended_products` . Then it can be referenced in your liquid code as `{{ product.metafields.my_fields.recommended_products }}`

- Now, go to a product in the Shopify Admin and add a value for the new metafield. The value needs to be a comma seperated list of your chosen recommended product handles. The handle should be the product title, all lower case letters with hyphens instead of spaces, as it appears in the product page url, e.g. `dark-denim-top, floral-white-top, white-cotton-shirt, zipped-jacket`.

![recommended product metafield](images/recommended-product-metafield.png)

- Next, create a new section file called `custom-recommendations` and add the following code:

```

{%- assign handles = product.metafields.my_fields.recommended_products | split:"," -%}

<div class="custom-products-wrapper page-width">
   <h3>Recommendations</h3>
    <ul class="custom-products-grid">
       {%- for handle in handles -%}
 	    {% assign relatedProduct = handle | handle %}
    	<li class="custom-products-grid-item">
           <a href="{{all_products[relatedProduct].url}}">
		   <img class="custom-products-img" src='{{all_products[relatedProduct].featured_image | img_url: '600x600' }}'
             loading="lazy"
             alt="{{all_products[relatedProduct].featured_image.alt}}"/>
           </a>
           <h3><a class="custom-products-a" href="{{all_products[relatedProduct].url}}">{{all_products[relatedProduct].title}}</a></h3>
           <p>{{all_products[relatedProduct].price | money }}</p>
        </li>
       {% endfor %}
    </ul>
</div>

<style>

.custom-products-wrapper{
  margin: 1rem auto;
}
.custom-products-img {
  width: 100%;
}
.custom-products-grid {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 260px), 1fr));
  list-style: none;
  margin:0;
  padding: 0;
}
.custom-products-grid-item {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.custom-products-a {
  text-decoration: none;
  color: black;
}

</style>

{% schema %}
  {
    "name": "Custom Recommendations",
    "settings": []
  }
{% endschema %}

```

- Update the `product.json` template file (for Shopify 2.0 themes) to include the new `custom-recommendations` section. You can just add it to the end of the file and include it in the `order`; something like this:

```
    "product-recommendations": {
      "type": "product-recommendations",
      "settings": {
        "heading": "You may also like",
        "color_scheme": "background-1",
        "image_ratio": "square",
        "show_secondary_image": true,
        "show_vendor": false,
        "show_rating": false,
        "padding_top": 36,
        "padding_bottom": 28
      }
    },
    "custom-recommendations": {
      "type": "custom-recommendations",
      "settings": {
      }
    }
  },
  "order": [
    "main",
    "image-with-text",
    "multicolumn",
    "product-recommendations",
    "custom-recommendations"
  ]
}

```

Now you should see your custom product recommendations for any products where the `recommended _products` metafield has been populated.  

Here's how it looks on a test store using the Dawn theme: https://sunny-day-umbrellas.myshopify.com/products/beach-umbrella
