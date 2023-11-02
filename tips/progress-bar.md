---
title: Cart Progress Bar Dawn Theme.
description: Adding a progress bar to shopping cart.
date: "2023-01-02"
image: "/img/algae/algae17.jpg"
image_low_res: "/img/algae/algae1-low.jpg"
tags:
  - progress bar
  - dawn theme
  - free shipping
layout: layouts/post.njk
---

Instructions to add a free shipping progress bar to your cart.

- Create a new Section file called `progress-bar.liquid`.
- Add the following code:

{% raw %}

```
<p style="text-align:center">
  {% assign goal = section.settings.goal | times:100 %}
  {% if cart.items.size == 0 %}
            Your cart is empty. Get free shipping when you spend {{ goal | money }}
  {% endif %}
  {% if cart.items.size != 0 %}
      {% if cart.total_price >= goal %} FREE SHIPPING
      {% elsif cart.total_price < goal %}You're only {{ goal | minus: cart.total_price | money }} away from FREE shipping.
      {% endif %}
  {% endif %}
</p>

{% assign percentage = cart.total_price |  divided_by:100 %}

<progress max="{{ goal }}" value="{{ cart.total_price }}">{{ percentage }}</progress>

<style>

progress[value] {
	-webkit-appearance:none;
    -moz-appearance:none;
    appearance: none;
	border: none;
	width: 100%;
    height: 1.25rem;
    background-color: whiteSmoke;
	border-radius: 10px;
	box-shadow: 0 2px 3px rgba(0,0,0,.5) inset;
	position: relative;
	margin: 0 0 1.5em;
}
progress[value]::-webkit-progress-bar {
	background-color: whiteSmoke;
	border-radius: 10px;
	box-shadow: 0 2px 3px rgba(0,0,0,.5) inset;
}
progress[value]::-webkit-progress-value {
	position: relative;
	border-radius:10px;
    background-color: green;
}
progress[value]::-moz-progress-bar {
	background-color:green;
	border-radius:10px;
}

</style>


{% schema %}
  {
    "name": "Progress Bar",
    "settings": [
            {
      "type": "number",
      "id": "goal",
      "label": "Goal"
    }
    ],
      "presets": [
    {
    "name": "Goal",
    "category": "Custom"
    }
]
  }
{% endschema %}
```

{% endraw %}

- Add the new section to the required page.
- Set a free shipping value.
