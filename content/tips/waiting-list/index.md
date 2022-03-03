---
title: "Waiting List for Sold Out Products Dawn Theme"
date: 2022-03-03T09:08:00Z
summary: "Adding a waiting list option for sold out products Dawn theme"
backgroundColor: "var(--surface1)"
backgroundImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='18' viewBox='0 0 100 18'%3E%3Cpath fill='%23ffc078' fill-opacity='1' d='M61.82 18c3.47-1.45 6.86-3.78 11.3-7.34C78 6.76 80.34 5.1 83.87 3.42 88.56 1.16 93.75 0 100 0v6.16C98.76 6.05 97.43 6 96 6c-9.59 0-14.23 2.23-23.13 9.34-1.28 1.03-2.39 1.9-3.4 2.66h-7.65zm-23.64 0H22.52c-1-.76-2.1-1.63-3.4-2.66C11.57 9.3 7.08 6.78 0 6.16V0c6.25 0 11.44 1.16 16.14 3.42 3.53 1.7 5.87 3.35 10.73 7.24 4.45 3.56 7.84 5.9 11.31 7.34zM61.82 0h7.66a39.57 39.57 0 0 1-7.34 4.58C57.44 6.84 52.25 8 46 8S34.56 6.84 29.86 4.58A39.57 39.57 0 0 1 22.52 0h15.66C41.65 1.44 45.21 2 50 2c4.8 0 8.35-.56 11.82-2z'%3E%3C/path%3E%3C/svg%3E"
---

Here's how to include a waiting list option for your sold out products. Thes instructions are specific to the Dawn theme.

- Create a new snippet called `waiting-list.liquid` in the `Snippets` folder.

- Add the following code:

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

- Open the `main-product.liquid` section file.

- Add `{% render 'waiting-list.liquid' %}` to the code. I added it after the "Share" button, like this:

```
</share-button>
<script src="{{ 'share.js' | asset_url }}" defer="defer"></script>

{% render 'waiting-list' %}

```

Now, when a product has an unavailable variant, the `Item out of stock?` link should appear.

An email will be sent to your Shopify address when a user enters their details and clicks the `Join Waiting List` button.
