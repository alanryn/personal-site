---
title: Waiting List for Sold Out Products Dawn Theme.
description: Adding a waiting list button to a product page.
date: "2022-03-04"
image: "/img/moon/moon3.jpg"
image_low_res: "/img/moon/moon-low-res.jpg"
tags:
  - waiting list
  - dawn theme
layout: layouts/post.njk
---

How to include a waiting list option for your sold out items.

See the result [here](https://sunny-day-umbrellas.myshopify.com/products/bright-umbrella)

Here are two methods: one using snippets and the other using a custom block, both are very similar.

Method #1:

- Create a new snippet called `waiting-list.liquid` in the `Snippets` folder.

- Add the following code:
  {% raw %}

```
{% assign out_of_stock = false %}
{% for variant in product.variants %}
  {% if variant.available == false %}
    {% assign out_of_stock = true %}
  {% endif %}
{% endfor %}

{% if out_of_stock == true %}

  {% form 'contact' %}
    {% if form.posted_successfully? %}
    <p> Thanks! We will notify you when your item is available.</p>
    {% else %}
    <a class="product-popup-modal__button link" id="notify-me">Item out of stock?</a>
    {% endif %}
    {% unless form.posted_successfully? %}
    <div id="wrapper" class="hide" >
    	<div class="waiting-wrapper">
          <input autofocus
                 name="contact[email]"
                 id="ContactFormEmail"
                 value="{{ contact.fields.email }}"
                 type="email" aria-label="Enter email"
                 placeholder=" Please enter a valid email address"
                 required="required">
          <input aria-label="Size"
                 required="required"
                 type="text"
                 id="ContactFormSize"
                 name="contact[Size]"
                 placeholder="Enter out of stock item">
          <input type="hidden"
                 name="contact[body]"
                 value="Please notify me when {{ product.title | escape }} becomes available." />
        {{ product.selected_or_first_available_variant.name }}
          <div style="margin-top: 1em">
            <button class="button" type="submit">Join Waiting List</button>
          </div>
		</div>
    </div>
    {% endunless %}
  {% endform %}
{% endif %}

<script>
var ready = (callback) => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
}
ready(() => {
     document.querySelector("#notify-me").addEventListener("click", () => {
            document.querySelector("#wrapper").classList.toggle('hide');
          });
});
</script>

<style>
.hide {
  display: none;
}
.waiting-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1em;
}
.grecaptcha-badge {
  visibility: hidden;
}
</style>

```

{% endraw %}

- Open the `main-product.liquid` section file.

- Add {% raw %}`{% render 'waiting-list' %}`{% endraw %} to the code. I added it after the "Share" button, like this:
  {% raw %}

```
</share-button>
<script src="{{ 'share.js' | asset_url }}" defer="defer"></script>

{% render 'waiting-list' %}

```

{% endraw %}
Now, when a product has an unavailable variant, an `Item out of stock?` link should appear on the product page just below the share button.

Method #2:

- In the theme Customizer, navigate to a product page.

- Under `Product information`, click on `Add block` and select `Custom liquid`.

- Paste the same code as above for the Snippet into the Custom liquid text field, and save.

- Now the block is included in the product information area of the page and its position can be moved as required.

For both methods, an email will be sent to your Shopify address when a user enters their details and clicks the `Join Waiting List` button.
