---
title: Custom Recommended Products Section
myurl: four
description: Setting your own recommended products for a particular product.
date: 2022-08-29
tags:
  - recommended products
layout: layouts/post.njk
---

How to set your own recommended products for a particular product.

- Create a new Product metafield of type `List of products` (Settings -> Metafields) .

- Give the metafield a name like `recommended products`; a content type of `Product`, and choose `List of products`. Then the metafield can be referenced in your liquid code as `product.metafields.custom.recommended_products`

![recommended product metafield](/img/recommended-products.png)

- Now, go to a product in the Shopify Admin and add a list of recommended products to the new `recommended products` metafield.

- Next, create a new section file called `custom-recommendations` and add the following code:

{% raw %}

```html
<div class="custom-products-wrapper page-width">
  {% if product.metafields.custom.recommended_products != blank %}
  <h3>Custom Recommendations</h3>
  {% endif %}
  <ul class="custom-products-grid">
    {% for p in product.metafields.custom.recommended_products.value %}
    <li class="custom-products-grid-item">
      <a href="{{ p.url }}">
        <img class="custom-products-img" src='{{p.featured_image | img_url:
        '600x600' }}' loading="lazy" alt="{{p.featured_image.alt}}"/>
      </a>
      <h3><a class="custom-products-a" href="{{p.url}}">{{p.title}}</a></h3>
      <p>{{p.price | money }}</p>
    </li>
    {% endfor %}
  </ul>
</div>

<style>
  .custom-products-wrapper {
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
    margin: 0;
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
```

{% endraw %}

- Update the `product.json` template file (for Shopify 2.0 themes) to include the new `custom-recommendations` section. You can just add it to the end of the file and include it in the `order`; something like this:
  {% raw %}

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

{% endraw %}

Now you should see your custom product recommendations for any products where the `recommended products` metafield has been populated.

Here's how it looks on a test store using the Dawn theme: https://sunny-day-umbrellas.myshopify.com/products/beach-umbrella
