---
title: Adding FAQ Page to Shopify 2.0 Themes.
myurl: three
description: How to add an accessible faq section to a Shopify 2.0 theme.
date: "2022-01-16"
image: "/img/moon/moon8.jpg"
image_low_res: "/img/moon/moon-low-res.jpg"
tags:
  - faq
layout: layouts/post.njk
---

This code will add a FAQ section to your page. A working demo of what to expect is [here](https://sunny-day-umbrellas.myshopify.com/pages/faq).  
These instructions apply to Shopify 2.0 themes like Dawn.

Firstly, create a new template file in your `Templates` folder. Call the file `faq.json` and add the following code:
{% raw %}

```
{
  "sections": {
    "main": {
      "type": "main-page",
      "settings": {
      }
    },
    "faq": {
      "type": "faq",
      "settings": {
      }
    }
  },
  "order": [
    "main",
    "faq"
  ]
}
```

{% endraw %}
Create a new Frequently Asked Questions page for your site through your Shopify Admin `Online Store -> Pages`.  
When creating the new page, make sure to choose the `faq` theme template, not just the `Default page` template.  
Next, create a file called `faq.liquid` in the `Sections` folder. Add the following code to the file:
{% raw %}

```
<div id="accordionGroup" style="margin: auto" class="Accordion page-width page-width--narrow spaced-section" data-allow-multiple>
     {% for block in section.blocks %}
  <h3>
    <button aria-expanded="false" class="Accordion-trigger Accordion-button" aria-controls="sect{{forloop.index}}" id="accordion1id">
      <span class="Accordion-title">
        {{block.settings.question}}
        <span class="Accordion-icon"></span>
      </span>
    </button>
  </h3>
  <div hidden id="sect{{forloop.index}}" role="region" aria-labelledby="accordion{{forloop.index}}id" class="Accordion-panel">
    <div>
      <fieldset >
        <p>
		{{block.settings.answer}}
        </p>
      </fieldset>
    </div>
  </div>
     {%endfor%}
</div>
{% raw %}
{% schema %}
  {
    "name": "FAQ",
    "settings": [],
    "blocks": [{
        "type": "text",
        "name": "Question/Answer",
        "settings": [{
                "id": "question",
                "type": "text",
                "label": "Add the question text here"
            },
            {
                "id": "answer",
                "type": "richtext",
                "label": "Add the answer text here"
            }
        ]
    }],
  "presets": [
    {
      "name": "FAQ"
    }
  ]
}
{% endschema %}
{% endraw %}

<script>

"use strict";

Array.prototype.slice
  .call(document.querySelectorAll(".Accordion"))
  .forEach(function (accordion) {
    var allowMultiple = accordion.hasAttribute("data-allow-multiple");
    var allowToggle = allowMultiple
      ? allowMultiple
      : accordion.hasAttribute("data-allow-toggle");

    // Create the array of toggle elements for the accordion group
    var triggers = Array.prototype.slice.call(
      accordion.querySelectorAll(".Accordion-trigger")
    );
    var panels = Array.prototype.slice.call(
      accordion.querySelectorAll(".Accordion-panel")
    );

    accordion.addEventListener("click", function (event) {
      var target = event.target;

      if (target.classList.contains("Accordion-trigger")) {
        var isExpanded = target.getAttribute("aria-expanded") == "true";
        var active = accordion.querySelector('[aria-expanded="true"]');

        if (!allowMultiple && active && active !== target) {
          active.setAttribute("aria-expanded", "false");
          document
            .getElementById(active.getAttribute("aria-controls"))
            .setAttribute("hidden", "");

          if (!allowToggle) {
            active.removeAttribute("aria-disabled");
          }
        }

        if (!isExpanded) {
          target.setAttribute("aria-expanded", "true");
          document
            .getElementById(target.getAttribute("aria-controls"))
            .removeAttribute("hidden");

          if (!allowToggle) {
            target.setAttribute("aria-disabled", "true");
          }
        } else if (allowToggle && isExpanded) {
          target.setAttribute("aria-expanded", "false");
          document.getElementById(target.getAttribute("aria-controls")).setAttribute("hidden", "");
        }

        event.preventDefault();
      }
    });

    accordion.addEventListener("keydown", function (event) {
      var target = event.target;
      var key = event.which.toString();

      var isExpanded = target.getAttribute("aria-expanded") == "true";
      var allowToggle = allowMultiple
        ? allowMultiple
        : accordion.hasAttribute("data-allow-toggle");

      var ctrlModifier = event.ctrlKey && key.match(/33|34/);


      if (target.classList.contains("Accordion-trigger")) {
        if (key.match(/38|40/) || ctrlModifier) {
          var index = triggers.indexOf(target);
          var direction = key.match(/34|40/) ? 1 : -1;
          var length = triggers.length;
          var newIndex = (index + length + direction) % length;

          triggers[newIndex].focus();

          event.preventDefault();
        } else if (key.match(/35|36/)) {
          // 35 = End, 36 = Home keyboard operations
          switch (key) {
            // Go to first accordion
            case "36":
              triggers[0].focus();
              break;
            // Go to last accordion
            case "35":
              triggers[triggers.length - 1].focus();
              break;
          }
          event.preventDefault();
        }
      }
    });

    accordion
      .querySelectorAll(".Accordion-trigger")
      .forEach(function (trigger) {
        trigger.addEventListener("focus", function (event) {
          accordion.classList.add("focus");
        });

        trigger.addEventListener("blur", function (event) {
          accordion.classList.remove("focus");
        });
      });

    if (!allowToggle) {
      var expanded = accordion.querySelector('[aria-expanded="true"]');
      if (expanded) {
        expanded.setAttribute("aria-disabled", "true");
      }
    }
  });
</script>

<style>

.Accordion {
  padding: 0;
  margin: 0;
  border: 2px solid hsl(0, 0%, 82%);
  font-size: 1.5rem;
}

.Accordion h3 {
  margin: 0;
  padding: 0;
}

.Accordion.focus {
  border-color: hsl(216, 94%, 73%);
}

.Accordion.focus h3 {
  background-color: hsl(0, 0%, 97%);
}

.Accordion > * + * {
  border-top: 1px solid hsl(0, 0%, 82%);
}

.Accordion-trigger {
  background: none;
  color: hsl(0, 0%, 13%);
  display: block;
  font-size: 1.5rem;
  font-weight: normal;
  margin: 0;
  padding: 1em 1.5em;
  position: relative;
  text-align: left;
  width: 100%;
  outline: none;
}

.Accordion-trigger:focus,
.Accordion-trigger:hover {
  background: hsl(216, 94%, 94%);
}

.Accordion *:first-child .Accordion-trigger {
  border-radius: 5px 5px 0 0;
}

.Accordion-button {
  border-style: none;
}

.Accordion button::-moz-focus-inner {
  border: 0;
}

.Accordion-title {
  display: block;
  pointer-events: none;
  border: transparent 2px solid;
  border-radius: 5px;
  padding: 0.25em;
  outline: none;
}

.Accordion-trigger:focus .Accordion-title {
  border-color: hsl(216, 94%, 73%);
}

.Accordion-icon {
  border: solid hsl(0, 0%, 62%);
  border-width: 0 2px 2px 0;
  height: 0.5rem;
  pointer-events: none;
  position: absolute;
  right: 2em;
  top: 50%;
  transform: translateY(-60%) rotate(45deg);
  width: 0.5rem;
}

.Accordion-trigger:focus .Accordion-icon,
.Accordion-trigger:hover .Accordion-icon {
  border-color: hsl(216, 94%, 73%);
}

.Accordion-trigger[aria-expanded="true"] .Accordion-icon {
  transform: translateY(-50%) rotate(-135deg);
}

.Accordion-panel {
  margin: 0;
  padding: 1em 1.5em;
}

/* For Edge bug https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/4806035/ */
.Accordion-panel[hidden] {
  display: none;
}

fieldset {
  border: 0;
  margin: 0;
  padding: 0;
}
</style>

```

Now, within in your theme customizer, navigate to your new FAQ page (you may need to add it to your site's menu through `Online Store -> Navigation`) and the new FAQ section should be available to add to your page.  
If you do not see it at first, just click `Add section` and look for FAQ in the list of available sections.

You can now add question/answer pairs to the FAQ section.
