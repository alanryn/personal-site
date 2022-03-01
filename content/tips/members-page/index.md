---
title: "Customized Menu for Logged-in Users Dawn Theme"
date: 2022-03-01T09:08:00Z
summary: "Adding a customized menu for logged-in users Dawn theme"
backgroundColor: "var(--surface1)"
backgroundImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='Artboard-5' fill='%23ffc078' fill-opacity='1' fill-rule='nonzero'%3E%3Cpath d='M6 18h12V6H6v12zM4 4h16v16H4V4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
---

These instructions could be used to add customized content for particular customers, once they are logged-in and and a tag has been applied to their account.

- Create a new template called `page.member.json` in the templates folder. This will be the template for the Member page.

- In the Shopify Admin, create a new page called `Member`. Make sure the page uses the `page.member.liquid` template (if you don’t see the template, try publishing the theme, it may only be available in the dropdown list after the theme has been made live)

- While in the Shopify Admin, add a new menu in `Navigation`, called `Member Menu`. Add the new Member page to the new menu. This menu will replace the regular menu when a customer is logged-in and tagged as “member”.

- Optional: Add a message in case a user gets to the member page without being logged-in and tagged as “member”:
  - In the `Layout/theme.liquid` file, add a test to determine if the user is logged-in and tagged as a “member” (add the code between the `<main>` tags in `theme.liquid`):

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

- In the `Snippets` folder, add a file called `non-member-message.liquid`. This file will contain a message to explain why the page is restricted:

```

<p>This is the members area.</p>
{% unless customer %}
<a href="/account/login">Log-in</a> to your account to see if you are a member.
{% endunless %}
To find out more <a href="/pages/contact">Contact Us</a>

```

- For testing:

  - Create a customer account.

  - Add a tag to the customer with a value of `member`.

- Change the navigation in the `Sections/header.liquid` file to check if the customer is logged-in and tagged as a member. You will need to change the code in two places, for the mobile menu and the desktop menu.

- Find the code surrounded by the `<nav>` tags and update it to this:

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

The second `<nav>` tag for the other menu should be further down in the code, update it just like above.

Now, when a customer is logged in and tagged as `member`, the menu changes to display the Member navigation menu.

- Obviously, you would want to create some member content to display on the Member page. You could add a new member content section and include it in the `page.member.json` file.
