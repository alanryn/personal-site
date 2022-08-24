---
title: Display Recently Viewed Products Without App or jQuery.
myurl: six
description: Show your recently viewed products without using an app or jquery.
date: "2022-02-22"
tags:
  - Recently Viewed Products
layout: layouts/post.njk
---

This code will store the last 4 visited product pages in the browsers memory and display them as a section on the Product page. The steps below are for the Dawn theme.

Create a new section file, in this case called `recent-products.liquid`, and add the following code:  
{% raw %}

```
<div class="recently-viewed-wrapper page-width">
    <h2>Recently Viewed</h2>
    <ul class="recently-viewed-grid">
    <!-- Recently viewed products will appear here -->
    </ul>
</div>

<script>
function setRecentlyViewedProducts() {
  const productData = {
    productTitle: "{{ product.title }}",
    productImg: "{{ product.featured_media | img_url: '300x' }}",
    productPrice: "{{ product.price | money }}",
    productUrl: "{{ product.url }}",
    productImageAltText: "{{product.featured_media.alt | escape }}"
  };
  const productList = [];
  let jsonResp, jsonRespArr, jsonRespArrStr;
  const numberOfProducts = 8;
  productList.push(productData);
  const currProductPageTitle = productData.productTitle;
  const productDataString = JSON.stringify(productList);
  const localData = localStorage.getItem("recentlyViewedProduct");

  if (localData === null) {
    localStorage.setItem("recentlyViewedProduct", productDataString);
  } else if (localData) {
    const oldProductData = localStorage.getItem("recentlyViewedProduct");
    const countProductData = (oldProductData.match(/productTitle/g) || []).length;
    const sameProduct = oldProductData.includes(currProductPageTitle);
    if (countProductData < numberOfProducts && sameProduct == false) {
      jsonResp = JSON.parse(oldProductData);
      jsonRespArr = jsonResp.concat(productList);
      jsonRespArrStr = JSON.stringify(jsonRespArr);
      localStorage.setItem("recentlyViewedProduct", jsonRespArrStr);
    } else if (countProductData >= numberOfProducts && sameProduct == false) {
      jsonResp = JSON.parse(oldProductData);
      jsonResp.shift();
      jsonRespArr = jsonResp.concat(productList);
      jsonRespArr = JSON.stringify(jsonRespArr);
      localStorage.setItem("recentlyViewedProduct", jsonRespArr);
    }
  }
}

setRecentlyViewedProducts();
const localViewed = localStorage.recentlyViewedProduct;
function getRecentlyViewedProducts() {
  const productData = JSON.parse(localStorage.getItem("recentlyViewedProduct"));
  const recentlyViewedHtml = [];
  productData.map(item => {
    recentlyViewedHtml.unshift(`
    <li class="recently-viewed-grid-item">
      <a href="${item.productUrl}">
		<img class="recently-viewed-img" src='${item.productImg}' loading="lazy" alt="${item.productImageAltText}"/>
      </a>
       <h3><a class="recently-viewed-a" href="${item.productUrl}">${item.productTitle}</a></h3>
       <p>${item.productPrice}</p>
    </li>
   `);
  });
  const newProductData = `${recentlyViewedHtml.join("")}`;
  const fullContent = document.getElementsByClassName("recently-viewed-grid");
  fullContent[0].innerHTML = newProductData;
}

document.addEventListener("DOMContentLoaded", function (event) {
  getRecentlyViewedProducts();
});

</script>


<style>

.recently-viewed-wrapper{
  margin: 1rem auto;
}
.recently-viewed-img {
  width: 100%;
}
.recently-viewed-grid {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 260px), 1fr));
  list-style: none;
  margin:0;
  padding: 0;
}
.recently-viewed-grid-item {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.recently-viewed-a {
  text-decoration: none;
  color: black;
}

</style>

{% schema %}
  {
    "name": "Recent Products",
    "settings": []
  }
{% endschema %}
```

{% endraw %}
Update the `product.json` file ( in the `Templates` folder ), to include the new `recent-products` section details:
{% raw %}

```
{
  "sections": {
    "main": {
      "type": "main-product",
      "blocks": {
        "vendor": {
          "type": "text",
          "settings": {
            "text": "{{ product.vendor }}",
            "text_style": "uppercase"
          }
        },
        "title": {
          "type": "title",
          "settings": {
          }
        },
        "subtitle": {
          "type": "text",
          "settings": {
            "text": "{{ product.metafields.descriptors.subtitle.value }}",
            "text_style": "subtitle"
          }
        },
        "price": {
          "type": "price",
          "settings": {
          }
        },
        "variant_picker": {
          "type": "variant_picker",
          "settings": {
            "picker_type": "button"
          }
        },
        "quantity_selector": {
          "type": "quantity_selector",
          "settings": {
          }
        },
        "buy_buttons": {
          "type": "buy_buttons",
          "settings": {
            "show_dynamic_checkout": true
          }
        },
        "description": {
          "type": "description",
          "settings": {
          }
        },
        "share": {
          "type": "share",
          "settings": {
            "share_label": "Share"
          }
        }
      },
      "block_order": [
        "vendor",
        "title",
        "subtitle",
        "price",
        "variant_picker",
        "quantity_selector",
        "buy_buttons",
        "description",
        "share"
      ],
      "settings": {
        "enable_sticky_info": true,
        "hide_variants": false,
        "enable_video_looping": false
      }
    },
    "product-recommendations": {
      "type": "product-recommendations",
      "settings": {
        "heading": "You may also like",
        "image_ratio": "adapt",
        "show_secondary_image": false,
        "add_image_padding": false,
        "show_image_outline": true,
        "show_vendor": false,
        "show_rating": false
      }
    },
    "recent-products": {
      "type": "recent-products",
      "settings": {
      }
    }
  },
  "order": [
    "main",
    "product-recommendations",
    "recent-products"
  ]
}
```

{% endraw %}
Don't forget to add the section name to the `order`.

Now you should see in the theme customizer for your product page a section called `Recent Products`.

If you are using a different theme (most likely one without a `product.json` template file), you can create a new snippet file (in the `Snippets` folder), add the same code as for the section **_without_** the schema part at the end.
{% raw %}

```
{% schema %}
  {
    "name": "Recent Products",
    "settings": []
  }
{% endschema %}
```

{% endraw %}
In you `product.liquid` file (or the sub-file whch contains the full product page code) include the snippet using:
{% raw %}

```
{% render 'recent-products' %}
```

{% endraw %}
Place it where you would like the recently viewed products to appear on the product page.
