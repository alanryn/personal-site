---
title: "Adding a Video Background to Dawn Theme"
date: 2022-06-02T08:08:00Z
summary: "Adding a video background to Shopify Dawn theme"
backgroundColor: "var(--surface1)"
backgroundImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23ffc078' fill-opacity='1' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E"
---

Here is how to add a fullscreen background video to the Dawn theme. [Here's a demo](https://sunny-day-umbrellas.myshopify.com/) of the end result.

Create a new section file in the `Sections` folder. Call it something like `video-background.liquid`.

Add the following code:

```
<div class="hero">
  <div>
  <h1>{{ section.settings.heading }}</h1>
  <a class='button' href='{{ section.settings.link_url }}'>{{ section.settings.link_text }}</a>
  </div>
  <video class="video-bg" autoplay muted loop playsinline>
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

The section should now be available in the theme customizer (look for the section called `Video Background Banner`)

Upload a video in the `Settings -> Files` area of the Admin and add the video url to the section; include some text to overelay the video if required.

Try to keep the video to a smaller file size to improve performance - a short video played on a loop with as low a quality as is acceptable. The code above has customizable options to add blur and vary the opacity, which can help to disguise poor video quality.
