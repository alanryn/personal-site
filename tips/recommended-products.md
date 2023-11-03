---
title: Custom Recommended Products Section
myurl: four
description: Setting your own recommended products for a particular product.
date: 2022-09-16
image: "/img/moon/moon11.jpg"
image_low_res: "/img/moon/moon-low-res.jpg"
tags:
  - recommended products
layout: layouts/post.njk
---

How to set your own recommended products for a particular product (using Dawn theme version 6.0.2).

- Create a new Product metafield of type `List of products` (Settings -> Metafields) .

- Give the metafield a name like `recommended products`; a content type of `Product`, and choose `List of products`. Then the metafield can be referenced in your liquid code as `product.metafields.custom.recommended_products`

![recommended product metafield](/img/recommended-products.png)

- Now, go to a product in the Shopify Admin and add a list of recommended products to the new `recommended products` metafield.

- Next, create a new section file called `custom-recommendations` and add the following code:

{% raw %}

```html
<div class="page-width">
  {% if product.metafields.custom.recommended_products != blank %}
  <h2 class="product-recommendations__heading h2">Custom Recommendations</h2>
  {% endif %}
  <ul
    class="grid product-grid grid--4-col-desktop grid--2-col-tablet-down"
    role="list"
  >
    {% for p in product.metafields.custom.recommended_products.value %}
    <li class="grid__item">
      <div class="card-wrapper underline-links-hover">
        <div
          class="card card--standard card--media "
          style="--ratio-percent: 100%;"
        >
          <div
            class="card__inner color-background-2 gradient ratio"
            style="--ratio-percent: 100%;"
          >
            <div class="card__media">
              <div class="media media--transparent media--hover-effect">
                <img
                  class="custom-products-img"
                  srcset="{%- if p.featured_media.width >= 165 -%}{{ p.featured_media | image_url: width: 165 }} 165w,{%- endif -%}
                              {%- if p.featured_media.width >= 360 -%}{{ p.featured_media | image_url: width: 360 }} 360w,{%- endif -%}
                              {%- if p.featured_media.width >= 533 -%}{{ p.featured_media | image_url: width: 533 }} 533w,{%- endif -%}
                              {%- if p.featured_media.width >= 720 -%}{{ p.featured_media | image_url: width: 720 }} 720w,{%- endif -%}
                              {%- if p.featured_media.width >= 940 -%}{{ p.featured_media | image_url: width: 940 }} 940w,{%- endif -%}
                              {%- if p.featured_media.width >= 1066 -%}{{ p.featured_media | image_url: width: 1066 }} 1066w,{%- endif -%}
                              {{ p.featured_media | image_url }} {{ p.featured_media.width }}w"
                  src="{{p.featured_media | img_url: width: 533 }}"
                  width="{{ p.featured_media.width }}"
                  height="{{ p.featured_media.height }}"
                  loading="lazy"
                  alt="{{ p.featured_media.alt }}"
                />
              </div>
            </div>
          </div>
          <div class="card__content">
            <div class="card__information">
              <h3 class="card__heading h5">
                <a class="full-unstyled-link" href="{{p.url}}">{{p.title}}</a>
              </h3>
              <div class="card-information">
                <div class="price ">
                  <div class="price__container">
                    <div class="price-item price-item--regular">
                      {{p.price | money }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
    {% endfor %}
  </ul>
</div>
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
