---
title: Scrolling Announcement Bar Dawn Theme.
description: Adding a scrolling announcement bar to header.
date: "2023-04-03"
image: "/img/moon/moon7.jpg"
image_low_res: "/img/moon/moon-low-res.jpg"
tags:
  - announcement bar
  - dawn theme
  - scrolling marquee
layout: layouts/post.njk
---

The Dawn theme now comes with a built-in option, available through the theme customizer, to display alternating announcement bars. This tutorial is still useful for older themes, and here's [another option](https://ionlyspeakliquid.beehiiv.com/p/speak-liquid-26-css-marquees).

Instructions to add a scrolling announcement bar to your header.

- Open the `announcement-bar.liquid` file in your `Sections` folder.
- Update the code to this:

{% raw %}

```
{%- for block in section.blocks -%}
  {%- case block.type -%}
    {%- when 'announcement' -%}
      <div class="announcement-bar color-{{ block.settings.color_scheme }} gradient" role="region" aria-label="{{ 'sections.header.announcement' | t }}" {{ block.shopify_attributes }}>
        {%- if block.settings.message_one != blank -%}
          {%- if block.settings.link != blank -%}
            <a href="{{ block.settings.link }}" class="announcement-bar__link link link--text focus-inset animate-arrow">
          {%- endif -%}
              <div class="page-width marquee enable-animation marquee--hover-pause">

  <ul style="list-style: none" class="marquee__content">
      <li class="announcement-bar__message {{ block.settings.text_alignment }} h5">
                  {{ block.settings.message_one | escape }}
                  {%- if block.settings.link != blank -%}
                    {% render 'icon-arrow' %}
                  {%- endif -%}
                </li>
      <li class="announcement-bar__message {{ block.settings.text_alignment }} h5">
                  {{ block.settings.message_two | escape }}
                  {%- if block.settings.link != blank -%}
                    {% render 'icon-arrow' %}
                  {%- endif -%}
                </li>
  </ul>

        <ul style="list-style: none" aria-hidden="true" class="marquee__content">
                <li class="announcement-bar__message {{ block.settings.text_alignment }} h5">
                  {{ block.settings.message_one | escape }}
                  {%- if block.settings.link != blank -%}
                    {% render 'icon-arrow' %}
                  {%- endif -%}
                </li>
            <li class="announcement-bar__message {{ block.settings.text_alignment }} h5">
                  {{ block.settings.message_two | escape }}
                  {%- if block.settings.link != blank -%}
                    {% render 'icon-arrow' %}
                  {%- endif -%}
                </li>
        </ul>

              </div>
          {%- if block.settings.link != blank -%}
            </a>
          {%- endif -%}
        {%- endif -%}
      </div>
  {%- endcase -%}
{%- endfor -%}

{% schema %}
{
  "name": "t:sections.announcement-bar.name",
  "max_blocks": 12,
  "blocks": [
    {
      "type": "announcement",
      "name": "t:sections.announcement-bar.blocks.announcement.name",
      "settings": [
        {
          "type": "text",
          "id": "message_one",
          "default": "Message one",
          "label": "Announcement one"
        },
             {
          "type": "text",
          "id": "message_two",
          "default": "Message two",
          "label": "Announcement two"
        },
        {
          "type": "select",
          "id": "text_alignment",
          "options": [
            {
              "value": "left",
              "label": "t:sections.announcement-bar.blocks.announcement.settings.text_alignment.options__1.label"
            },
            {
              "value": "center",
              "label": "t:sections.announcement-bar.blocks.announcement.settings.text_alignment.options__2.label"
            },
            {
              "value": "right",
              "label": "t:sections.announcement-bar.blocks.announcement.settings.text_alignment.options__3.label"
            }
          ],
          "default": "center",
          "label": "t:sections.announcement-bar.blocks.announcement.settings.text_alignment.label"
        },
        {
          "type": "select",
          "id": "color_scheme",
          "options": [
            {
              "value": "accent-1",
              "label": "t:sections.all.colors.accent_1.label"
            },
            {
              "value": "accent-2",
              "label": "t:sections.all.colors.accent_2.label"
            },
            {
              "value": "background-1",
              "label": "t:sections.all.colors.background_1.label"
            },
            {
              "value": "background-2",
              "label": "t:sections.all.colors.background_2.label"
            },
            {
              "value": "inverse",
              "label": "t:sections.all.colors.inverse.label"
            }
          ],
          "default": "accent-1",
          "label": "t:sections.all.colors.label"
        },
        {
          "type": "url",
          "id": "link",
          "label": "t:sections.announcement-bar.blocks.announcement.settings.link.label"
        }
      ]
    }
  ],
  "default": {
    "blocks": [
      {
        "type": "announcement"
      }
    ]
  }
}
{% endschema %}
<style>

.marquee {
  --gap: 1rem;
  position: relative;
  display: flex;
  overflow: hidden;
  user-select: none;
  gap: var(--gap);
}
.marquee__content {
  flex-shrink: 0;
  display: flex;
  justify-content: space-around;
  gap: var(--gap);
  min-width: 100%;
}

@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-100% - var(--gap)));
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee__content {
    animation-play-state: paused !important;
  }
}

/* Enable animation */
.enable-animation .marquee__content {
  animation: scroll 20s linear infinite;
}

/* Pause on hover */
.marquee--hover-pause:hover .marquee__content {
  animation-play-state: paused;
}

.marquee--fit-content {
  max-width: fit-content;
}


.marquee--pos-absolute .marquee__content:last-child {
  position: absolute;
  top: 0;
  left: 0;
}

.enable-animation .marquee--pos-absolute .marquee__content:last-child {
  animation-name: scroll-abs;
}

@keyframes scroll-abs {
  from {
    transform: translateX(calc(100% + var(--gap)));
  }
  to {
    transform: translateX(0);
  }
}

</style>
```

{% endraw %}

- Add your announcemnt messages in the theme customizer.
