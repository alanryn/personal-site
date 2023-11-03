---
title: Customized Menu for Logged-in Users Dawn Themes.
myurl: five
description: Provide customized content for logged-in customers.
date: 2022-03-01
image: "/img/moon/moon8a.jpg"
image_low_res: "/img/moon/moon-low-res.jpg"
tags:
  - menu
  - dawn
layout: layouts/post.njk
---

These instructions could be used to add customized content for particular customers, once they are logged-in and and a tag has been applied to their account.

- Create a new template called `page.member.json` in the templates folder. This will be the template for the Member page.

- In the Shopify Admin, create a new page called `Member`. Make sure the page uses the `page.member.liquid` template (if you don’t see the template, try publishing the theme, it may only be available in the dropdown list after the theme has been made live)

- While in the Shopify Admin, add a new menu in `Navigation`, called `Member Menu`. Add the new Member page to the new menu. This menu will replace the regular menu when a customer is logged-in and tagged as “member”.

- Optional: Add a message in case a user gets to the member page without being logged-in and tagged as “member”:
  - In the `Layout/theme.liquid` file, add a test to determine if the user is logged-in and tagged as a “member” (add the code between the `<main>` tags in `theme.liquid`):
    {% raw %}

```
{% if template contains 'member' %}
    {% if customer %}
        {% if customer.tags contains 'member' %}
            {{ content_for_layout }}
        {% else %}
            {% render 'non-member-message' %}
        {% endif %}
    {% else %}
            {% render 'non-member-message' %}
    {% endif %}
{% else %}
    {{ content_for_layout }}
{% endif %}

```

{% endraw %}

- In the `Snippets` folder, add a file called `non-member-message.liquid`. This file will contain a message to explain why the page is restricted:
  {% raw %}

```

<p>This is the members area.</p>
{% unless customer %}
<a href="/account/login">Log-in</a> to your account to see if you are a member.
{% endunless %}
To find out more <a href="/pages/contact">Contact Us</a>

```

{% endraw %}

- For testing:

  - Create a customer account.

  - Add a tag to the customer with a value of `member`.

- Change the navigation in the `Sections/header.liquid` file to check if the customer is logged-in and tagged as a member. You will need to change the code in two places, for the mobile menu and the desktop menu.

- Find the code surrounded by the `<nav>` tags and update it to this:
  {% raw %}

```
 <nav class="menu-drawer__navigation">
     <ul class="menu-drawer__menu list-menu" role="list">
        {% comment %} check if member to display different nav menu mobile {% endcomment %}
            {% assign menu-name = "main-menu" %}
       		  {% if customer %}
            	  {% if customer.tags contains 'member' %}
            		 {% assign menu-name = "member-menu" %}
                  {% endif %}
         	  {% endif %}
              {% for link in linklists[menu-name].links %}
                      <li> ...

```

{% endraw %}
The second `<nav>` tag for the other menu should be further down in the code, update it just like above.

Now, when a customer is logged in and tagged as `member`, the menu changes to display the Member navigation menu.

- Obviously, you would want to create some member content to display on the Member page. You could add a new member content section and include it in the `page.member.json` file.
