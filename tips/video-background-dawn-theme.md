---
title: Adding a Video Background to Dawn Theme.
description: Add a fullscreen background video to the Dawn theme.
date: 2022-06-02
image: "/img/moon/moon2.jpg"
image_low_res: "/img/moon/moon-low-res.jpg"
tags:
  - video background
  - dawn
layout: layouts/post.njk
---

Here is how to add a fullscreen background video to the Dawn theme. [Here's a demo](https://sunny-day-umbrellas.myshopify.com/) of the end result.

Create a new section file in the `Sections` folder. Call it something like `video-background.liquid`.

Add the following code:
{% raw %}

```
<div class="hero">
  <div>
  <h1>{{ section.settings.heading }}</h1>
  <a class='button' href='{{ section.settings.link_url }}'>{{ section.settings.link_text }}</a>
  </div>
  <video class="video-bg" autoplay muted loop playsinline poster={{ section.settings.poster }}>
  	<source src={{ section.settings.video_url }} type='video/mp4'>
  </video>
</div>

{% schema %}
  {
    "name": "Video Background Banner",
    "settings": [
      {
      "type": "text",
      "id": "heading",
      "label": "Overlay text"
    },
      {
      "type": "url",
      "id": "video_url",
      "label": "Enter the video url here"
    },
    {
      "type": "image_picker",
      "id": "poster",
      "label": "Add fallback background image in case video doesn't load"
    },
    {
      "type": "text",
      "id": "link_text",
      "label": "Enter CTA button text (if required)"
    },
      {
      "type": "url",
      "id": "link_url",
      "label": "CTA button link page"
    },
    {
      "type": "range",
      "id": "blur",
      "min": 0,
      "max": 10,
      "step": 0.1,
      "unit": "px",
      "label": "For low quality video add blur",
      "default": 0
    },
    {
      "type": "range",
      "id": "opacity",
      "min": 0,
      "max": 1,
      "step": 0.1,
      "label": "Change video opacity",
      "default": 1
    }
],
  "presets": [
    {
      "name": "Video Background Banner"
    }
  ]
  }
{% endschema %}

<style>
.video-bg{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 100%;
    min-height: 100%;
    z-index: -1;
    filter: blur({{section.settings.blur}}px) opacity({{section.settings.opacity}});
}
.hero {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
    margin-bottom: 100px;
    min-height: 100vh;
    position: relative;
    overflow: hidden;
  }
.hero div {
    padding: 1.5em;
    background: hsl(0 100% 100% / 25%);
    backdrop-filter: blur(10px);
  }

</style>



```

{% endraw %}
The section should now be available in the theme customizer (look for the section called `Video Background Banner`)

Upload a video in the `Settings -> Files` area of the Admin and add the video url to the section; include some text to overelay the video if required.

Try to keep the video to a smaller file size to improve performance - a short video played on a loop with as low a quality as is acceptable. The code above has customizable options to add blur and vary the opacity, which can help to disguise poor video quality.
