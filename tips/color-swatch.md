---
title: Color swatch linking to other products
date: 2022-08-30
tags:
  - colors
  - product list metafields
layout: layouts/post.njk
---

If each color variation of your product is a seperate product, rather than just a variant of a single product, you can connect the various products together using a color swatch using metafields.

See it in action [here](https://sunny-day-umbrellas.myshopify.com/products/beach-umbrella)

![shopify theme settings](/img/color-swatch.png)

Here's how using the Dawn theme:

- Add two metafields to your store, one is a list of each of the different color products, the second is a single metafield to store the color:

  1. Add a new product metafield called `product color list`. Give it a content type of `Product` and make it a `List of products`
  2. Add a new product metafield called `color`. Give it a content type of `Color` and select `One value`

![shopify theme settings](/img/product-list-metafield.png)

![shopify theme settings](/img/color-metafield.png)

Now these metafields are availble to each of your products through the Admin area of your store.

Go to each product that you want to connect by color. Scrool down to the metafields area.

For the product color list metafield select all the different colored products including the current one.  
For the color metafield add the required color.

Save the changes. Repeat this for all of the products.

![shopify theme settings](/img/product-metafields.png)

Next, modify the code for the product page to include a block for the new color swatch.

- Open the `product.json` file located in the `Templates` folder.
- Add some json code to define the color swatch block (somewhere near the top of the code, after `"blocks"`:

```json
        "color_swatch": {
          "type": "color_swatch",
           "settings": {
          }
        },
```

- Add `color_swatch` to the block order (further down in the code at around line 100):

```json
    "block_order": [
        "vendor",
        "color_swatch",
        "title",
        "caption",
        "price",
        "variant_picker",
        "quantity_selector",
        "buy_buttons",
        "description",
        "collapsible-row-0",
        "collapsible-row-1",
        "collapsible-row-2",
        "collapsible-row-3",
        "share"
      ],
```

Open `main-product.liquid` from the `Sections` folder.

At the bottom of the file add the color_swatch to the schema.
Between the {% raw %}`{% schema %}`{% endraw %} and {% raw %}`{% endschema %}`{% endraw %} tags add this:

```json
        {
      "type": "color_swatch",
      "name": "color swatch",
      "limit": 1
        },
```

Then add the code to display the color swatch (I put it on the line before {% raw %} {%- when 'variant_picker' -%} {% endraw %}):
{% raw %}

```liquid
    {%- when "color_swatch"-%}
        {%- if product.metafields.custom.product_color_list != blank -%}
            <p>Available colors: </p>
            <div class="color-list">
                {% for p in product.metafields.custom.product_color_list.value %}
                <a {% if product.handle == p.handle %}href="#" style="cursor:default;" {% else %} href="{{ p.url }}"{% endif %} >
                    <div class="color-item" style="background-color: {{ p.metafields.custom.color.value }};">
                    </div>
                </a>
                {% endfor %}
            </div>
        {%- endif -%}

```

{% endraw %}
Add this css to the very end of the file.
{% raw %}

```css
{% stylesheet %}
.color-list{
      display: flex;
      }
.color-list a {
      margin-right: 1rem;
      }
.color-item{
      aspect-ratio: 1;
      width: 3.5rem;
      border-radius: 100%;
      }
{% endstylesheet %}
```

{% endraw %}

Use the theme customizer to place the color swatch block in the required position.

![shopify theme settings](/img/color-swatch-customizer.png)
