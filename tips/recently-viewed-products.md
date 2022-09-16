---
title: Display Recently Viewed Products Without App or jQuery.
myurl: six
description: Show your recently viewed products without using an app or jquery.
date: "2022-09-16"
tags:
  - Recently Viewed Products
layout: layouts/post.njk
---

This code will store the last 4 visited product pages in the browsers memory and display them as a section on the Product page. The steps below are for the Dawn theme.

Create a new section file, in this case called `recent-products.liquid`, and add the following code:  
{% raw %}

```
<div class="page-width">
    <h2 class="product-recommendations__heading h2">{{ section.settings.heading | escape }}</h2>
    <ul class="recently-viewed grid product-grid grid--4-col-desktop grid--2-col-tablet-down" role="list"">
    <!-- Recently viewed products will appear here -->
    </ul>
</div>

<script>
function setRecentlyViewedProducts() {
  const productData = {
    productTitle: "{{ product.title }}",
    productImg: "{{ product.featured_media | image_url: width: 533 }}",
    imgWidth:"{{ product.featured_media.width }}",
    imgHeight:"{{ product.featured_media.height }}",
    productPrice: "{{ product.price | money_with_currency }}",
    productUrl: "{{ product.url }}",
    productImageAltText: "{{product.featured_media.alt | escape }}"
  };
  const productList = [];
  let jsonResp, jsonRespArr, jsonRespArrStr;
  const numberOfProducts = 4;
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
    <li class="grid__item">
     <div class="card-wrapper underline-links-hover">
      <div class="card card--standard card--media " style="--ratio-percent: 100%;">
        <div class="card__inner color-background-2 gradient ratio" style="--ratio-percent: 100%;">
         <div class="card__media">
         <div class="media media--transparent media--hover-effect">
    		  <img class="motion-reduce" src="${item.productImg}" width="${item.imgWidth}" height="${item.imgHeight}"  loading="lazy" alt="${item.productImageAltText}"/>
         </div>
         </div>
       </div>
       <div class="card__content">
       <div class="card__information">
       <h3 class="card__heading h5">
       <a class="full-unstyled-link" href="${item.productUrl}">${item.productTitle}</a></h3>
         <div class="card-information">
           <div class="price ">
             <div class="price__container">
               <div class="price-item price-item--regular">
                   ${item.productPrice}
               </div>
             </div>
           </div>
         </div>
       </div>
       </div>
       </div>
       </div>
    </li>
   `);
  });
  const newProductData = `${recentlyViewedHtml.join("")}`;
  const fullContent = document.getElementsByClassName("recently-viewed");
  fullContent[0].innerHTML = newProductData;
}

document.addEventListener("DOMContentLoaded", function (event) {
  getRecentlyViewedProducts();
});

</script>


{% schema %}
  {
    "name": "Recent Products",
    "settings": [
      {
      "type": "text",
      "id": "heading",
      "default": "Recently Viewed",
      "label": "Title"
    }
    ]
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

You can change the displayed title of the section using the customizer (by defaullt it's set to "Recently Viewed")

If you are using a different theme (most likely one without a `product.json` template file), you can create a new snippet file (in the `Snippets` folder), add the same code as for the section **_without_** the schema part at the end. The styling for the code uses the Dawn theme's CSS, so you will need to add your own.
{% raw %}

```
{% schema %}
  {
    "name": "Recent Products",
    "settings": [
      {
      "type": "text",
      "id": "heading",
      "default": "Recently Viewed",
      "label": "Title"
    }
    ]
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
